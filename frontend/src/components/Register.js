import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(email, password);
  }

  return (
    <div className="login">
      <p className="login__heading">Sign up</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="login__input"
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" className="login__button">
          Sign up
        </button>
      </form>

      <div className="login__register">
        <p>
          Already a member?
          <Link to="signin" className="login__link-login">
            Log in here!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(Register);
