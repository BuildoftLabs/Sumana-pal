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
} from "./content/homeContent";
import BmiTool from "./sections/BmiTool";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Offers from "./sections/Offers";
import QuestionForm from "./sections/QuestionForm";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import TopNav from "./sections/TopNav";
import Transformations from "./sections/Transformations";
import Treat from "./sections/Treat";

export default function App() {
  return (
    <main>
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
  );
}
