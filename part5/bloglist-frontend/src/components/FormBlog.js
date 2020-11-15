import React, { useState } from "react";
import blogService from "../services/blogs";

const FormBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = async (event) => {
    event.preventDefault();
    await blogService.create({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input type="text" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <input type="submit" value="create" />
        </div>
      </form>
    </div>
  );
};

export default FormBlog;
