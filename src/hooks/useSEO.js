import { useEffect } from "react";

const BASE_DOMAIN = "https://dietitiansumana.com";

/**
 * Dynamically sets per-page SEO metadata.
 * Call at the top of each page component.
 *
 * @param {object} options
 * @param {string} options.title        - Full page title (shown in browser tab & Google)
 * @param {string} options.description  - Meta description (150-160 chars ideal)
 * @param {string} [options.canonical]  - Canonical path, e.g. "/about" (default: current path)
 * @param {string} [options.ogImage]    - Absolute OG image URL
 * @param {string} [options.ogType]     - OG type, defaults to "website"
 */
export function useSEO({
  title,
  description,
  canonical,
  ogImage = `${BASE_DOMAIN}/hero-image.png`,
  ogType = "website"
}) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Helper to set/create a meta tag
    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrValue] = selector.replace("meta[", "").replace("]", "").split("=");
        el.setAttribute(attrName.trim(), attrValue.replace(/"/g, "").trim());
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Description
    setMeta('meta[name="description"]', "content", description);

    // Canonical
    const canonicalPath = canonical ?? window.location.pathname;
    const canonicalHref = `${BASE_DOMAIN}${canonicalPath}`;
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalHref);

    // Open Graph
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalHref);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:type"]', "content", ogType);

    // Twitter
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);
  }, [title, description, canonical, ogImage, ogType]);
}
