import React, { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Login = (props) => {
  const { setUser, setMessage } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage(["Wrong username or password", "fail"]);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <input type="submit" value="login" />
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default Login;
