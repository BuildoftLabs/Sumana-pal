import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { footerSection, navItems } from "../content/homeContent";
import Footer from "../sections/Footer";
import TopNav from "../sections/TopNav";
import WhatsAppFab, { buildWhatsAppHref } from "../components/WhatsAppFab";

// ── Hardcoded fallback content per service slug ──────────────────────────────
const HARDCODED_SERVICES = {
  "pcod-treatment": {
    title: "PCOS Care – Take Control Naturally",
    badge: "PCOD Treatment",
    description: "Struggling with irregular periods, weight gain, acne, or difficulty conceiving? PCOS is a hormonal and metabolic condition, often linked with insulin resistance—but with the right nutrition, it can be effectively managed.",
    whatIs: "PCOS (Polycystic Ovary Syndrome) is a hormonal condition where the body produces excess androgens and often shows insulin resistance, leading to symptoms like weight gain, irregular cycles, acne, and hair fall.",
    symptoms: ["Irregular or missed periods", "Weight gain (especially belly fat)", "Acne / oily skin", "Hair fall or unwanted facial hair", "Difficulty conceiving", "Sugar cravings / fatigue"],
    whoIsThisFor: ["Women with diagnosed PCOS/PCOD", "Trying to conceive", "Facing weight gain with hormonal issues", "Irregular lifestyle (night shifts, stress)"],
    whatYouGet: ["Customised diet plan (based on lifestyle & preferences)", "Weight management strategy", "Insulin resistance management", "Meal timing guidance (important for PCOS)", "Supplement guidance (if needed)", "Weekly/bi-weekly follow-ups", "WhatsApp support"],
    results: ["Improved cycle regularity", "Better energy levels", "Gradual weight loss", "Reduced acne & hair fall", "Improved fertility markers"],
  },
  "weight-loss": {
    title: "Weight Loss – Sustainable & Science-Backed",
    badge: "Weight Loss",
    description: "Tired of crash diets that never last? Our personalized weight loss plans are built around your lifestyle, food preferences, and body type — so results actually stick.",
    whatIs: "Weight loss through nutrition means creating a sustainable calorie deficit while ensuring your body gets all the nutrients it needs. No starvation, no fad diets — just smart eating.",
    symptoms: ["Unexplained weight gain", "Low energy & fatigue", "Poor digestion", "Emotional eating patterns", "Plateaued weight despite effort"],
    whoIsThisFor: ["Anyone wanting to lose weight sustainably", "People who have tried diets and failed", "Working professionals with busy schedules", "Those with PCOS, thyroid, or insulin resistance"],
    whatYouGet: ["Custom calorie & macro plan", "Flexible meal options (veg/non-veg)", "Weekly check-ins & adjustments", "Habit coaching & mindset support", "WhatsApp access between sessions"],
    results: ["Consistent weekly weight loss", "Improved energy levels", "Better sleep & digestion", "Reduced bloating", "Long-term lifestyle habits"],
  },
  "diabetes-management": {
    title: "Diabetes Management – Eat Smart, Live Well",
    badge: "Diabetes Management",
    description: "Managing diabetes doesn't mean giving up good food. Our plans are designed to keep blood sugar stable while keeping meals enjoyable and nutritious.",
    whatIs: "Diabetes management through diet focuses on controlling blood glucose levels by choosing the right foods, meal timings, and portion sizes — reducing dependency on medication over time.",
    symptoms: ["High fasting blood sugar", "Frequent thirst or urination", "Fatigue after meals", "Slow wound healing", "Blurred vision or tingling"],
    whoIsThisFor: ["Type 2 diabetics or pre-diabetics", "Those with family history of diabetes", "Overweight individuals at risk", "People wanting to reduce medication"],
    whatYouGet: ["Glycaemic index-based meal plan", "Blood sugar friendly recipes", "Carb cycling strategies", "Supplement guidance", "Fortnightly follow-ups"],
    results: ["Stabilised blood sugar levels", "Reduced HbA1c over time", "Weight loss (if needed)", "Better energy throughout the day", "Reduced medication dependency (with doctor guidance)"],
  },
  "thyroid-management": {
    title: "Thyroid Management – Balance Your Hormones",
    badge: "Thyroid Management",
    description: "Thyroid issues can make weight management feel impossible. Our nutrition plans support thyroid function, reduce inflammation, and help restore hormonal balance naturally.",
    whatIs: "The thyroid gland controls metabolism. When it's underactive (hypothyroidism) or overactive (hyperthyroidism), it disrupts weight, energy, and mood. The right diet can significantly improve thyroid function.",
    symptoms: ["Unexplained weight gain or loss", "Fatigue and brain fog", "Hair thinning or loss", "Cold sensitivity", "Constipation or irregular bowel movement"],
    whoIsThisFor: ["People with hypothyroidism or hyperthyroidism", "Those on thyroid medication wanting better results", "Anyone experiencing thyroid symptoms"],
    whatYouGet: ["Anti-inflammatory meal plan", "Iodine & selenium optimized foods", "Gut health support", "Lifestyle & stress management tips", "Monthly progress reviews"],
    results: ["Improved energy and metabolism", "Better weight management", "Reduced hair fall", "Improved mood and focus", "Hormonal balance support"],
  },
};

// ── Mobile Accordion Item ───────────────────────────────────────────────────
function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="spacc-item">
      <button
        className={`spacc-btn${open ? " spacc-btn-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="spacc-label">{title}</span>
        <span className="spacc-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="spacc-panel">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    async function loadService() {
      setLoading(true);
      try {
        const q = query(collection(db, "services"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const matched = snap.docs.find((doc) => {
          const data = doc.data();
          const docSlug = (data.category || "").toLowerCase().replace(/\s+/g, "-");
          return docSlug === slug || doc.id === slug;
        });

        const hardcoded = HARDCODED_SERVICES[slug] || {};
        if (matched) {
          const data = matched.data();
          setService({
            id: matched.id,
            title: data.headline || data.category || hardcoded.title,
            badge: data.category || hardcoded.badge,
            description: data.description || hardcoded.description,
            image: data.image || "/service-hero.jpg",
            whatIs: data.whatIs || hardcoded.whatIs || "",
            symptoms: data.symptoms?.length ? data.symptoms : (hardcoded.symptoms || []),
            whoIsThisFor: data.whoIsThisFor?.length ? data.whoIsThisFor : (hardcoded.whoIsThisFor || []),
            whatYouGet: data.whatYouGet?.length ? data.whatYouGet : (hardcoded.whatYouGet || []),
            results: data.results?.length ? data.results : (hardcoded.results || []),
          });
        } else if (hardcoded.title) {
          setService({ ...hardcoded, image: "/service-hero.jpg" });
        } else {
          setService(null);
        }
      } catch (err) {
        console.error("Failed to load service:", err);
        const hardcoded = HARDCODED_SERVICES[slug];
        if (hardcoded) {
          setService({ ...hardcoded, image: "/service-hero.jpg" });
        } else {
          setService(null);
        }
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadService();
  }, [slug]);

  const sections = [
    { id: "sp-plan", label: "Plan Description" },
    { id: "sp-what-is", label: `What is ${service?.badge || "This"}?` },
    { id: "sp-symptoms", label: "Common Symptoms" },
    { id: "sp-who", label: "Who is This For?" },
    { id: "sp-get", label: "What You'll Get in This Service:" },
    { id: "sp-results", label: "Results You Can Expect:" },
  ];

  const scrollToSection = (id, idx) => {
    const el = document.getElementById(id);
    if (el && contentRef.current) {
      contentRef.current.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
      setActiveSection(idx);
    }
  };

  if (loading) {
    return (
      <main>
        <TopNav navItems={navItems} />
        <div style={{ textAlign: "center", padding: "200px 20px", minHeight: "60vh" }}>
          <h2 style={{ color: "#002e4f" }}>Loading service details...</h2>
        </div>
        <Footer data={footerSection} />
      </main>
    );
  }

  if (!service) {
    return (
      <main>
        <TopNav navItems={navItems} />
        <div style={{ textAlign: "center", padding: "200px 20px", minHeight: "60vh" }}>
          <h1 style={{ color: "#002e4f" }}>Service Not Found</h1>
          <button
            onClick={() => navigate("/")}
            style={{ marginTop: 20, padding: "12px 24px", background: "#09558b", color: "#fff", border: "none", borderRadius: 10, fontWeight: "bold", cursor: "pointer" }}
          >
            Back to Home
          </button>
        </div>
        <Footer data={footerSection} />
      </main>
    );
  }

  const wpLink = buildWhatsAppHref(`Hi! I want to know more about your service: ${service.title}`);

  return (
    <main className="spv2-page">
      <TopNav navItems={navItems} />

      {/* ── DESKTOP LAYOUT ──────────────────────────────────────────── */}
      <div className="sp-desktop">
        {/* Hero Image — full bleed */}
        <div className="sp-hero">
          <img src={service.image} alt={service.title} className="sp-hero-img" />
        </div>

        {/* Two-column layout */}
        <div className="sp-layout">
          {/* LEFT — Sticky TOC */}
          <aside className="sp-toc">
            <h4 className="sp-toc-heading">CONTENT</h4>
            <nav>
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  className={`sp-toc-item${activeSection === i ? " sp-toc-active" : ""}`}
                  onClick={() => scrollToSection(s.id, i)}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* RIGHT — Scrollable content */}
          <div className="sp-content" ref={contentRef}>
            <span className="sp-badge">{service.badge}</span>

            <h1 className="sp-title" id="sp-plan">{service.title}</h1>
            <p className="sp-desc">{service.description}</p>

            {service.whatIs && (
              <>
                <h2 className="sp-section-title" id="sp-what-is">What is {service.badge}?</h2>
                <p className="sp-body-text">{service.whatIs}</p>
              </>
            )}

            {service.symptoms?.length > 0 && (
              <>
                <h2 className="sp-section-title" id="sp-symptoms">Common Symptoms</h2>
                <ul className="sp-list">
                  {service.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </>
            )}

            {service.whoIsThisFor?.length > 0 && (
              <>
                <h2 className="sp-section-title" id="sp-who">Who is This For?</h2>
                <ul className="sp-list">
                  {service.whoIsThisFor.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </>
            )}

            {service.whatYouGet?.length > 0 && (
              <>
                <h2 className="sp-section-title" id="sp-get">What You'll Get in This Service?</h2>
                <ul className="sp-list">
                  {service.whatYouGet.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </>
            )}

            {service.results?.length > 0 && (
              <>
                <h2 className="sp-section-title" id="sp-results">Results You Can Expect</h2>
                <ul className="sp-list">
                  {service.results.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </>
            )}

            {/* CTA Box */}
            <div className="sp-cta-box">
              <h3 className="sp-cta-title">Get Your Personalized Plan Now</h3>
              <p className="sp-cta-sub">Start with a free 15-minute chat — no commitment, no pressure.</p>
              <a href={wpLink} target="_blank" rel="noreferrer" className="sp-cta-btn">
                Start My Transformation Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ───────────────────────────────────────────── */}
      <div className="sp-mobile">
        <div className="spv2-hero">
          <img src={service.image} alt={service.title} className="spv2-hero-img" />
        </div>

        <div className="spv2-body">
          <div className="spv2-header">
            <span className="spv2-badge">{service.badge}</span>
            <h1 className="spv2-title">{service.title}</h1>
            <p className="spv2-desc">{service.description}</p>
          </div>

          <div className="spv2-accordion">
            {service.whatIs && (
              <AccordionItem title={`What is ${service.badge}`} defaultOpen={true}>
                <p className="spacc-text">{service.whatIs}</p>
              </AccordionItem>
            )}
            {service.symptoms?.length > 0 && (
              <AccordionItem title="Common Symptoms">
                <ul className="spacc-list">
                  {service.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </AccordionItem>
            )}
            {service.whoIsThisFor?.length > 0 && (
              <AccordionItem title="Who is This For?">
                <ul className="spacc-list">
                  {service.whoIsThisFor.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </AccordionItem>
            )}
            {service.whatYouGet?.length > 0 && (
              <AccordionItem title="What You'll Get in This Service?">
                <ul className="spacc-list">
                  {service.whatYouGet.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </AccordionItem>
            )}
            {service.results?.length > 0 && (
              <AccordionItem title="Result You Can Expect">
                <ul className="spacc-list">
                  {service.results.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </AccordionItem>
            )}
          </div>

          <div className="spv2-cta">
            <div className="spv2-cta-text">
              <h3 className="spv2-cta-title">Get Your Personalized Plan Now</h3>
              <p className="spv2-cta-sub">Start with a free 15-minute chat — no commitment, no pressure.</p>
            </div>
            <a href={wpLink} target="_blank" rel="noreferrer" className="spv2-cta-btn">
              Start My Transformation Now
            </a>
          </div>
        </div>
      </div>

      <Footer data={footerSection} />
      <WhatsAppFab />
    </main>
  );
}
