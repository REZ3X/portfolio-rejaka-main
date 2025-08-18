import { getAllPosts, getAllCategories } from "@/data/BlogData";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const buildDate = new Date().toUTCString();
  const siteUrl = "https://rejaka.id";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Rejaka Abimanyu Susanto - Tech Blog &amp; Tutorials</title>
    <description>Technical articles, tutorials, and insights on modern web development, programming, and technology by Rejaka Abimanyu Susanto - Award-winning full-stack developer from Yogyakarta, Indonesia. Covering Next.js, React, TypeScript, Node.js, and more.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <managingEditor>abim@rejaka.id (Rejaka Abimanyu Susanto)</managingEditor>
    <webMaster>abim@rejaka.id (Rejaka Abimanyu Susanto)</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <generator>Next.js - Rejaka Portfolio</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>1440</ttl>
    <image>
      <url>${siteUrl}/assets/images/profile/rez3x.webp</url>
      <title>Rejaka Abimanyu Susanto - Tech Blog</title>
      <link>${siteUrl}</link>
      <description>Avatar of Rejaka Abimanyu Susanto</description>
      <width>800</width>
      <height>600</height>
    </image>
    <copyright>© ${new Date().getFullYear()} Rejaka Abimanyu Susanto. All rights reserved.</copyright>
    
    <!-- Categories -->
    ${categories
      .map((category) => `<category>${category}</category>`)
      .join("\n    ")}
    
    <!-- Blog Posts -->
    ${posts
      .slice(0, 20)
      .map((post) => {
        const postUrl = `${siteUrl}/blog/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();
        const modifiedDate = post.lastModified
          ? new Date(post.lastModified).toUTCString()
          : pubDate;
        const coverImageUrl = post.coverImage
          ? `${siteUrl}${post.coverImage}`
          : `${siteUrl}/assets/images/profile/rez3x.webp`;

        const cleanExcerpt = post.excerpt
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

        const enhancedDescription = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          ${
            post.coverImage
              ? `<img src="${coverImageUrl}" alt="${post.title}" style="max-width: 100%; height: auto; margin-bottom: 16px; border-radius: 8px;" />`
              : ""
          }
          
          <p style="font-size: 16px; margin-bottom: 16px;">${cleanExcerpt}</p>
          
          <div style="background: #f5f5f5; padding: 12px; border-radius: 6px; margin: 16px 0;">
            <strong>📖 Reading Time:</strong> ${post.readingTime} minutes<br/>
            <strong>📂 Category:</strong> ${post.category || "Technology"}<br/>
            <strong>🏷️ Tags:</strong> ${(post.tags || []).join(", ")}<br/>
            <strong>📅 Published:</strong> ${new Date(
              post.date
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}<br/>
            ${
              post.lastModified
                ? `<strong>🔄 Last Updated:</strong> ${new Date(
                    post.lastModified
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}<br/>`
                : ""
            }
          </div>
          
          <p style="margin-top: 16px;">
            <a href="${postUrl}" style="background: #007cba; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Read Full Tutorial →
            </a>
          </p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
          
          <p style="font-size: 14px; color: #666;">
            <strong>About the Author:</strong> Rejaka Abimanyu Susanto is an award-winning full-stack web developer and database engineer from Yogyakarta, Indonesia. Winner of the National Digital Hero Competition 2024 and leader of the Slaviors development team. Specializing in Next.js, React, TypeScript, and MongoDB.
          </p>
          
          <p style="font-size: 14px; color: #666;">
            <a href="${siteUrl}/?modal=blogList" style="color: #007cba;">Browse all articles</a> | 
            <a href="${siteUrl}/?modal=blogList&category=${encodeURIComponent(
          post.category || "Technology"
        )}" style="color: #007cba;">More ${
          post.category || "Technology"
        } articles</a> | 
            <a href="${siteUrl}" style="color: #007cba;">Visit Portfolio</a>
          </p>
        </div>
      `;

        return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${cleanExcerpt}]]></description>
      <content:encoded><![CDATA[${enhancedDescription}]]></content:encoded>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:date>${new Date(post.date).toISOString()}</dc:date>
      <dc:creator><![CDATA[Rejaka Abimanyu Susanto]]></dc:creator>
      <author>abim@rejaka.id (Rejaka Abimanyu Susanto)</author>
      <category domain="${siteUrl}/?modal=blogList&category=${encodeURIComponent(
          post.category || "Technology"
        )}">${post.category || "Technology"}</category>
      ${(post.tags || [])
        .map(
          (tag) =>
            `<category domain="${siteUrl}/?modal=blogList&search=${encodeURIComponent(
              tag
            )}">${tag}</category>`
        )
        .join("\n      ")}
      
      <!-- Enhanced metadata -->
      <dc:subject>${(post.tags || []).join(", ")}</dc:subject>
      <dc:language>en-US</dc:language>
      <dc:rights>© ${new Date(
        post.date
      ).getFullYear()} Rejaka Abimanyu Susanto</dc:rights>
      <dc:publisher>Rejaka Abimanyu Susanto</dc:dc:publisher>
      <dc:source>${siteUrl}</dc:source>
      <dc:type>Text</dc:type>
      <dc:format>text/html</dc:format>
      
      <!-- Media content -->
      ${
        post.coverImage
          ? `<media:content url="${coverImageUrl}" type="image/webp" medium="image">
        <media:title type="plain">${post.title} - Cover Image</media:title>
        <media:description type="plain">Cover image for the article: ${post.title}</media:description>
        <media:thumbnail url="${coverImageUrl}" width="800" height="600"/>
        <media:credit role="author">Rejaka Abimanyu Susanto</media:credit>
      </media:content>
      <enclosure url="${coverImageUrl}" type="image/webp" length="0"/>`
          : ""
      }
      
      <!-- Custom elements -->
      <readingTime>${post.readingTime}</readingTime>
      <articleType>blog-post</articleType>
      <educationalLevel>beginner-to-intermediate</educationalLevel>
      <targetAudience>developers, programmers, students</targetAudience>
      <lastModified>${modifiedDate}</lastModified>
      <wordCount>${post.readingTime * 250}</wordCount>
      <difficulty>${
        post.category === "Tutorial" ? "beginner" : "intermediate"
      }</difficulty>
      <techStack>${(post.tags || [])
        .filter((tag) =>
          [
            "Next.js",
            "React",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "MongoDB",
            "PHP",
            "Laravel",
            "SQL",
            "Linux",
            "Windows",
          ].includes(tag)
        )
        .join(", ")}</techStack>
    </item>`;
      })
      .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}

export const revalidate = 3600;
