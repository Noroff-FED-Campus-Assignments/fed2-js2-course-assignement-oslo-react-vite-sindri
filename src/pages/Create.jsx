import { API_URL } from "./../lib/constants";
import { useState } from "react";

import "./Create.scss";

export default function CreatePage() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const createPost = (event) => {
    event.preventDefault();

    const title = event.target[0].value;
    const text = event.target[1].value;
    const url = event.target[2].value;
    const tag = event.target[3].value;
    console.log(title, text, url, tag);
    const accessToken = localStorage.getItem("access_token");
    fetch(`${API_URL}/posts`, {
      method: "POST",
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
      <h1>Create post</h1>

      <form onSubmit={createPost}>
        <div className="form-container">
          <div>
            <div className="input">
              <label htmlFor="text">Title:</label>
              <input type="text" required />
            </div>
            <div className="input">
              <label htmlFor="text">Text:</label>
              <textarea required />
            </div>
            <div className="input">
              <label htmlFor="text">Url:</label>
              <input type="text" onChange={previewImage} />
            </div>
            <div className="input">
              <label htmlFor="text">Tag:</label>
              <input type="text" />
            </div>
          </div>
          <div>
            <img src={imagePreviewUrl} alt="" />
            <button>Save</button>
          </div>
        </div>
      </form>
    </>
  );
}
