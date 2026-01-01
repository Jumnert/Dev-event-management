import posthog from "posthog-js";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: true, // <-- automatically track pageviews
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}

export default posthog;
