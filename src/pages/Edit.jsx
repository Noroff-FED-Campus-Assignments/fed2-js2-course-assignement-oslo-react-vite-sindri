import { API_URL } from "../lib/constants";
import "./Create.scss";
import { useEffect, useState } from "react";

export default function EditPage() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [post, setPost] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const postId = window.location.pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TIP: Get the ID from the search params in the URL

        const accessToken = localStorage.getItem("access_token");
        // TIP: Fetch the post from the API using the ID

        fetch(`${API_URL}/posts/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((post) => {
            setPost(post);
            setShowEdit(true);
          });

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

  const editPost = (event) => {
    event.preventDefault();

    const title = event.target[0].value;
    const text = event.target[1].value;
    const url = event.target[2].value;
    const tag = event.target[3].value;
    console.log(title, text, url, tag);
    const accessToken = localStorage.getItem("access_token");
    fetch(`${API_URL}/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        body: text,
        tags: [tag],
        media: url,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  const previewImage = (event) => {
    const imageUrl = event.target.value;
    setImagePreviewUrl(imageUrl);
  };
  return (
    <>
      <h1>Edit post</h1>

      {showEdit && (
        <form onSubmit={editPost}>
          <div className="form-container">
            <div>
              <div className="input">
                <label htmlFor="text">Title:</label>
                <input type="text" required defaultValue={post.title} />
              </div>
              <div className="input">
                <label htmlFor="text">Text:</label>
                <textarea required defaultValue={post.body} />
              </div>
              <div className="input">
                <label htmlFor="text">Url:</label>
                <input
                  type="text"
                  onChange={previewImage}
                  defaultValue={post.media}
                />
              </div>
              <div className="input">
                <label htmlFor="text">Tag:</label>
                <input type="text" defaultValue={post.tags[0]} />
              </div>
            </div>
            <div>
              <img src={imagePreviewUrl} alt="" />
              <button>Save</button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
