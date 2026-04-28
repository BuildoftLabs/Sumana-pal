import { useEffect, useState } from "react";
import {
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

export default function HomePage() {
  const [loaderStage, setLoaderStage] = useState("visible");

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
        <Faq data={faqSection} />
        <Footer data={footerSection} />
      </main>
    </>
  );
}

