import { useEffect, useState } from "react";
import { Route } from "@tanstack/react-router";
import { API_URL } from "./../lib/constants";

const initialPostState = {
  title: "No post found",
  body: "Nothing to see here",
  userId: null,
  id: null,
};

/**
 * Displays a single post
 * @see https://docs.noroff.dev/social-endpoints/posts
 */
export default function PostPage() {
  const [post, setPost] = useState([initialPostState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TIP: Set the post in state
      } catch (error) {
        // TIP: Handle errors from the API
      } finally {
        // TIP: Set loading to false
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>{post?.title}</h1>
    </>
  );
}
