import TopNav from "../sections/TopNav";
import { navItems } from "../content/homeContent";
import WhatsAppFab from "../components/WhatsAppFab";

export default function AboutPage() {
  return (
    <main className="about-page" aria-label="About me page">
      <TopNav navItems={navItems} />

      <section className="about-hero" aria-label="About me content">
        <div className="about-hero-inner">
          <div className="about-hero-copy">
            <h1 className="about-title">
              Hi, I’m Sumana Pal Roy:
              <br />
              <span className="about-title-accent">Dietitian &amp; Nutritionist</span>
            </h1>

            <p className="about-lead">
              It is a long established fact that a reader will be distracted by the readable content of a
              page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
              making it look like readable English.
            </p>
          </div>

          <div className="about-hero-media">
            <img className="about-hero-img" src="/hero-image.png" alt="Sumana Pal Roy" loading="lazy" />
          </div>

          <div className="about-split">
            <div className="about-split-block">
              <h2 className="about-split-title">
                Awards <span className="about-split-accent">&amp; Recognition</span>
              </h2>
              <p className="about-split-text">
                It is a long established fact that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                here', making it look like readable English.
              </p>
            </div>

            <div className="about-split-block">
              <h2 className="about-split-title">
                Education <span className="about-split-accent">&amp; Training</span>
              </h2>
              <p className="about-split-text">
                It is a long established fact that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                here', making it look like readable English.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFab message="Hi! I want to enquire about your nutrition plans." />
    </main>
  );
}

