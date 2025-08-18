import { getAllPosts } from '@/data/BlogData'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = getAllPosts()
  const siteUrl = 'https://rejaka.id'
  
  const jsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Rejaka Abimanyu Susanto - Tech Blog & Tutorials",
    description: "Technical articles, tutorials, and insights on modern web development, programming, and technology by Rejaka Abimanyu Susanto - Award-winning full-stack developer from Yogyakarta, Indonesia.",
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/api/feed`,
    icon: `${siteUrl}/assets/images/profile/rez3x.webp`,
    favicon: `${siteUrl}/favicon.ico`,
    language: "en-US",
    authors: [
      {
        name: "Rejaka Abimanyu Susanto",
        url: siteUrl,
        avatar: `${siteUrl}/assets/images/profile/rez3x.webp`
      }
    ],
    items: posts.slice(0, 20).map(post => ({
      id: `${siteUrl}/blog/${post.slug}`,
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      content_html: `
        <div>
          ${post.coverImage ? `<img src="${siteUrl}${post.coverImage}" alt="${post.title}" style="max-width: 100%; height: auto; margin-bottom: 16px;" />` : ''}
          <p>${post.excerpt}</p>
          <p><strong>Reading Time:</strong> ${post.readingTime} minutes</p>
          <p><strong>Category:</strong> ${post.category || 'Technology'}</p>
          <p><strong>Tags:</strong> ${(post.tags || []).join(', ')}</p>
          <p><a href="${siteUrl}/blog/${post.slug}">Read full tutorial →</a></p>
        </div>
      `,
      content_text: post.excerpt,
      summary: post.excerpt,
      image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/assets/images/profile/rez3x.webp`,
      banner_image: post.coverImage ? `${siteUrl}${post.coverImage}` : undefined,
      date_published: new Date(post.date).toISOString(),
      date_modified: post.lastModified ? new Date(post.lastModified).toISOString() : new Date(post.date).toISOString(),
      authors: [
        {
          name: "Rejaka Abimanyu Susanto",
          url: siteUrl,
          avatar: `${siteUrl}/assets/images/profile/rez3x.webp`
        }
      ],
      tags: post.tags || [],
      language: "en-US",
      _custom: {
        category: post.category || 'Technology',
        reading_time: post.readingTime,
        word_count: post.readingTime * 250,
        last_modified: post.lastModified,
        tech_stack: (post.tags || []).filter(tag => 
          ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'MongoDB'].includes(tag)
        )
      }
    }))
  }

  return NextResponse.json(jsonFeed, {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

export const revalidate = 3600