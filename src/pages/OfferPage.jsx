import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { footerSection, navItems } from "../content/homeContent";
import Footer from "../sections/Footer";
import TopNav from "../sections/TopNav";
import WhatsAppFab, { buildWhatsAppHref } from "../components/WhatsAppFab";

export default function OfferPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Countdown timer state (Mocking 3 days from now)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, mins: 23, secs: 9 });

  useEffect(() => {
    async function loadOffer() {
      setLoading(true);
      try {
        const docRef = doc(db, "offers", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setOffer({
            id: docSnap.id,
            headline: data.headline,
            description: data.description,
            badge: data.badge || "Limited Time Offer",
            image: data.image || "https://res.cloudinary.com/dcogunzot/image/upload/v1714574932/Navratri_offer_banner_zldvj8.png",
            whatsIncluded: data.whatsIncluded || [
              "1-on-1 personalized coaching sessions : Weekly calls tailored to your goals",
              "Custom action plan & roadmap : Personalized to your specific situation",
              "WhatsApp support between sessions : Quick answers when you need them most",
              "Access to resource library & templates : Worksheets, trackers & exclusive guides"
            ],
            terms: data.terms || [
              "Offer valid for a limited time only. Limited slots available.",
              "Discount applies to the first month's payment only. Standard pricing from month 2.",
              "Non-transferable and cannot be combined with other offers.",
              "A minimum 1-month commitment is required to book under this offer.",
              "Refund policy: 100% refund within 48 hours of first session if not satisfied."
            ]
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

  useEffect(() => {
    if (!offer) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) secs--;
        else {
          secs = 59;
          if (mins > 0) mins--;
          else {
            mins = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, mins, secs };
      });
    }, 1000);
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
            
            {/* Timer */}
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

            {/* Tags */}
            <div className="offer-tags">
              <span className="offer-tag">Special Offer</span>
              <span className="offer-tag">Limited Time</span>
              <span className="offer-tag">Personal Attention</span>
            </div>
          </div>

          <div className="offer-body-left">
            {/* What's included */}
            <div className="offer-section-block">
              <h2 className="offer-section-title">What's included?</h2>
              <ul className="offer-list">
                {offer.whatsIncluded.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* CTA Box */}
            <div className="offer-cta-box">
              <h3 className="cta-box-title">Slots filling fast!</h3>
              <p className="cta-box-sub">I take a limited number of new clients each month to give everyone personal attention.</p>
              <div className="cta-box-buttons">
                <a href={wpLink} target="_blank" rel="noreferrer" className="cta-btn-solid">Grab This Offer</a>
                <button onClick={() => window.location.href = '/contact'} className="cta-btn-outline">Book a Free Discovery Call First</button>
              </div>
            </div>

            {/* Reviews (Mocked for now as per design) */}
            <div className="offer-section-block">
              <h2 className="offer-section-title">What clients say</h2>
              <div className="offer-review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"The personalised attention completely changed my approach. I achieved more in 4 weeks than I had in 6 months on my own."</p>
                <span className="review-author">- Shreya Jha, 21 F</span>
              </div>
              <div className="offer-review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"The personalised attention completely changed my approach. I achieved more in 4 weeks than I had in 6 months on my own."</p>
                <span className="review-author">- Saptarshi Ghosh, 21 M</span>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="offer-section-block">
              <h2 className="offer-section-title">Terms & conditions</h2>
              <ul className="offer-list">
                {offer.terms.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer data={footerSection} />
      <WhatsAppFab message={`Hi! I want to enquire about the ${offer.headline} offer.`} />
    </main>
  );
}
