export default function Footer({ data }) {
  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-name">{data.brand.name}</p>
            <p className="footer-tagline">{data.brand.tagline}</p>

            <div className="footer-links" aria-label="Social links">
              <a
                className="footer-link footer-link-instagram"
                href={data.links.instagram.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="footer-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 7.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M17.7 6.3h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                {data.links.instagram.label}
              </a>

              <a
                className="footer-link footer-link-whatsapp"
                href={data.links.whatsapp.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="footer-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.2 8.8c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7 0 .2 0 .3-.1.4l-.4.5c-.1.1-.2.2-.1.4.2.4.8 1.2 1.6 1.8.8.6 1.5.8 1.9 1 .2.1.3 0 .4-.1l.5-.6c.1-.1.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.4 0 .2 0 1.1-.6 1.6-.6.5-1.2.5-1.5.4-.3 0-1.2-.3-2.5-.9-1.5-.7-2.6-2-3-2.5-.4-.5-1.1-1.6-1.3-2.6-.2-1 .2-1.7.5-2.1Z"
                      fill="currentColor"
                      opacity="0.9"
                    />
                  </svg>
                </span>
                {data.links.whatsapp.label}
              </a>
            </div>
          </div>

          <div className="footer-map">
            <p className="footer-section-title">{data.map.title}</p>
            <p className="footer-address">{data.map.locationLabel}</p>
            <div className="footer-mapFrame" aria-label="Map">
              <iframe
                title={data.map.iframeTitle}
                src={data.map.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a className="footer-mapLink" href={data.map.linkUrl} target="_blank" rel="noreferrer">
              {data.map.linkLabel} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} {data.brand.name}. {data.legal.rightsText}
          </p>
        </div>
      </div>
    </footer>
  );
}

