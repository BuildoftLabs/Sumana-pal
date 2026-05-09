import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { navItems, footerSection } from "../content/homeContent";
import TopNav from "../sections/TopNav";
import Footer from "../sections/Footer";
import WhatsAppFab, { buildWhatsAppHref } from "../components/WhatsAppFab";
import { useSEO } from "../hooks/useSEO";

const SLUG_MAP = {
  "PCOD/PCOS": "pcod-treatment",
  "PCOD": "pcod-treatment",
  "PCOS": "pcod-treatment",
  "Weight Loss": "weight-loss",
  "Thyroid": "thyroid-management",
  "Diabetes": "diabetes-management",
};

function getCategorySlug(category) {
  if (!category) return null;
  if (SLUG_MAP[category]) return SLUG_MAP[category];
  return category.toLowerCase().replace(/\s+/g, "-");
}

export default function AllServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: "All Nutrition Services | Dietitian Sumana Pal Roy Kolkata",
    description: "Browse all diet and nutrition services by Dietitian Sumana Pal Roy — weight loss, PCOS, thyroid, diabetes, and more. Book your consultation today.",
    canonical: "/all-services"
  });

  useEffect(() => {
    async function loadServices() {
      try {
        const q = query(collection(db, "services"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const fetched = snap.docs.map(doc => {
          const item = doc.data();
          const slug = getCategorySlug(item.category);
          return {
            id: doc.id,
            title: item.category || "Uncategorised",
            description: item.description,
            imageUrl: item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            imageAlt: item.category || "Service image",
            slug,
            grabHref: buildWhatsAppHref(`Hi! I want to enquire about the ${item.category || "nutrition"} service.`)
          };
        });
        setServices(fetched);
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <>
      <main className="all-services-page" aria-label="All Services">
        <TopNav navItems={navItems} />

        <section className="all-services-hero">
          <div className="all-services-hero-inner">
            <p className="all-services-badge">Expert Care</p>
            <h1 className="all-services-title">
              All <span className="all-services-title-accent">Nutrition Services</span>
            </h1>
            <p className="all-services-sub">Personalized plans for every health condition — backed by science, driven by results.</p>
          </div>
        </section>

        <section className="all-services-grid-section">
          <div className="all-services-grid-inner">
            {loading ? (
              <p className="all-services-loading">Loading services...</p>
            ) : services.length === 0 ? (
              <p className="all-services-empty">No services found. Please check back later.</p>
            ) : (
              <div className="all-services-grid">
                {services.map((service) => (
                  <article className="all-service-card" key={service.id}>
                    <div className="all-service-img-wrap">
                      <img className="all-service-img" src={service.imageUrl} alt={service.imageAlt} loading="lazy" />
                    </div>
                    <div className="all-service-body">
                      <h2 className="all-service-title">{service.title}</h2>
                      {service.description && <p className="all-service-desc">{service.description}</p>}
                      <div className="all-service-actions">
                        <a className="all-service-btn all-service-btn-primary" href={service.grabHref} target="_blank" rel="noreferrer">
                          Grab This
                        </a>
                        {service.slug ? (
                          <Link className="all-service-btn all-service-btn-outline" to={`/services/${service.slug}`}>
                            Know More →
                          </Link>
                        ) : (
                          <Link className="all-service-btn all-service-btn-outline" to="/contact">
                            Enquire →
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer data={footerSection} navItems={navItems} />
      </main>
      <WhatsAppFab />
    </>
  );
}
