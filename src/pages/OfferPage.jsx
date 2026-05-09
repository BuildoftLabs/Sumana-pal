import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { footerSection, navItems } from "../content/homeContent";
import Footer from "../sections/Footer";
import TopNav from "../sections/TopNav";
import WhatsAppFab, { buildWhatsAppHref } from "../components/WhatsAppFab";
import { useSEO } from "../hooks/useSEO";

function toSlug(str) {
  return (str || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function OfferPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: offer ? `${offer.headline} | Nutrition Offers | Dietitian Sumana Pal Roy` : "Nutrition Packages & Offers | Dietitian Sumana Pal Roy",
    description: offer?.description
      ? `${offer.description.slice(0, 150)}`
      : "Limited-time diet consultation offers and nutrition packages by Dietitian Sumana Pal Roy, Kolkata. Book now for personalized plans.",
    canonical: `/offers/${id}`
  });

  // Countdown timer state (Mocking 3 days from now)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, mins: 23, secs: 9 });

  useEffect(() => {
    async function loadOffer() {
      setLoading(true);
      try {
        // First: try fetching by slug match (headline → slug)
        const q = query(collection(db, "offers"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const matched = snap.docs.find(d => toSlug(d.data().headline) === id);

        let data, docId;
        if (matched) {
          data = matched.data();
          docId = matched.id;
        } else {
          // Fallback: try direct doc ID lookup (old links)
          const docRef = doc(db, "offers", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            data = docSnap.data();
            docId = docSnap.id;
          }
        }

        if (data) {
          setOffer({
            id: docId,
            headline: data.headline,
            description: data.description,
            badge: data.badge || "Limited Time Offer",
            image: data.image || "https://res.cloudinary.com/dcogunzot/image/upload/v1714574932/Navratri_offer_banner_zldvj8.png",
            descriptionBlocks: data.descriptionBlocks || [],
            timerEnabled: Boolean(data.timerEnabled),
            timerTarget: data.timerTarget || "",
            // Testimonial
            clientSayEnabled: Boolean(data.clientSayEnabled),
            clientSayStars: Number(data.clientSayStars) || 5,
            clientSayText: data.clientSayText || "",
            clientSayName: data.clientSayName || "",
            clientSayAge: data.clientSayAge || "",
            clientSayGender: data.clientSayGender || "",
            // Terms
            termsEnabled: Boolean(data.termsEnabled),
            termsText: data.termsText || "",
          });
        } else {
          setOffer(null);
        }
      } catch (error) {
        console.error("Error fetching offer:", error);
        setOffer(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadOffer();
    }
  }, [id]);

  // Real countdown from timerTarget
  useEffect(() => {
    if (!offer?.timerEnabled || !offer?.timerTarget) return;

    function getTimeLeft() {
      const diff = Math.max(0, new Date(offer.timerTarget) - Date.now());
      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000)  / 60000);
      const secs  = Math.floor((diff % 60000)    / 1000);
      return { days, hours, mins, secs };
    }

    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [offer]);

  if (loading) {
    return (
      <main className="offer-page">
        <TopNav navItems={navItems} />
        <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '60vh' }}>
          <h2 style={{ color: '#002e4f' }}>Loading offer details...</h2>
        </div>
        <Footer data={footerSection} />
      </main>
    );
  }

  if (!offer) {
    return (
      <main className="offer-page">
        <TopNav navItems={navItems} />
        <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '60vh' }}>
          <h1 style={{ color: '#002e4f', fontSize: '2.5rem', marginBottom: '10px' }}>Offer Not Found</h1>
          <p style={{ color: '#09558b', fontSize: '1.1rem', marginBottom: '30px' }}>This offer may have expired or doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            style={{ padding: '12px 24px', background: '#f26f3f', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Back to Home
          </button>
        </div>
        <Footer data={footerSection} />
      </main>
    );
  }

  const wpLink = buildWhatsAppHref(`Hi! I want to avail this offer: ${offer.badge ? offer.badge + ' - ' : ''}${offer.headline}`);

  return (
    <main className="offer-page">
      <TopNav navItems={navItems} />

      <section className="offer-details">
        {/* Banner */}
        <div className="offer-hero">
          <img src={offer.image} alt={offer.headline} className="offer-hero-img" />
        </div>

        <div className="offer-content-container">
          {/* Header section */}
          <div className="offer-header-center">
            <span className="offer-badge-pill">{offer.badge}</span>
            <h1 className="offer-headline-huge">{offer.headline}</h1>
            <p className="offer-subtitle-text">{offer.description}</p>
            
            {/* Timer — only shown when enabled in admin */}
            {offer.timerEnabled && offer.timerTarget && (
              <div className="offer-timer">
                <div className="timer-box">
                  <span className="timer-num">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="timer-label">DAYS</span>
                </div>
                <div className="timer-box">
                  <span className="timer-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="timer-label">Hours</span>
                </div>
                <div className="timer-box">
                  <span className="timer-num">{String(timeLeft.mins).padStart(2, '0')}</span>
                  <span className="timer-label">Mins</span>
                </div>
                <div className="timer-box">
                  <span className="timer-num">{String(timeLeft.secs).padStart(2, '0')}</span>
                  <span className="timer-label">Sec</span>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="offer-tags">
              <span className="offer-tag">Special Offer</span>
              <span className="offer-tag">Limited Time</span>
              <span className="offer-tag">Personal Attention</span>
            </div>
          </div>

          <div className="offer-body-left">
            {/* descriptionBlocks from Firebase (primary) */}
            {offer.descriptionBlocks?.length > 0 ? (
              offer.descriptionBlocks.map((block, i) => (
                <div key={block.id || i} className="offer-section-block">
                  {block.heading && <h2 className="offer-section-title">{block.heading}</h2>}
                  <div className="offer-rich-html" dangerouslySetInnerHTML={{ __html: block.html }} />
                </div>
              ))
            ) : (
              <div className="offer-section-block">
                <p style={{ color: "rgba(39,72,63,0.55)", fontStyle: "italic" }}>No detailed content added yet.</p>
              </div>
            )}

            {/* CTA Box */}
            <div className="offer-cta-box">
              <h3 className="cta-box-title">Slots filling fast!</h3>
              <p className="cta-box-sub">I take a limited number of new clients each month to give everyone personal attention.</p>
              <div className="cta-box-buttons">
                <a href={wpLink} target="_blank" rel="noreferrer" className="cta-btn-solid">Grab This Offer</a>
                <button onClick={() => window.location.href = '/contact'} className="cta-btn-outline">Book a Free Discovery Call First</button>
              </div>
            </div>

            {/* What clients say — only shown when enabled & data exists */}
            {offer.clientSayEnabled && offer.clientSayText && (
              <div className="offer-section-block">
                <h2 className="offer-section-title">What clients say</h2>
                <div className="offer-review-card">
                  <div className="review-stars">
                    {Array.from({ length: offer.clientSayStars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    {Array.from({ length: 5 - offer.clientSayStars }).map((_, i) => (
                      <span key={i} style={{ opacity: 0.3 }}>★</span>
                    ))}
                  </div>
                  <p className="review-text">"{offer.clientSayText}"</p>
                  <span className="review-author">
                    - {offer.clientSayName}
                    {(offer.clientSayAge || offer.clientSayGender) && (
                      <>, {offer.clientSayAge}{offer.clientSayAge && offer.clientSayGender ? " " : ""}{offer.clientSayGender?.[0]}</>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Terms & Conditions — only shown when enabled & text exists */}
            {offer.termsEnabled && offer.termsText && (
              <div className="offer-section-block">
                <h2 className="offer-section-title">Terms &amp; Conditions</h2>
                <div className="offer-terms-text" style={{ whiteSpace: "pre-line", lineHeight: 1.8, color: "rgba(39,72,63,0.8)", fontSize: "0.95rem" }}>
                  {offer.termsText}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer data={footerSection} />
      <WhatsAppFab message={`Hi! I want to enquire about the ${offer.headline} offer.`} />
    </main>
  );
}
