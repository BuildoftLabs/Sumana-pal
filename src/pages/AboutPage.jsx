import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import TopNav from "../sections/TopNav";
import { navItems } from "../content/homeContent";
import WhatsAppFab from "../components/WhatsAppFab";
import { useSEO } from "../hooks/useSEO";

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.dietwithsumana.com/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.dietwithsumana.com/about" }
      ]
    },
    {
      "@type": "Person",
      "name": "Sumana Pal Roy",
      "jobTitle": "Certified Dietitian & Nutritionist",
      "url": "https://www.dietwithsumana.com/about",
      "image": "https://www.dietwithsumana.com/about.png",
      "telephone": "+919804380329",
      "email": "dietwithsumana@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal",
        "addressCountry": "IN"
      },
      "sameAs": ["https://www.instagram.com/dietitian_sumana.pal"],
      "knowsAbout": ["Nutrition", "Dietetics", "Weight Loss", "PCOS Diet", "Thyroid Diet", "Diabetes Diet"]
    }
  ]
};

export default function AboutPage() {
  useSEO({
    title: "About Dietitian Sumana Pal Roy | Certified Dietitian & Nutritionist in Kolkata",
    description: "Learn about Dietitian Sumana Pal Roy — a certified nutritionist in Kolkata specializing in weight loss, PCOS, thyroid, and diabetes diet management. Trusted by hundreds of clients.",
    canonical: "/about"
  });

  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, "sections", "about"))
      .then((snap) => {
        if (snap.exists()) setAboutData(snap.data());
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Only use Firestore data — no hardcoded fallbacks for text
  const heroImage      = aboutData?.image || "/about.png";
  const headlineRaw    = aboutData?.headline || "";
  const description    = aboutData?.description || "";
  const blocks         = Array.isArray(aboutData?.descriptionBlocks)
    ? aboutData.descriptionBlocks
    : [];

  // Auto-split headline: first half black, second half orange
  function splitHeadline(text) {
    if (!text) return { black: "", orange: "" };
    const words = text.trim().split(" ");
    const mid   = Math.ceil(words.length / 2);
    return {
      black:  words.slice(0, mid).join(" "),
      orange: words.slice(mid).join(" "),
    };
  }
  const { black: headlineBlack, orange: headlineOrange } = splitHeadline(headlineRaw);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />
      <main className="about-page" aria-label="About me page">
        <TopNav navItems={navItems} />

        {/* ── Profile Image ──────────────────────────────── */}
        <section className="about-section about-section-white about-img-section" aria-label="About Image">
          <div className="about-hero-inner">
            <div className="about-hero-media">
              <img
                className="about-hero-img"
                src={heroImage}
                alt="Sumana Pal Roy"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ── Headline + Short Description — only if data exists in Firestore ── */}
        {(headlineRaw || description) && (
          <section className="about-section about-section-white" aria-label="About me content">
            <div className="about-hero-inner">
              <div className="about-hero-copy">
                {headlineRaw && (
                  <h1 className="about-title">
                    <span>{headlineBlack}</span>
                    {headlineOrange && (
                      <> <span className="about-title-accent">{headlineOrange}</span></>
                    )}
                  </h1>
                )}
                {description && <p className="about-lead">{description}</p>}
              </div>
            </div>
          </section>
        )}

        {/* ── Dynamic Description Blocks from Admin ─────── */}
        {!loading && blocks.length > 0 ? (
          blocks.map((block, i) => {
            const { black: hBlack, orange: hOrange } = splitHeadline(block.heading || "");
            return (
              <section
                key={block.id || i}
                className={`about-section ${i % 2 === 0 ? "about-section-white" : "about-section-cream"}`}
                aria-label={block.heading || `Section ${i + 1}`}
              >
                <div className="about-hero-inner">
                  <div className="about-split-block">
                    {block.heading && (
                      <h2 className="about-split-title">
                        <span>{hBlack}</span>
                        {hOrange && (
                          <> <span className="about-split-accent">{hOrange}</span></>
                        )}
                      </h2>
                    )}
                    {block.html && (
                      <div
                        className="about-split-text"
                        dangerouslySetInnerHTML={{ __html: block.html }}
                      />
                    )}
                  </div>
                </div>
              </section>
            );
          })
        ) : null}



        <WhatsAppFab message="Hi! I want to enquire about your nutrition plans." />
      </main>
    </>
  );
}
