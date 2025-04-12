"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostBySlug, formatDate } from "@/data/BlogData";
import { marked } from "marked";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

declare global {
  interface Window {
    Prism: {
      highlightAll: () => void;
    };
  }
}

interface Heading {
  id: string;
  text: string;
  level: string;
}

marked.setOptions({
  breaks: true,
  gfm: true,
  pedantic: false,
});

marked.use({
  renderer: {
    code(token) {
      const language = token.lang || "plaintext";
      return `<pre><code class="language-${language}">${token.text}</code></pre>`;
    },
  },
});

export default function BlogPost() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { themeStyle } = useUser();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState("");

  const post = getPostBySlug(slug);

  useEffect(() => {
    const forceTableOfContentsToWork = () => {
      console.log("⚠️ Force-fixing Table of Contents highlighting");

      const articleElement = document.querySelector(".blog-content");
      if (!articleElement) {
        console.log("Blog content not found, will retry");
        setTimeout(forceTableOfContentsToWork, 500);
        return;
      }

      const domHeadings = articleElement.querySelectorAll("h2, h3");
      if (domHeadings.length === 0) {
        console.log("No headings found in DOM, will retry");
        setTimeout(forceTableOfContentsToWork, 500);
        return;
      }

      console.log(`Found ${domHeadings.length} headings in DOM`);

      domHeadings.forEach((heading, index) => {
        const text = heading.textContent || "";
        const id = text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/--+/g, "-")
          .replace(/^-+|-+$/g, "");

        if (!heading.id) {
          heading.id = id || `heading-${index}`;
          console.log(
            `Added ID ${heading.id} to heading: ${text.substring(0, 20)}...`
          );
        }
      });

      const newHeadings: Heading[] = Array.from(domHeadings).map(
        (el, index) => ({
          id: el.id,
          text: el.textContent || `Heading ${index + 1}`,
          level: el.tagName.toLowerCase(),
        })
      );

      if (newHeadings.length > 0) {
        console.log("Updating headings state with DOM headings", newHeadings);
        setHeadings(newHeadings);
      }

      const handleScroll = () => {
        const scrollPosition = window.scrollY + 150;

        if (window.scrollY < 70) {
          if (document.querySelector("[data-active-heading='true']")) {
            document
              .querySelectorAll("[data-active-heading='true']")
              .forEach((el) => {
                el.setAttribute("data-active-heading", "false");
              });
            setActiveHeading("");
          }
          return;
        }

        for (let i = newHeadings.length - 1; i >= 0; i--) {
          const element = document.getElementById(newHeadings[i].id);
          if (element && (element as HTMLElement).offsetTop <= scrollPosition) {
            setActiveHeading(newHeadings[i].id);

            const sidebarItems = document.querySelectorAll(".toc-item");
            sidebarItems.forEach((item) => {
              if (item.getAttribute("data-heading-id") === newHeadings[i].id) {
                item.setAttribute("data-active-heading", "true");
              } else {
                item.setAttribute("data-active-heading", "false");
              }
            });

            break;
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      setTimeout(handleScroll, 100);
      const observer = new MutationObserver(() => {
        const articleElement = document.querySelector(".blog-content");
        if (articleElement) {
          const domHeadings = articleElement.querySelectorAll("h2, h3");
          domHeadings.forEach((heading) => {
            if (!heading.id) {
              const text = heading.textContent || "";
              const id = text
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/--+/g, "-")
                .replace(/^-+|-+$/g, "");
              heading.id = id;
            }
          });
        }
      });

      if (articleElement) {
        observer.observe(articleElement, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["id"],
        });
      }

      return () => {
        window.removeEventListener("scroll", handleScroll);
        observer.disconnect();
      };
    };

    setTimeout(forceTableOfContentsToWork, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem("lastVisitedBlogSlug", slug);
    localStorage.setItem("lastPagePosition", window.scrollY.toString());
  }, [slug]);

  useEffect(() => {
    if (!post) {
      router.push("/");
      return;
    }

    async function fetchMarkdown() {
      try {
        const response = await fetch(`/blog/posts/${slug}/index.md`);

        if (!response.ok) {
          throw new Error(`Failed to load blog post: ${response.status}`);
        }

        const markdown = await response.text();

        const processedMarkdown = markdown.replace(
          /!\[(.*?)\]\((.*?)\)/g,
          (match, alt, src) => {
            if (src.startsWith("http")) {
              return match;
            }
            return `![${alt}](/blog/posts/${slug}/${src})`;
          }
        );

        const markedContent = marked(processedMarkdown);
        if (markedContent instanceof Promise) {
          markedContent.then((result) => {
            setContent(result);

            setTimeout(() => extractHeadings(result), 100);
          });
        } else {
          setContent(markedContent);

          setTimeout(() => extractHeadings(markedContent), 100);
        }

        if (window.Prism) {
          setTimeout(() => {
            window.Prism.highlightAll();
          }, 0);
        }
      } catch (error) {
        console.error("Error loading blog content:", error);
      } finally {
        setIsLoading(false);
      }
    }

    const extractHeadings = (htmlContent: string) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      const headingsArray: Heading[] = [];
      const headingElements = tempDiv.querySelectorAll("h2, h3");

      const createCleanId = (text: string): string => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/--+/g, "-")
          .replace(/^-+|-+$/g, "");
      };

      headingElements.forEach((el) => {
        const text = el.textContent || "";
        const id = createCleanId(text);

        headingsArray.push({
          id,
          text,
          level: el.tagName.toLowerCase(),
        });
      });

      setTimeout(() => {
        console.log("Adding IDs to headings in DOM...");

        applyIdsToHeadings();

        setTimeout(() => applyIdsToHeadings(), 200);
        setTimeout(() => applyIdsToHeadings(), 500);
        setTimeout(() => applyIdsToHeadings(), 1000);

        console.log("Setting headings state:", headingsArray);
        setHeadings(headingsArray);
      }, 200);

      function applyIdsToHeadings() {
        const articleElement = document.querySelector(".blog-content");
        if (!articleElement) {
          console.log("Blog content element not found yet");
          return false;
        }

        const domHeadings = articleElement.querySelectorAll("h2, h3");
        console.log(
          `Found ${domHeadings.length} headings in DOM, ${headingsArray.length} in array`
        );

        if (domHeadings.length === 0) {
          return false;
        }

        domHeadings.forEach((domHeading, index) => {
          const domText = domHeading.textContent || "";

          let match = headingsArray.find((h) => h.text === domText);

          if (!match) {
            const cleanDomText = createCleanId(domText);
            match = headingsArray.find(
              (h) => createCleanId(h.text) === cleanDomText
            );
          }

          if (!match && index < headingsArray.length) {
            match = headingsArray[index];
          }

          if (match) {
            domHeading.setAttribute("id", match.id);
            console.log(
              `Added ID ${match.id} to heading: ${domText.substring(0, 20)}...`
            );
          }
        });

        return true;
      }
    };

    const prismTheme = document.createElement("link");
    prismTheme.rel = "stylesheet";
    prismTheme.href =
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
    document.head.appendChild(prismTheme);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js";
    script.async = true;

    const scriptAutoloader = document.createElement("script");
    scriptAutoloader.src =
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js";
    scriptAutoloader.async = true;

    document.body.appendChild(script);
    document.body.appendChild(scriptAutoloader);

    fetchMarkdown();

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(scriptAutoloader);
      document.head.removeChild(prismTheme);
    };
  }, [post, slug, router]);

  useEffect(() => {
    if (headings.length === 0) return;

    console.log("Setting up scroll tracking for", headings.length, "headings");

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      if (window.scrollY < 70) {
        setActiveHeading("");
        return;
      }

      let found = false;

      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);

        if (!element) continue;

        const top = (element as HTMLElement).offsetTop;

        if (top <= scrollPosition) {
          if (activeHeading !== headings[i].id) {
            console.log(`Active heading: ${headings[i].text}`);
            setActiveHeading(headings[i].id);
          }
          found = true;
          break;
        }
      }

      if (!found && window.scrollY > 150 && headings.length > 0) {
        setActiveHeading(headings[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 500);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);
  const scrollToHeading = (id: string) => {
    console.log(`Attempting to scroll to heading with ID: ${id}`);

    let element = document.getElementById(id);

    if (element) {
      console.log(
        `Found element with ID ${id}, scrolling to offset: ${
          (element as HTMLElement).offsetTop - 80
        }`
      );
      window.scrollTo({
        top: (element as HTMLElement).offsetTop - 80,
        behavior: "smooth",
      });
      return;
    }

    setTimeout(() => {
      element = document.getElementById(id);

      if (element) {
        console.log(
          `Found element after delay with ID ${id}, scrolling to offset: ${
            element.offsetTop - 80
          }`
        );
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
        return;
      }

      console.log(
        `Element with ID "${id}" not found, trying fallback methods...`
      );

      const blogContent = document.querySelector(".blog-content");
      if (blogContent) {
        const headingInContent = blogContent.querySelector(`#${id}`);
        if (headingInContent) {
          console.log(`Found heading in blog content with ID ${id}`);
          window.scrollTo({
            top: (headingInContent as HTMLElement).offsetTop - 80,
            behavior: "smooth",
          });
          return;
        }
      }

      const heading = headings.find((h) => h.id === id);
      if (heading) {
        console.log(`Looking for heading with text: "${heading.text}"`);

        const allHeadingElements = document.querySelectorAll(
          ".blog-content h2, .blog-content h3"
        );
        const matchingElement = Array.from(allHeadingElements).find(
          (el) => el.textContent === heading.text
        );

        if (matchingElement) {
          console.log(`Found element by text content match`);
          window.scrollTo({
            top: (matchingElement as HTMLElement).offsetTop - 80,
            behavior: "smooth",
          });
          return;
        }
      }

      const allHeadings = document.querySelectorAll(
        ".blog-content h2, .blog-content h3"
      );
      console.log(
        "Available headings:",
        Array.from(allHeadings).map((el) => ({
          id: el.id || "(no id)",
          text: el.textContent?.substring(0, 20) + "...",
        }))
      );
    }, 50);
  };

  const handleBackToPortfolio = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    localStorage.setItem("returnFromBlog", "true");

    const referrerSource = localStorage.getItem("blogReferrerSource") || "main";

    if (referrerSource === "blogList") {
      localStorage.setItem("reopenBlogList", "true");
    } else if (referrerSource === "main") {
      localStorage.setItem("scrollToBlogComponent", "true");
    }

    router.push("/");
  };

  if (!post) {
    return null;
  }

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          themeStyle === "soft" ? "bg-[#2e1e2e]" : "bg-[#060a10]"
        }`}
      >
        <div
          className={`${
            themeStyle === "soft"
              ? "h-16 w-16 border-t-4 border-b-4 border-[#e6a2ce] rounded-full animate-spin"
              : "h-12 w-12 border-t-2 border-b-2 border-[#00adb4] rounded-full animate-spin"
          }`}
        ></div>
      </div>
    );
  }

  if (themeStyle === "terminal") {
    return (
      <div className="font-mono bg-[#060a10] text-[#e0e0e0] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:flex-grow max-w-4xl">
              <div className="mb-6 border-b border-[#393d46] pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Link
                    href="/"
                    onClick={handleBackToPortfolio}
                    className="text-[#00adb4] hover:underline flex items-center"
                  >
                    <span className="mr-2">←</span>
                    <span>cd ~/portfolio</span>
                  </Link>
                  <div className="text-sm text-[#8b9cbe]">blog/{slug}</div>
                </div>

                <h1 className="text-2xl font-bold text-[#00adb4] mb-3">
                  {post.title}
                </h1>

                <div className="flex items-center text-sm text-[#8b9cbe] mb-2">
                  <span>By Rejaka Abimanyu Susanto</span>
                  <span className="mx-2">|</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="mx-2">|</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {post.coverImage && (
                <div className="mb-8 border border-[#393d46] p-1">
                  <div className="relative h-64 w-full">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              )}

              <article className="blog-content terminal-theme mb-12">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </article>

              <div className="mt-8 pt-4 border-t border-[#393d46]">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="mb-4 sm:mb-0">
                    <div className="mb-1 text-[#8b9cbe]">Written by:</div>
                    <div className="text-[#00adb4] font-bold">
                      Rejaka Abimanyu Susanto
                    </div>
                    <div className="text-xs text-[#8b9cbe]">
                      Full Stack Developer & Writer
                    </div>
                  </div>
                  <Link
                    href="/"
                    onClick={handleBackToPortfolio}
                    className="px-4 py-2 border border-[#00adb4] text-[#00adb4] hover:bg-[#0a202c] transition-colors"
                  >
                    Return to Terminal
                  </Link>
                </div>
              </div>
            </div>

            {headings.length > 0 && (
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-8 border border-[#393d46] bg-[#0a1017]">
                  <div className="p-3 border-b border-[#393d46] flex items-center">
                    <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
                    <h2 className="text-[#00adb4] font-bold text-sm">
                      Contents
                    </h2>
                  </div>
                  <div className="p-3">
                    <nav className="space-y-1">
                      {headings.map((heading) => (
                        <button
                          key={heading.id}
                          data-heading-id={heading.id}
                          data-active-heading={activeHeading === heading.id}
                          className={`toc-item block w-full text-left py-1.5 text-xs transition-colors ${
                            heading.level === "h3" ? "pl-6" : "pl-3"
                          } ${
                            activeHeading === heading.id
                              ? "text-[#00adb4] border-l-2 border-[#00adb4]"
                              : "text-[#8b9cbe] hover:text-[#e0e0e0] border-l-2 border-transparent"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log(
                              `Clicked heading: "${heading.text}" with ID: "${heading.id}"`
                            );
                            scrollToHeading(heading.id);
                          }}
                        >
                          {heading.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                  <div className="p-3 border-t border-[#393d46]">
                    <Link
                      href="/"
                      onClick={handleBackToPortfolio}
                      className="text-[#00adb4] hover:underline flex items-center text-xs"
                    >
                      <span className="mr-1.5">←</span>
                      <span>Back to portfolio</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="bg-[#0a1017] border-t border-[#393d46] py-4 mt-8">
          <div className="max-w-4xl mx-auto px-4 text-center text-xs text-[#8b9cbe]">
            <p>
              &copy; {new Date().getFullYear()} Rejaka Abimanyu Susanto | All
              articles are written by Rejaka Abimanyu Susanto
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="theme-font theme-bg-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-grow max-w-4xl">
            <div className="mb-8">
              <Link
                href="/"
                onClick={handleBackToPortfolio}
                className="inline-flex items-center theme-accent-primary hover:underline mb-8 transition-all duration-300 hover:translate-x-[-4px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Portfolio
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold theme-text-primary mb-4 soft-fade-in">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center theme-text-secondary mb-8 text-sm">
                <span>By Rejaka Abimanyu Susanto</span>
                <span className="mx-2">•</span>
                <time dateTime={post.date} className="theme-text-secondary">
                  {formatDate(post.date)}
                </time>
                <span className="mx-2">•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {post.coverImage && (
              <div className="mb-10 relative">
                <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg border theme-border">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 text-6xl opacity-20 z-0">
                  ✨
                </div>
              </div>
            )}

            <article className="blog-content soft-theme relative z-10">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>

            <div className="mt-16 pt-8 border-t theme-border">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-6 sm:mb-0 text-center sm:text-left">
                  <h3 className="theme-text-secondary text-sm mb-1">
                    Written by
                  </h3>
                  <p className="theme-accent-primary text-xl font-semibold mb-1">
                    Rejaka Abimanyu Susanto
                  </p>
                  <p className="theme-text-secondary text-sm">
                    Full Stack Developer & Technical Writer
                  </p>
                </div>
                <Link
                  href="/"
                  onClick={handleBackToPortfolio}
                  className="px-6 py-3 bg-gradient-to-r from-[#e6a2ce] to-[#c678a4] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Back to Portfolio
                </Link>
              </div>
            </div>
          </div>

          {headings.length > 0 && (
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-8 rounded-xl border theme-border theme-bg-primary shadow-md overflow-hidden">
                <div className="p-4 border-b theme-border">
                  <h2 className="theme-accent-primary font-medium">
                    In This Article
                  </h2>
                </div>
                <div className="p-4">
                  <nav className="space-y-2">
                    {headings.map((heading) => (
                      <button
                        key={heading.id}
                        data-heading-id={heading.id}
                        data-active-heading={activeHeading === heading.id}
                        className={`toc-item block w-full text-left px-3 py-1.5 rounded-md text-sm transition-all ${
                          heading.level === "h3" ? "ml-2 text-xs" : ""
                        } ${
                          activeHeading === heading.id
                            ? "theme-accent-primary font-medium bg-[#3a1f37]/20"
                            : "theme-text-secondary hover:theme-text-primary"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(
                            `Clicked heading: "${heading.text}" with ID: "${heading.id}"`
                          );
                          scrollToHeading(heading.id);
                        }}
                      >
                        {heading.text}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="p-4 border-t theme-border">
                  <Link
                    href="/"
                    onClick={handleBackToPortfolio}
                    className="theme-accent-primary hover:underline flex items-center text-sm group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 group-hover:-translate-x-1 transition-transform"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to portfolio
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-[#2a1e29] py-6 mt-16 border-t border-[#5d4a5c]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="theme-text-secondary text-sm">
            &copy; {new Date().getFullYear()} Rejaka Abimanyu Susanto | All
            Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
