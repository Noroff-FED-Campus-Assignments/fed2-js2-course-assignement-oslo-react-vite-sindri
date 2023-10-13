import "./index.scss";
import { Link } from "@tanstack/react-router";
import { API_URL } from "../../lib/constants";
import { useState } from "react";
/**
 * Post displaying content for a post, for use in list of multiple posts
 * @property {number} key - ID of the post
 * @property {string} title - Title of post
 * @property {string} media - A url to an image, for src
 * @property {string} body - Body text of the post
 * @property {number} href - id used for linking to single post
 */
export default function Post({ key, title, image, body, href, user, id }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");

  const handleOnOpenEdit = function () {
    setIsEditing((prev) => !prev);
  };

  const handleOnSubmitEdit = function (e) {
    e.preventDefault();
    const accessToken = localStorage.getItem("access_token");
    const newTitle = e.target[0].value;
    const newBody = e.target[1].value;
    const id = e.target.id;

    fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: newTitle,
        body: newBody,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setIsEditing(false);
    setBodyText(newBody);
    setTitleText(newTitle);
  };

  const handleOnDelete = async function (e) {
    const accessToken = localStorage.getItem("access_token");
    const id = e.target.id;
    console.log(e);
    const url = `${API_URL}/posts/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const titleToUse = titleText ? titleText : title;
  const bodyToUse = bodyText ? bodyText : body;
  return isEditing ? (
    <form className="editing post" id={id} onSubmit={handleOnSubmitEdit}>
      <div className="post__text">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id=""
          defaultValue={titleToUse}
          className="editing__input"
        />
      </div>
      <div className="post__text">
        <label htmlFor="body">Body:</label>
        <textarea
          name="body"
          id=""
          cols="30"
          rows="3"
          defaultValue={bodyToUse}
          className="editing__input"
        ></textarea>
      </div>
      <button type="submit" className="editing__submit">
        Finish editing
      </button>
    </form>
  ) : (
    <div className={`post ${isDeleted ? "inactive" : ""}`} key={key}>
      <Link className="post-link" to={"posts/" + href}>
        <div className="post__img-container">
          {image ? (
            <img src={image} alt={title} className="post__img-img" />
          ) : null}
        </div>
        <div className="post__text">
          {isEditing ? (
            <input defaultValue={titleToUse}></input>
          ) : (
            <h2 className="post__title">{`${
              isDeleted ? "Post Deleted" : titleToUse
            }`}</h2>
          )}

          {!isDeleted ? <p>{bodyToUse}</p> : null}
        </div>
      </Link>
      {user && !isDeleted ? (
        <div className="post__text post__edit-section">
          <button className="post__delete" id={id} onClick={handleOnDelete}>
            Delete
          </button>

          <button className="post__edit" onClick={handleOnOpenEdit}>
            Edit
          </button>
        </div>
      ) : null}
    </div>
  );
}
