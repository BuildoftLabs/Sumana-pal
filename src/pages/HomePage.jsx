import { useEffect, useState } from "react";
import {
  blogSection,
  bmiSection,
  faqSection,
  footerSection,
  navItems,
  offersSection,
  questionSection,
  servicesSection,
  testimonialsSection,
  transformationsSection,
  treatSection
} from "../content/homeContent";
import BmiTool from "../sections/BmiTool";
import BlogSection from "../sections/BlogSection";
import Faq from "../sections/Faq";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Offers from "../sections/Offers";
import QuestionForm from "../sections/QuestionForm";
import Services from "../sections/Services";
import Testimonials from "../sections/Testimonials";
import TopNav from "../sections/TopNav";
import Transformations from "../sections/Transformations";
import Treat from "../sections/Treat";

export default function HomePage({ scrollToSection = null }) {
  const [loaderStage, setLoaderStage] = useState("visible");
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);

  useEffect(() => {
    const openCurtainTimer = window.setTimeout(() => setLoaderStage("opening"), 2300);
    const hideLoaderTimer = window.setTimeout(() => setLoaderStage("hidden"), 3400);

    document.body.classList.toggle("is-loader-active", loaderStage === "visible");

    return () => {
      window.clearTimeout(openCurtainTimer);
      window.clearTimeout(hideLoaderTimer);
      document.body.classList.remove("is-loader-active");
    };
  }, [loaderStage]);

  useEffect(() => {
    if (!scrollToSection) return;
    if (loaderStage !== "hidden") return;

    const scrollTimer = window.setTimeout(() => {
      const target = document.getElementById(scrollToSection);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    return () => window.clearTimeout(scrollTimer);
  }, [loaderStage, scrollToSection]);

  useEffect(() => {
    if (loaderStage !== "hidden") return undefined;

    const popupTimer = window.setTimeout(() => {
      setIsLeadPopupOpen(true);
    }, 10000);

    return () => window.clearTimeout(popupTimer);
  }, [loaderStage]);

  return (
    <>
      {loaderStage !== "hidden" && (
        <div className={`intro-loader ${loaderStage === "opening" ? "is-opening" : ""}`} aria-hidden="true">
          <div className="intro-loader-panel">
            <div className="intro-loader-content">
              <p className="intro-loader-role">DIETITIAN</p>
              <h1 className="intro-loader-name">Sumana Pal Roy</h1>
              <p className="intro-loader-status">Loading...</p>

              <div className="intro-loader-progress">
                <span className="intro-loader-progress-fill" />
              </div>
            </div>
          </div>
        </div>
      )}

      {isLeadPopupOpen && (
        <div className="lead-popup-backdrop" role="dialog" aria-modal="true" aria-label="Personalized diet plan form">
          <div className="lead-popup">
            <button
              className="lead-popup-close"
              type="button"
              aria-label="Close popup"
              onClick={() => setIsLeadPopupOpen(false)}
            >
              ×
            </button>

            <h3 className="lead-popup-title">Want a Personalized Diet Plan?</h3>
            <p className="lead-popup-sub">Fill this form and I'll get back to you within 24 hours — usually sooner.</p>

            <form className="lead-popup-form" onSubmit={(e) => e.preventDefault()}>
              <label className="lead-popup-field">
                <span className="lead-popup-label">
                  Your Name <span className="lead-popup-required">*</span>
                </span>
                <input className="lead-popup-input" type="text" placeholder="Enter Your Full Name" />
              </label>

              <label className="lead-popup-field">
                <span className="lead-popup-label">
                  Phone Number <span className="lead-popup-required">*</span>
                </span>
                <input className="lead-popup-input" type="tel" placeholder="Enter Your Phone Number" />
              </label>

              <label className="lead-popup-field">
                <span className="lead-popup-label">
                  How can we help you? <span className="lead-popup-required">*</span>
                </span>
                <input className="lead-popup-input" type="text" placeholder="example@mail.com" />
              </label>

              <button className="lead-popup-submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <main className={loaderStage !== "visible" ? "site-shell is-ready" : "site-shell"} id="home">
        <TopNav navItems={navItems} />
        <Hero />
        <Treat data={treatSection} />
        <Services data={servicesSection} />
        <Testimonials data={testimonialsSection} />
        <Transformations data={transformationsSection} />
        <QuestionForm data={questionSection} />
        <Offers data={offersSection} />
        <BmiTool data={bmiSection} />
        <BlogSection data={blogSection} />
        <Faq data={faqSection} />
        <Footer data={footerSection} />
      </main>
    </>
  );
}

