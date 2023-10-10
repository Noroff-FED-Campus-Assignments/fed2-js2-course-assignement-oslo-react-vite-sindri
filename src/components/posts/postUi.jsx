import "./index.scss";

export default function Post({ key, title, image, body }) {
  return (
    <div className="post" key={key}>
      <div className="post__img-container">
        {image ? (
          <img src={image} alt={title} className="post__img-img" />
        ) : null}
      </div>
      <div className="post__text">
        <h2 className="post__title">{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}
