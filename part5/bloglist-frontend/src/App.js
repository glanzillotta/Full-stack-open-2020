import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import FormBlog from "./components/FormBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);  

  if (user === null) {
    return (
      <div>
        <Login setUser={setUser} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <FormBlog />
        <p>
          {user.name} logged in{" "}
          <input
            type="button"
            value="log out"
            onClick={() => window.localStorage.clear()}
          />
        </p>
        <h2>create new</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
