import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = (props) => {
  const { blog, setMessage } = props;
  const [visible, setVisible] = useState(false);
  const hide = { display: visible ? "" : "none" };
  const border = { border: "1px solid", margin: "2px" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikes = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: ++blog.likes,
    };
    try{
    await blogService.update(blog.id, updatedBlog);
    console.log(window.location);
    }catch(exception){
      setMessage([exception.message, "fail"])
    }
  };

  const handleRemove = async () => {
    try {
      if(window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`))
      await blogService.remove(blog.id);
    } catch (exception) {
      setMessage([exception.message, "fail"]);
    }
  };

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
        <div>
          <input type="button" value="remove" onClick={handleRemove} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
