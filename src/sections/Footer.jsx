import { Link } from "react-router-dom";

export default function Footer({ data }) {
  const footerPathMap = {
    Home: "/",
    Services: "/services",
    Testimonial: "/testimonials",
    Offers: "/offers",
    "About me": "/about",
    Blogs: "/blogs",
    Contact: "/contact"
  };

  return (
    <footer className="new-footer" aria-label="Footer">
      <div className="new-footer-container">
        <div className="new-footer-left">
          <p className="new-footer-brand-title">DIETITIAN</p>
          <h2 className="new-footer-brand-name">Sumana Pal Roy</h2>
          <p className="new-footer-tagline">Let Food Be The Medicine</p>
          <p className="new-footer-desc">
            Helping busy people eat better, feel stronger, and manage health conditions — through
            personalized diet plans that fit real life.
          </p>
        </div>

        <div className="new-footer-links" aria-label="Footer quick links">
          <nav className="new-footer-nav" aria-label="Footer Navigation">
            {["Home", "Services", "Testimonial", "Offers", "About me", "Blogs", "Contact"].map((item) => (
              <Link
                key={item}
                to={footerPathMap[item] ?? "/"}
                className="new-footer-nav-link"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        <div className="new-footer-right">
          <div className="new-footer-socials" aria-label="Social links">
            <a href={data.links.instagram.href} target="_blank" rel="noreferrer" className="new-footer-social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M17.7 6.3h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </a>
            <a href={data.links.whatsapp.href} target="_blank" rel="noreferrer" className="new-footer-social-icon" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24">
                <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9.2 8.8c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7 0 .2 0 .3-.1.4l-.4.5c-.1.1-.2.2-.1.4.2.4.8 1.2 1.6 1.8.8.6 1.5.8 1.9 1 .2.1.3 0 .4-.1l.5-.6c.1-.1.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.4 0 .2 0 1.1-.6 1.6-.6.5-1.2.5-1.5.4-.3 0-1.2-.3-2.5-.9-1.5-.7-2.6-2-3-2.5-.4-.5-1.1-1.6-1.3-2.6-.2-1 .2-1.7.5-2.1Z" fill="currentColor" opacity="0.9" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="new-footer-social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="new-footer-map-widget">
            <iframe
              title={data.map.iframeTitle}
              src={data.map.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="new-footer-newsletter">
            <h3 className="newsletter-heading">Get free nutrition tips every week</h3>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="example@mail.com" className="newsletter-input" required />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Watermark Background */}
      <div className="new-footer-watermark" aria-hidden="true">
        DT. SUMANA PAL
      </div>
    </footer>
  );
}

