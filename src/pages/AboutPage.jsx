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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />
    <main className="about-page" aria-label="About me page">
      <TopNav navItems={navItems} />

      <section className="about-section about-section-white about-img-section" aria-label="About Image">
        <div className="about-hero-inner">
          <div className="about-hero-media">
            <img className="about-hero-img" src="/about.png" alt="Sumana Pal Roy" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="about-section about-section-white" aria-label="About me content">
        <div className="about-hero-inner">
          <div className="about-hero-copy">
            <h1 className="about-title">
              About Dietitian Sumana Pal Roy
              <br />
              <span className="about-title-accent">Certified Dietitian &amp; Nutritionist in Kolkata</span>
            </h1>

            <p className="about-lead">
              It is a long established fact that a reader will be distracted by the readable content of a
              page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
              making it look like readable English.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-section-cream" aria-label="Awards and Recognition">
        <div className="about-hero-inner">
          <div className="about-split-block">
            <h2 className="about-split-title">
              Awards <span className="about-split-accent">&amp; Recognition</span>
            </h2>
            <p className="about-split-text">
              It is a long established fact that a reader will be distracted by the readable content of a
              page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using 'Content here, content
              here', making it look like readable English.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-section-white" aria-label="Education and Training">
        <div className="about-hero-inner">
          <div className="about-split-block">
            <h2 className="about-split-title">
              Education <span className="about-split-accent">&amp; Training</span>
            </h2>
            <p className="about-split-text">
              It is a long established fact that a reader will be distracted by the readable content of a
              page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using 'Content here, content
              here', making it look like readable English.
            </p>
          </div>
        </div>
      </section>

      <WhatsAppFab message="Hi! I want to enquire about your nutrition plans." />
    </main>
    </>
  );
}
