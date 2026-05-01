import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { blogSection, footerSection, navItems } from "../content/homeContent";
import Footer from "../sections/Footer";
import TopNav from "../sections/TopNav";
import WhatsAppFab from "../components/WhatsAppFab";

export default function BlogPostPage() {
  const { slug } = useParams();

  const post = useMemo(() => {
    const list = blogSection.cards ?? [];
    return list.find((c) => c.slug === slug) ?? null;
  }, [slug]);

  if (!post) {
    return (
      <main className="blogpost-page" aria-label="Blog post page">
        <TopNav navItems={navItems} />
        <section className="blogpost">
          <div className="blogpost-inner">
            <h1 className="blogpost-title">Blog not found</h1>
            <p className="blogpost-sub">The blog you’re looking for doesn’t exist yet.</p>
          </div>
        </section>
        <Footer data={footerSection} />
        <WhatsAppFab message="Hi! I want to enquire about your nutrition plans." />
      </main>
    );
  }

  return (
    <main className="blogpost-page" aria-label="Blog post page">
      <TopNav navItems={navItems} />

      <section className="blogpost" aria-label="Blog post">
        <div className="blogpost-inner">
          <div className="blogpost-hero">
            <img className="blogpost-hero-img" src={post.imageUrl} alt={post.imageAlt} loading="lazy" />
            <span className="blogpost-chip">{post.category ?? "All"}</span>
          </div>

          <h1 className="blogpost-title">{post.title}</h1>
          <p className="blogpost-sub">{post.subheading}</p>

          <div className="blogpost-meta" aria-label="Blog details">
            <span>{post.date}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="blogpost-body">
            <p>
              This is the detailed blog page layout. We’ll add the full blog content here (paragraphs, tips,
              and examples) once the blog copy is ready.
            </p>
            <p>
              If you want, share the exact blog text and I’ll paste it in the same format used on this page.
            </p>
          </div>
        </div>
      </section>

      <Footer data={footerSection} />
      <WhatsAppFab message="Hi! I want to enquire about your nutrition plans." />
    </main>
  );
}

