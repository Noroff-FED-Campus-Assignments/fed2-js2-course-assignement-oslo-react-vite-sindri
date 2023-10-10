import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";
import Post from "../components/posts/postUi";
import "../components/posts/index.scss";
import Search from "../components/search";
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
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        // const accessToken = localStorage.getItem("jwt");

        const url = new URL(`${API_URL}/posts`);
        url.searchParams.append("_author", "true");
        url.searchParams.append("_comments", "true");
        url.searchParams.append("_reactions", "true");

        const response = await fetch(url, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2MzI0NjI2fQ.RzasPhTGOgkBdavgA1eObqzH5udnxJWvEksh5iEJ1zE",
            // `Bearer ${accessToken}`
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        if (searchWord) {
          const filtered = data.filter((post) => {
            if (post.title.includes(searchWord)) return true;
          });
          setPosts(filtered);
        } else {
          setPosts(data);
        }

        console.log(posts);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [searchWord]);

  const onSearch = (s) => {
    setSearchWord(s);
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <>
      <h1>Index/ Home Page</h1>
      <Search onSearch={onSearch} />
      <section className="posts">
        {posts.map(({ id, title, media, body }) => (
          <Post key={id} title={title} image={media} body={body} />
        ))}
      </section>
    </>
  );
}
