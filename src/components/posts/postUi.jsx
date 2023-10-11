import "./index.scss";
import { Link } from "@tanstack/react-router";

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
