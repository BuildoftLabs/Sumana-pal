import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { navItems, footerSection } from "../content/homeContent";
import TopNav from "../sections/TopNav";
import Footer from "../sections/Footer";
import WhatsAppFab, { buildWhatsAppHref } from "../components/WhatsAppFab";
import { useSEO } from "../hooks/useSEO";

function toSlug(str) {
  return (str || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function AllOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: "All Nutrition Offers & Packages | Dietitian Sumana Pal Roy",
    description: "Browse all limited-time diet consultation offers and nutrition packages by Dietitian Sumana Pal Roy, Kolkata. Book a personalized plan today.",
    canonical: "/all-offers"
  });

  useEffect(() => {
    async function loadOffers() {
      try {
        const q = query(collection(db, "offers"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const fetched = snap.docs.map(doc => {
          const item = doc.data();
          if (!item.isActive) return null;
          return {
            id: doc.id,
            title: item.headline,
            subtitle: item.description,
            imageUrl: item.image || "/offer-card.png",
            imageAlt: item.headline,
            badge: item.badge || null,
            primaryCta: { label: "Grab This Offer", href: buildWhatsAppHref(`Hi! I want to avail this offer: ${item.badge ? item.badge + " - " : ""}${item.headline}`) },
            secondaryCta: { label: "Know More", href: `/offers/${toSlug(item.headline) || doc.id}` }
          };
        }).filter(Boolean);
        setOffers(fetched);
      } catch (err) {
        console.error("Failed to fetch offers", err);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  return (
    <>
      <main className="all-offers-page" aria-label="All Offers">
        <TopNav navItems={navItems} />

        <section className="all-offers-hero">
          <div className="all-offers-hero-inner">
            <p className="all-offers-badge">Limited Time</p>
            <h1 className="all-offers-title">
              All <span className="all-offers-title-accent">Offers & Packages</span>
            </h1>
            <p className="all-offers-sub">Handpicked plans designed to help you reach your health goals faster.</p>
          </div>
        </section>

        <section className="all-offers-grid-section">
          <div className="all-offers-grid-inner">
            {loading ? (
              <p className="all-offers-loading">Loading offers...</p>
            ) : offers.length === 0 ? (
              <p className="all-offers-empty">No active offers at the moment. Check back soon!</p>
            ) : (
              <div className="all-offers-grid">
                {offers.map((offer) => (
                  <article className="all-offer-card" key={offer.id}>
                    <div className="all-offer-img-wrap">
                      <img className="all-offer-img" src={offer.imageUrl} alt={offer.imageAlt} loading="lazy" />
                      {offer.badge && <span className="all-offer-badge">{offer.badge}</span>}
                    </div>
                    <div className="all-offer-body">
                      <h2 className="all-offer-title">{offer.title}</h2>
                      {offer.subtitle && <p className="all-offer-sub">{offer.subtitle}</p>}
                      <div className="all-offer-actions">
                        <a className="all-offer-btn all-offer-btn-primary" href={offer.primaryCta.href} target="_blank" rel="noreferrer">
                          {offer.primaryCta.label}
                        </a>
                        <Link className="all-offer-btn all-offer-btn-outline" to={offer.secondaryCta.href}>
                          {offer.secondaryCta.label} →
                        </Link>
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
