import React, { useState } from "react";

const Blog = (props) => {
  const { blog } = props;
  const [visible, setVisible] = useState(false);
  const hide = { display: visible ? "" : "none" };
  const border = { border: "1px solid", margin: "2px" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikes = () => {};

  return (
    <div style={border}>
      {blog.title} {blog.author}{" "}
      <input type="button" value="view" onClick={toggleVisibility} />
      <div style={hide}>
        {blog.url}
        <div>
          {blog.likes}{" "}
          <input type="button" value="like" onClick={handleLikes} />
        </div>
        {blog.user !== undefined && blog.user.username}
      </div>
    </div>
  );
};

export default Blog;
