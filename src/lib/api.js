import { API_URL } from "./constants";

/**
 * Helper function to add the
 * @param {Object} options - HTTP header options
 * @returns {Object} - HTTP header options with Authorization header
 */
function updateOptions(options) {
  const update = { ...options };

  if (localStorage.getItem("jwt")) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
  }

  return update;
}

/**
 * Wrapper around fetch to add Authorization header
 * @returns {Promise} - fetch promise
 */
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}

/**
 * Fetch all posts with comments, reactions and the author
 * @returns {Object | Error} - A list of posts
 */
export async function fetchAllPosts() {
  const url = new URL(`${API_URL}/posts`);

  url.searchParams.append("_author", "true");
  url.searchParams.append("_comments", "true");
  url.searchParams.append("_reactions", "true");

  try {
    const response = await fetcher(url.href);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
