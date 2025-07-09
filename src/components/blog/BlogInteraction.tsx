"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import ShareButton from "@/components/blog/ShareButton";
interface Comment {
  _id: string;
  userId: string;
  username: string;
  avatar: string;
  provider: "google" | "github" | "discord";
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogInteractionProps {
  slug: string;
  title?: string;
  description?: string;
}

interface AuthUser {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  provider: "google" | "github" | "discord";
}

export default function BlogInteraction({
  slug,
  title,
  description,
}: BlogInteractionProps) {
  const { themeStyle } = useUser();

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = () => {
      if (typeof window !== "undefined") {
        const userCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("guestbook_user="));

        if (userCookie) {
          try {
            const userData = JSON.parse(
              decodeURIComponent(userCookie.split("=")[1])
            );
            console.log("BlogInteraction: Found user in cookie:", userData);
            setAuthUser(userData);
          } catch (error) {
            console.error("BlogInteraction: Error parsing user cookie:", error);
            setAuthUser(null);
          }
        } else {
          setAuthUser(null);
        }
      }
    };

    loadUser();

    const interval = setInterval(loadUser, 2000);
    window.addEventListener("focus", loadUser);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", loadUser);
    };
  }, []);

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [slug]);

  const logout = () => {
    if (typeof window !== "undefined") {
      document.cookie =
        "guestbook_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setAuthUser(null);
      window.location.reload();
    }
  };

  const handleAuthRedirect = (provider: "google" | "github" | "discord") => {
    if (typeof window !== "undefined") {
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = `/api/auth/${provider}?redirect=${currentUrl}`;
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await fetch(`/api/blog/${slug}/like`);
      const data = await response.json();
      setLikes(data.likeCount);
      setUserLiked(data.userLiked);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/blog/${slug}/comment`);
      const data = await response.json();

      console.log("Fetched comments data:", data);
      console.log("Comments array:", data.comments);

      data.comments.forEach((comment: Comment, index: number) => {
        console.log(`Frontend Comment ${index}:`, {
          username: comment.username,
          avatar: comment.avatar,
          hasAvatar: !!comment.avatar,
          avatarUrl: comment.avatar,
        });
      });

      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async () => {
    if (!authUser) {
      alert("Please sign in to like this post");
      return;
    }

    try {
      const method = userLiked ? "DELETE" : "POST";
      const response = await fetch(`/api/blog/${slug}/like`, { method });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likeCount);
        setUserLiked(!userLiked);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) {
      alert("Please sign in to comment");
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/blog/${slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newComment }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments([data.comment, ...comments]);
        setNewComment("");
      } else {
        setError(data.error);
      }
    } catch {
      setError("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editText.trim()) return;

    try {
      const response = await fetch(`/api/blog/${slug}/comment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: editText, commentId }),
      });

      if (response.ok) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  message: editText,
                  updatedAt: new Date().toISOString(),
                }
              : comment
          )
        );
        setEditingComment(null);
        setEditText("");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch {
      setError("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const response = await fetch(
        `/api/blog/${slug}/comment?commentId=${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return "🔍";
      case "github":
        return "🐱";
      case "discord":
        return "🎮";
      default:
        return "👤";
    }
  };

  if (themeStyle === "terminal") {
    return (
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-[#393d46] pt-8 mt-8">
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 border transition-colors w-full sm:w-auto justify-center sm:justify-start ${
                  userLiked
                    ? "border-[#00adb4] text-[#00adb4] bg-[#0a202c]"
                    : "border-[#393d46] text-[#8b9cbe] hover:border-[#00adb4] hover:text-[#00adb4]"
                }`}
              >
                <span>{userLiked ? "♥" : "♡"}</span>
                <span>
                  {likes} {likes === 1 ? "like" : "likes"}
                </span>
              </button>

              <ShareButton
                slug={slug}
                title={title || "Blog Post"}
                description={
                  description ||
                  `Read this blog post by Rejaka Abimanyu Susanto`
                }
              />
            </div>

            {!authUser ? (
              <div className="mb-8 p-4 border border-[#393d46] bg-[#0a1017]">
                <p className="text-[#8b9cbe] mb-3 text-center sm:text-left">
                  Sign in to like and comment on this post:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleAuthRedirect("google")}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#4285f4] text-white text-sm hover:bg-[#3367d6] transition-colors flex-1 sm:flex-none"
                  >
                    <span>🔍</span>
                    <span>Google</span>
                  </button>
                  <button
                    onClick={() => handleAuthRedirect("github")}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#333] text-white text-sm hover:bg-[#24292e] transition-colors flex-1 sm:flex-none"
                  >
                    <span>🐱</span>
                    <span>GitHub</span>
                  </button>
                  <button
                    onClick={() => handleAuthRedirect("discord")}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#7289da] text-white text-sm hover:bg-[#5b6eae] transition-colors flex-1 sm:flex-none"
                  >
                    <span>🎮</span>
                    <span>Discord</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={authUser.avatar}
                      alt={authUser.username}
                      className="w-8 h-8 rounded border border-[#393d46]"
                    />
                    <span className="text-[#00adb4] text-sm sm:text-base">
                      {getProviderIcon(authUser.provider)} {authUser.username}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-3 py-1 text-xs border border-[#393d46] text-[#8b9cbe] hover:border-[#00adb4] hover:text-[#00adb4] transition-colors self-start sm:self-auto"
                  >
                    Logout
                  </button>
                </div>

                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts on this post..."
                    className="w-full p-3 bg-[#0a1017] border border-[#393d46] text-[#e0e0e0] placeholder-[#8b9cbe] resize-none focus:border-[#00adb4] focus:outline-none text-sm"
                    rows={4}
                    maxLength={500}
                    disabled={isSubmitting}
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                    <span className="text-xs text-[#8b9cbe]">
                      {newComment.length}/500 characters
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting || !newComment.trim()}
                      className="px-4 py-2 bg-[#00adb4] text-[#060a10] hover:bg-[#00969e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      {isSubmitting ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div>
              <h3 className="text-[#00adb4] font-bold mb-4 text-lg">
                Comments ({comments.length})
              </h3>
              {comments.length === 0 ? (
                <p className="text-[#8b9cbe] text-center py-8 text-sm">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="p-4 border border-[#393d46] bg-[#0a1017]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={comment.avatar}
                            alt={comment.username}
                            className="w-8 h-8 rounded border border-[#393d46]"
                          />
                          <div>
                            <span className="text-[#00adb4] font-medium text-sm">
                              {getProviderIcon(comment.provider)}{" "}
                              {comment.username}
                            </span>
                            <div className="text-xs text-[#8b9cbe]">
                              {formatDate(comment.createdAt)}
                              {comment.updatedAt !== comment.createdAt &&
                                " (edited)"}
                            </div>
                          </div>
                        </div>
                        {authUser && authUser.userId === comment.userId && (
                          <div className="flex space-x-2 self-start sm:self-auto">
                            <button
                              onClick={() => {
                                setEditingComment(comment._id);
                                setEditText(comment.message);
                              }}
                              className="text-xs text-[#8b9cbe] hover:text-[#00adb4] transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="text-xs text-[#8b9cbe] hover:text-red-400 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>

                      {editingComment === comment._id ? (
                        <div>
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full p-2 bg-[#060a10] border border-[#393d46] text-[#e0e0e0] resize-none text-sm"
                            rows={3}
                            maxLength={500}
                          />
                          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
                            <button
                              onClick={() => {
                                setEditingComment(null);
                                setEditText("");
                              }}
                              className="px-3 py-1 text-xs border border-[#393d46] text-[#8b9cbe] hover:border-[#00adb4] hover:text-[#00adb4] transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleEditComment(comment._id)}
                              className="px-3 py-1 text-xs bg-[#00adb4] text-[#060a10] hover:bg-[#00969e] transition-colors"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[#e0e0e0] whitespace-pre-wrap text-sm leading-relaxed">
                          {comment.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t theme-border pt-8 mt-8">
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all transform hover:scale-105 w-full sm:w-auto justify-center sm:justify-start ${
                userLiked
                  ? "bg-gradient-to-r from-[#e6a2ce] to-[#c678a4] text-white shadow-lg"
                  : "border-2 theme-border theme-text-secondary hover:theme-accent-primary hover:shadow-md"
              }`}
            >
              <span className="text-lg">{userLiked ? "💖" : "🤍"}</span>
              <span className="font-medium">
                {likes} {likes === 1 ? "like" : "likes"}
              </span>
            </button>

            <ShareButton
              slug={slug}
              title={title || "Blog Post"}
              description={
                description || `Read this blog post by Rejaka Abimanyu Susanto`
              }
            />
          </div>

          {!authUser ? (
            <div className="mb-8 p-6 rounded-xl theme-bg-secondary theme-border border">
              <h3 className="theme-text-primary font-medium mb-3 text-center sm:text-left">
                Join the conversation
              </h3>
              <p className="theme-text-secondary mb-4 text-center sm:text-left text-sm">
                Sign in to like and comment on this post
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleAuthRedirect("google")}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6] transition-colors flex-1 sm:flex-none"
                >
                  <span>🔍</span>
                  <span>Google</span>
                </button>
                <button
                  onClick={() => handleAuthRedirect("github")}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#333] text-white rounded-lg hover:bg-[#24292e] transition-colors flex-1 sm:flex-none"
                >
                  <span>🐱</span>
                  <span>GitHub</span>
                </button>
                <button
                  onClick={() => handleAuthRedirect("discord")}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#7289da] text-white rounded-lg hover:bg-[#5b6eae] transition-colors flex-1 sm:flex-none"
                >
                  <span>🎮</span>
                  <span>Discord</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={authUser.avatar}
                    alt={authUser.username}
                    className="w-10 h-10 rounded-full border-2 theme-border"
                  />
                  <div>
                    <span className="theme-accent-primary font-medium">
                      {getProviderIcon(authUser.provider)} {authUser.username}
                    </span>
                    <div className="text-sm theme-text-secondary">
                      Signed in
                    </div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm rounded-lg border theme-border theme-text-secondary hover:theme-text-primary hover:shadow-md transition-all self-start sm:self-auto"
                >
                  Sign Out
                </button>
              </div>

              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="rounded-xl theme-bg-secondary border theme-border overflow-hidden">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts on this post..."
                    className="w-full p-4 bg-transparent theme-text-primary placeholder-opacity-60 resize-none focus:outline-none text-sm"
                    rows={4}
                    maxLength={500}
                    disabled={isSubmitting}
                  />
                  {error && (
                    <div className="px-4 pb-2">
                      <p className="text-red-500 text-sm">{error}</p>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 border-t theme-border bg-opacity-50 gap-2">
                    <span className="text-sm theme-text-secondary">
                      {newComment.length}/500 characters
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting || !newComment.trim()}
                      className="px-6 py-2 bg-gradient-to-r from-[#e6a2ce] to-[#c678a4] text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 text-sm"
                    >
                      {isSubmitting ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div>
            <h3 className="theme-text-primary text-xl font-semibold mb-6">
              Comments ({comments.length})
            </h3>
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">💭</div>
                <p className="theme-text-secondary text-sm">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="p-6 rounded-xl theme-bg-secondary border theme-border"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={comment.avatar}
                          alt={comment.username}
                          className="w-10 h-10 rounded-full border-2 theme-border"
                        />
                        <div>
                          <span className="theme-accent-primary font-medium text-sm">
                            {getProviderIcon(comment.provider)}{" "}
                            {comment.username}
                          </span>
                          <div className="text-sm theme-text-secondary">
                            {formatDate(comment.createdAt)}
                            {comment.updatedAt !== comment.createdAt && (
                              <span className="ml-2 italic">(edited)</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {authUser && authUser.userId === comment.userId && (
                        <div className="flex space-x-3 self-start sm:self-auto">
                          <button
                            onClick={() => {
                              setEditingComment(comment._id);
                              setEditText(comment.message);
                            }}
                            className="text-sm theme-text-secondary hover:theme-accent-primary transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-sm theme-text-secondary hover:text-red-500 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    {editingComment === comment._id ? (
                      <div>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full p-3 rounded-lg theme-bg-primary border theme-border theme-text-primary resize-none focus:outline-none focus:ring-2 focus:ring-[#e6a2ce] focus:ring-opacity-50 text-sm"
                          rows={3}
                          maxLength={500}
                        />
                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-3">
                          <button
                            onClick={() => {
                              setEditingComment(null);
                              setEditText("");
                            }}
                            className="px-4 py-2 text-sm border theme-border theme-text-secondary hover:theme-text-primary rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            className="px-4 py-2 text-sm bg-gradient-to-r from-[#e6a2ce] to-[#c678a4] text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="theme-text-primary whitespace-pre-wrap leading-relaxed text-sm">
                        {comment.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
