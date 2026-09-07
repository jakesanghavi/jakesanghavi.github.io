import { Link, useParams } from 'react-router-dom';
import { blogMeta, getPostBySlug, getPublishedPosts } from '../content';
import { usePageTitle } from '../hooks/usePageTitle';

export default function BlogPage() {
  const posts = getPublishedPosts();
  usePageTitle('Blog');

  return (
    <div className="page-hero">
      <div className="wrap">
        <p className="section-kicker">{blogMeta.kicker}</p>
        <h1 className="section-title">{blogMeta.headline}</h1>
      </div>
      <div className="wrap" style={{ paddingBottom: '5rem' }}>
        {posts.length === 0 ? (
          <div className="panel empty-state">
            <h2 className="section-title" style={{ fontSize: '2rem' }}>
              {blogMeta.emptyTitle}
            </h2>
            <p className="lede" style={{ marginInline: 'auto' }}>
              {blogMeta.emptyBody}
            </p>
            <p className="meta">Add an object to the `posts` array in src/content/blog.js.</p>
          </div>
        ) : (
          <div className="job-list">
            {posts.map((post) => (
              <article key={post.slug} className="panel contact-card">
                <p className="meta">{post.date}</p>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="prose-copy">{post.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  usePageTitle(post?.title || 'Post');

  if (!post) {
    return (
      <div className="page-hero">
        <div className="wrap empty-state">
          <h1 className="section-title">Not found</h1>
          <p className="lede">Lorem ipsum dolor sit amet — this post is not in orbit.</p>
          <Link className="btn btn--ghost" to="/blog">
            Back to notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="page-hero">
      <div className="wrap" style={{ maxWidth: 760, paddingBottom: '5rem' }}>
        <p className="meta">{post.date}</p>
        <h1 className="section-title">{post.title}</h1>
        {(post.content || []).map((paragraph) => (
          <p key={paragraph.slice(0, 20)} className="prose-copy">
            {paragraph}
          </p>
        ))}
        <Link className="btn btn--ghost" to="/blog">
          All notes
        </Link>
      </div>
    </article>
  );
}
