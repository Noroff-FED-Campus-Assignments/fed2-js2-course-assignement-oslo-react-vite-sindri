import "./index.scss";
import { Link } from "@tanstack/react-router";
/**
 * Post displaying content for a post, for use in list of multiple posts
 * @property {number} key - ID of the post
 * @property {string} title - Title of post
 * @property {string} media - A url to an image, for src
 * @property {string} body - Body text of the post
 * @property {number} href - id used for linking to single post
 */
export default function Post({ key, title, image, body, href }) {
  return (
    <div className="post" key={key}>
      <Link className="post-link" to={"posts/" + href}>
        <div className="post__img-container">
          {image ? (
            <img src={image} alt={title} className="post__img-img" />
          ) : null}
        </div>
        <div className="post__text">
          <h2 className="post__title">{title}</h2>
          <p>{body}</p>
        </div>
      </Link>
    </div>
  );
}
