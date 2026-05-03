import { Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogsPage from "./pages/BlogsPage";
import HomePage from "./pages/HomePage";
import AllTransformationsPage from "./pages/AllTransformationsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<HomePage scrollToSection="services" />} />
      <Route path="/testimonials" element={<HomePage scrollToSection="testimonials" />} />
      <Route path="/offers" element={<HomePage scrollToSection="offers" />} />
      <Route path="/contact" element={<HomePage scrollToSection="contact" />} />
      <Route path="/faqs" element={<HomePage scrollToSection="faqs" />} />
      <Route path="/bmi-calculator" element={<HomePage scrollToSection="bmi-calculator" />} />
      <Route path="/blog-section" element={<HomePage scrollToSection="blogs" />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blogs/:slug" element={<BlogPostPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/transformations" element={<AllTransformationsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
