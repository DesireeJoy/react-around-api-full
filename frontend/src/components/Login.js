import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.handleLogin(email, password);
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      history.push("/");
    }
  }

  return (
    <div className="login">
      <p className="login__heading">Log in</p>

      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          required
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          className="login__input"
          required
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" className="login__button">
          Log in
        </button>
      </form>
      <p className="login__register">
        Not a member yet?
        <Link to="/signup" className="login__link-register">
          Sign up here!
        </Link>
      </p>
    </div>
  );
}

export default withRouter(Login);
