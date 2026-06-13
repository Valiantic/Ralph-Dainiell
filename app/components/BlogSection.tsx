'use client';

import Image from 'next/image';
import { BlogPost } from '../types/portfolio';

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-card { border-radius: 28px; border: 2px solid #111827; background-color: #fff; padding: clamp(20px, 3vw, 28px); display: flex; flex-direction: column; gap: 10px; width: 100%; height: 100%; box-sizing: border-box; transition: box-shadow 0.2s ease, transform 0.2s ease; cursor: default; }
        .blog-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.12); transform: translateY(-2px); }
        .blog-title { font-size: 22px; font-weight: 700; color: #000000; margin: 0; }
        .blog-icon { width: 24px; height: 24px; object-fit: contain; }
        .blog-desc { font-size: 16px; color: #000000; line-height: 1.6; margin: 0; font-weight: 400; }
        .blog-post-item { border: 1.5px solid #e5e5e5; border-radius: 14px; padding: 14px 16px; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .blog-post-item:hover { border-color: #111; background: #f9f9f9; }
        .blog-post-title { font-size: clamp(12px, 1.4vw, 14px); font-weight: 600; margin: 0 0 4px 0; color: #111; line-height: 1.4; }
        .blog-post-desc { font-size: clamp(11px, 1.2vw, 12px); color: #666; margin: 0 0 6px 0; line-height: 1.5; }
        .blog-post-meta { font-size: 11px; color: #999; font-weight: 500; }
        @media (min-width: 768px) { .blog-title { font-size: 16px; } .blog-icon { width: 18px; height: 18px; } }
        @media (min-width: 1280px) { .blog-title { font-size: 17px; } .blog-icon { width: 20px; height: 20px; } }
      ` }} />

      <div className="blog-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image
            src="/Images/Icons/bookicon.png"
            alt="Blog"
            width={20}
            height={20}
            className="blog-icon"
            style={{ objectFit: 'contain' }}
          />
          <h2 className="blog-title">Blog</h2>
        </div>

        {posts.length === 0 ? (
          <p className="blog-desc">
            Every project I build is a step toward becoming a better developer.
            This blog is where I share my experiences, lessons learned, and
            insights from studying iOS development, software design, and
            technology.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {posts.map((post) => (
              <div
                key={post.id}
                className="blog-post-item"
                onClick={() => window.open(post.url, '_blank')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <p className="blog-post-title">{post.title}</p>
                    <p className="blog-post-desc">{post.description}</p>
                    <span className="blog-post-meta">{post.date} · {post.readTime}</span>
                  </div>
                  <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '2px', color: '#111' }}>↗</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}