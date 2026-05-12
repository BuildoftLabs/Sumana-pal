// api/blog/[slug].js
// Vercel Serverless Function — SSR for individual blog post pages.
// Fetches blog data from Firestore at request time and injects it into
// the built HTML shell so content is visible in page source for crawlers.

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { join } from "path";

// ── Firebase Admin init ───────────────────────────────────────────────────
const SERVICE_ACCOUNT = {
  type: "service_account",
  project_id: "dt-sumanapal",
  private_key_id: "427998b71ab4f4d49a8c131e6dddcc226c15e463",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDUpB8Lm5UodklQ\nQqvY+n98yXKHYHPGlD26qxoNiHAnBz2u2e1EDLTv9xRh4cM+GOkG1BjbculGJ6cf\ns5Co183BbmeuF+AG7ZyRyf4D3NffJzfWgi18tZBN+XioceqBFMC24V7K7+sRmqK4\nQzMPDStQosIyEPZXDXMK67+HrI71T4T/OZVMjfJ0ftdkkvbECKTm/WdHFabGo7sw\nqXONLlc1yKy+qkQ9hugojor9CZSx+qTqVzom0Ut/1poxSbnuhGOjU5aM9OX3oyyV\no4m3IHEjxSUndo/EgdT7z4t42ErUdmCKK9xCuKg830+/QAcOqI6uIwdvBfQYNjgo\npivQOoM/AgMBAAECggEAKNLRewMFod0DujryjxeYfjaWnFLyJz+ykjHjMJHvJi8H\nspf4K0ZdPmyrJxeWykcyBbOWihsHmgZm2Xk53pB/2hD+Krg+tFXN51dmQwuVDiyT\nVcVsQjMBX1bzyTMFmH6JeRLPhhqFgL21W7bbCJq4pCR7L+19vbzBR2l3Pe7tCz89\na/nOoCsaEE1eud9ht0Yq/ATI2AJUWB823v/AspEBqPDbPipg3iDmMhTUtCQRdEH/\n82tucMv9PTZFJquSSzVXdJ1LQgQfhrH/u5ORTC9pCDSwZEeorfNKdcuUMYKiWjYD\ndHz/URbfzcqiwzpEWSiIgV+U6wXgTpos+mYDxXoZQQKBgQDrtTQRb0VeoA3iK5c1\nQpvRro3sJhlg9resTKTZJS54N55l4Hjw415QgNMbpKxl3Ac742+kf7YnII3dZt1Q\nZ9BrJIqsKHxbZleLTDQCLbKBeq0b/IxuvADveN/TqJftKoFwPNZxQ7efHcacXuZk\nBGI3zxOEw19otaI6aCx/NFjuTwKBgQDm8owTJScp6v8owWJkYvLIBqwtbf5XQqUR\nvCBH1WNxPqczZVeOWMedQDqVsu5X425rzlArJ4ZJQaD+SZMXeR5zbgtzisaPJjNz\nG9+pZgMXlpWPzR21U5+chteWV3Ulxm86ZNhU23mhtPXGV5SHQitJCZ+uE+PXgxT/\nKhghKgZQEQKBgHrQvASpmdeoRhOm6u7ReidTcJevcmHXq/SXKv4KJaB2Oo6S2/GI\nR0hjF5y7vSiF8S7/XtizwtG4YLMQOhj/PtXVAHyby9BEDzGBz0ejT/OvXCvM989r\nHoGo1dePbToif7dfu8zgn/jEpwwrVpiewB6cQ2tV8Yy5t4H/bdAKEpx5AoGBAMlI\ndhstk2+uWAsOWRIDR3RclG3X4wfslu/ZFg1lhxEpORLLbb8r03ZTh3v3glHpb9DX\n9PlXrmtknstiFqgrsQWL0ME4H4yeD9NwZMRAm8tQPDQj4pOqOX9z6qwmt3xf8Ytk\nX0O+McllbZwbsuEcI5u5nola3oZzwbYO2w70kKHxAoGBAKP3REcD9kpa1uqS524U\nsbHwaUoQWrw67ty5adYrEVLJMixdrODPtARrVaihMRMAZjs58ZSBe/uK/v6tjxYc\nyV8W9cNvhxSMBFv7KHblkY7IefHTafXdifLW3sj+zvixGvmU930E2f1UQ2RB4whm\nCMvisP+IsJcesl/dVvCi1nZR\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@dt-sumanapal.iam.gserviceaccount.com",
  client_id: "100470058106258658986",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40dt-sumanapal.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

function initFirebase() {
  if (getApps().length > 0) return;
  initializeApp({ credential: cert(SERVICE_ACCOUNT) });
}

// ── Helpers ───────────────────────────────────────────────────────────────

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(str = "") {
  return String(str).replace(/<[^>]*>/g, "").trim();
}

async function fetchPost(db, slug) {
  // 1. Try by document ID
  const docSnap = await db.collection("blogs").doc(slug).get();
  if (docSnap.exists) return docSnap.data();

  // 2. Try by slug field
  const q = await db.collection("blogs").where("slug", "==", slug).limit(1).get();
  if (!q.empty) return q.docs[0].data();

  return null;
}

// ── Main handler ──────────────────────────────────────────────────────────

export default async function handler(req, res) {
  const { slug } = req.query;

  // Read the built index.html
  let html;
  try {
    const htmlPath = join(process.cwd(), "dist", "index.html");
    html = readFileSync(htmlPath, "utf-8");
  } catch {
    // No build output yet (local dev) — redirect to SPA route
    res.writeHead(302, { Location: `/blogs/${slug}` });
    res.end();
    return;
  }

  let post = null;
  try {
    initFirebase();
    const db = getFirestore();
    post = await fetchPost(db, slug);
  } catch (err) {
    console.error("Firestore fetch error:", err);
  }

  if (!post) {
    // No post — let React SPA handle it (shows "not found" UI)
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
    return;
  }

  // ── Build safe values ──────────────────────────────────────────────────
  const title = escapeHtml(post.headline || "Blog");
  const pageTitle = `${title} | Dietitian Sumana Pal Roy`;
  const rawDesc = stripHtml(post.description || "Expert nutrition and diet advice by Dietitian Sumana Pal Roy, Kolkata.");
  const description = escapeHtml(rawDesc.slice(0, 160));
  const imageUrl = escapeHtml(post.image || "https://www.dietwithsumana.com/hero-image.png");
  const canonicalUrl = `https://www.dietwithsumana.com/blogs/${slug}`;
  const category = escapeHtml(post.category || "General");
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";
  const readTime = post.readTime ? `${post.readTime} Read` : "5 Min Read";

  // ── Blog body content ──────────────────────────────────────────────────
  const rawContent = post.content || "";
  const isHtml = /<[a-z][\s\S]*>/i.test(rawContent);
  const contentHtml = isHtml
    ? rawContent
    : escapeHtml(rawContent)
        .split("\n\n")
        .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
        .join("\n");

  // ── Article JSON-LD ────────────────────────────────────────────────────
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dietwithsumana.com/" },
          { "@type": "ListItem", position: 2, name: "Blogs", item: "https://www.dietwithsumana.com/blogs" },
          { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
        ],
      },
      {
        "@type": "Article",
        headline: title,
        description: description,
        image: imageUrl,
        author: { "@type": "Person", name: "Sumana Pal Roy", url: "https://www.dietwithsumana.com/about" },
        publisher: { "@type": "Organization", name: "Dietitian Sumana Pal Roy", url: "https://www.dietwithsumana.com/" },
        datePublished: post.date || "",
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
      },
    ],
  });

  // ── Inject into <head> ─────────────────────────────────────────────────
  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${pageTitle}</title>`)
    .replace(/<meta\s+name="description"[^>]*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link\s+rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta\s+property="og:title"[^>]*\/>/, `<meta property="og:title" content="${pageTitle}" />`)
    .replace(/<meta\s+property="og:description"[^>]*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta\s+property="og:url"[^>]*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta\s+property="og:image"[^>]*\/>/, `<meta property="og:image" content="${imageUrl}" />`)
    .replace(/<meta\s+property="og:type"[^>]*\/>/, `<meta property="og:type" content="article" />`)
    .replace(/<meta\s+name="twitter:title"[^>]*\/>/, `<meta name="twitter:title" content="${pageTitle}" />`)
    .replace(/<meta\s+name="twitter:description"[^>]*\/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<meta\s+name="twitter:image"[^>]*\/>/, `<meta name="twitter:image" content="${imageUrl}" />`);

  // ── Pre-rendered crawlable block injected before </body> ───────────────
  // React hydrates over this; crawlers see it immediately.
  const ssrBlock = `
<!-- SSR: pre-rendered blog content for SEO -->
<div id="ssr-blog-data" style="display:none;" aria-hidden="true"
  data-title="${title}"
  data-description="${description}"
  data-image="${imageUrl}"
  data-category="${category}"
  data-date="${escapeHtml(dateStr)}"
  data-readtime="${escapeHtml(readTime)}">
</div>
<script type="application/ld+json">${jsonLd}<\/script>
<noscript>
  <article style="max-width:860px;margin:80px auto;padding:0 20px;font-family:Georgia,serif;line-height:1.7;">
    <p style="color:#888;font-size:0.9rem;">${category} · ${escapeHtml(dateStr)} · ${escapeHtml(readTime)}</p>
    <h1 style="font-size:2rem;margin:12px 0;">${title}</h1>
    <p style="color:#555;font-size:1.1rem;margin-bottom:24px;">${description}</p>
    <img src="${imageUrl}" alt="${title}" style="width:100%;border-radius:12px;margin-bottom:28px;" />
    ${contentHtml}
  </article>
</noscript>`;

  html = html.replace("</body>", `${ssrBlock}\n</body>`);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(html);
}
