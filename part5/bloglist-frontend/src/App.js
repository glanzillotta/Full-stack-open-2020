import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <Login
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          username={username}
          setUsername={setUsername}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <input type="button" value="log out" onClick={()=>window.localStorage.clear()} />
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
