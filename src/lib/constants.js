/**
 * The API URL is set in the .env file. Use this everywhere you need to make an API call.
 * @example const response = await fetch(`${API_URL}/social/posts`);
 * @link https://docs.noroff.dev/social-endpoints/posts
 */
export const API_URL =
  import.meta.env.VITE_API_URL || "https://api.noroff.dev/api/v1/social";

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Create", href: "/create" },
  { label: "Sign out", href: "/signout" },
];
