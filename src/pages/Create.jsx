import { API_URL } from "./../lib/constants";

import "./Create.scss";

export default function CreatePage() {
  const createPost = (event) => {
    event.preventDefault();

    const title = event.target[0].value;
    const text = event.target[1].value;
    const url = event.target[2].value;
    const tag = event.target[3].value;
    console.log(title, text, url, tag);
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2MzI0NjI2fQ.RzasPhTGOgkBdavgA1eObqzH5udnxJWvEksh5iEJ1zE",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  // const previewImage = (event) => {
  //   var input = event.target;
  //   var image = document.getElementById("preview");
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = function (e) {
  //       image.src = e.target.result;
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // };
  return (
    <>
      <h1>Create post</h1>

      <form onSubmit={createPost}>
        <div className="form-container">
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
            <input
            // type="file"
            // accept="image/*"
            // onChange={previewImage(event)}
            />
          </div>
          <div className="input">
            <label htmlFor="text">Tag:</label>
            <input type="text" />
          </div>
          <button>Save</button>
        </div>
      </form>
      <img id="preview" alt="" />
    </>
  );
}
