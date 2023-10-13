import { useEffect, useState } from "react";
import { Route } from "@tanstack/react-router";
import { API_URL } from "./../lib/constants";
import "./Post.scss";

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
        // TIP: Get the ID from the search params in the URL
        const postId = window.location.pathname.split("/")[2];
        const accessToken = localStorage.getItem("access_token");
        // TIP: Fetch the post from the API using the ID

        fetch(`${API_URL}/posts/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((post) => setPost(post));

        // TIP: Set the post in state
      } catch (error) {
        // TIP: Handle errors from the API
        console.error(error);
      } finally {
        // TIP: Set loading to false
      }
    };

    fetchData();
  }, []);

  const deletePost = () => {
    const accessToken = localStorage.getItem("access_token");
    fetch(`${API_URL}/posts/${post.id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      console.log(response);
    });
  };
  return (
    <>
      <div className="post">
        <div>
          <h1>{post?.title}</h1>

          <p>{post?.body}</p>
        </div>
        <img src={post?.media} alt="" />

        <div className="center">
          <button>Edit</button>
        </div>
        <div className="center">
          <button className="delete-button" onClick={deletePost}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
