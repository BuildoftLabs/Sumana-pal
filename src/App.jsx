import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AboutPage from "./pages/AboutPage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogsPage from "./pages/BlogsPage";
import HomePage from "./pages/HomePage";
import AllTransformationsPage from "./pages/AllTransformationsPage";
import OfferPage from "./pages/OfferPage";
import ServicePage from "./pages/ServicePage";
import AllOffersPage from "./pages/AllOffersPage";
import AllServicesPage from "./pages/AllServicesPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<HomePage scrollToSection="services" />} />
      <Route path="/testimonials" element={<HomePage scrollToSection="testimonials" />} />
      <Route path="/offers" element={<HomePage scrollToSection="offers" />} />
      <Route path="/contact" element={<HomePage scrollToSection="contact" />} />
      <Route path="/faqs" element={<HomePage scrollToSection="faqs" />} />
      <Route path="/bmi-calculator" element={<HomePage scrollToSection="bmi-calculator" />} />
      <Route path="/blog-section" element={<HomePage scrollToSection="blogs" />} />
      <Route path="/transformations-section" element={<HomePage scrollToSection="transformations" />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blogs/:slug" element={<BlogPostPage />} />
      <Route path="/offers/:id" element={<OfferPage />} />
      <Route path="/services/:slug" element={<ServicePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/transformations" element={<AllTransformationsPage />} />
      <Route path="/all-offers" element={<AllOffersPage />} />
      <Route path="/all-services" element={<AllServicesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
