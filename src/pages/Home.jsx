import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";

/**
 * @typedef {import('../lib/types.js').PostModel} Post
 */

/**
 * Home Page displays a list of posts
 * @see https://docs.noroff.dev/social-endpoints/posts
 */
export default function HomePage() {
  /** @type {[Post[], React.Dispatch<Data>]} */
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const accessToken = localStorage.getItem("jwt");

        const url = new URL(`${API_URL}/posts`);
        url.searchParams.append("_author", "true");
        url.searchParams.append("_comments", "true");
        url.searchParams.append("_reactions", "true");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <>
      <h1>Index/ Home Page</h1>

      <section>
        {posts.map((post) => (
          <div key={post.id}>{post?.title}</div>
        ))}
      </section>
    </>
  );
}
