export const handleOAuthRedirect = (
  provider: "google" | "github" | "discord"
) => {
  if (typeof window !== "undefined") {
    const currentUrl = encodeURIComponent(window.location.href);

    window.location.href = `/api/auth/${provider}?redirect=${currentUrl}`;
  }
};

export const isValidRedirectUrl = (
  url: string,
  allowedOrigins: string[] = []
): boolean => {
  try {
    const parsed = new URL(url);
    const isLocalhost =
      parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
    const isAllowedOrigin = allowedOrigins.includes(parsed.origin);
    const isCurrentOrigin =
      typeof window !== "undefined" && parsed.origin === window.location.origin;

    return isLocalhost || isAllowedOrigin || isCurrentOrigin;
  } catch {
    return false;
  }
};
