import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { footerSection, navItems } from "../content/homeContent";
import Footer from "../sections/Footer";
import TopNav from "../sections/TopNav";
import WhatsAppFab from "../components/WhatsAppFab";

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      try {
        let postData = null;
        
        // 1. Try to fetch by document ID
        const docRef = doc(db, "blogs", slug);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          postData = docSnap.data();
        } else {
          // 2. If not found by ID, try querying by slug field
          const q = query(collection(db, "blogs"), where("slug", "==", slug));
          const querySnap = await getDocs(q);
          if (!querySnap.empty) {
            postData = querySnap.docs[0].data();
          }
        }

        if (postData) {
          setPost({
            title: postData.headline,
            subheading: postData.description,
            date: postData.date ? new Date(postData.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "",
            readTime: postData.readTime ? `${postData.readTime} Read` : "5 Min Read",
            category: postData.category || "General",
            imageAlt: postData.headline,
            imageUrl: postData.image || "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=900&q=80",
            content: postData.content || "This is the detailed blog page layout. We’ll add the full blog content here once the blog copy is ready."
          });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="blogpost-page" aria-label="Blog post page">
        <TopNav navItems={navItems} />
        <section className="blogpost">
          <div className="blogpost-inner" style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2>Loading blog...</h2>
          </div>
        </section>
        <Footer data={footerSection} />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="blogpost-page" aria-label="Blog post page">
        <TopNav navItems={navItems} />
        <section className="blogpost">
          <div className="blogpost-inner" style={{ textAlign: 'center', padding: '100px 0' }}>
            <h1 className="blogpost-title">Blog not found</h1>
            <p className="blogpost-sub">The blog you’re looking for doesn’t exist yet.</p>
            <button 
              onClick={() => navigate('/blogs')}
              style={{ marginTop: '20px', padding: '10px 20px', background: '#09558b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Back to all blogs
            </button>
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
            <span className="blogpost-chip">{post.category}</span>
          </div>

          <h1 className="blogpost-title">{post.title}</h1>
          <p className="blogpost-sub">{post.subheading}</p>

          <div className="blogpost-meta" aria-label="Blog details">
            <span>{post.date}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="blogpost-body">
            <p>{post.content}</p>
          </div>
        </div>
      </section>

      <Footer data={footerSection} />
      <WhatsAppFab message="Hi! I want to enquire about your nutrition plans." />
    </main>
  );
}

