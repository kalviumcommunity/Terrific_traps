import React from "react";
import { Link } from "react-router-dom";

function Login() {
  const cData = (name, value) => {
    document.cookie = `${name}={${value}};path="/"`;
  };

  return (
    <div className="box">
      <h1>Login Page</h1>
      <form className="login" onSubmit={(e) => e.preventDefault()}>
        <br/>
        <label htmlFor="name">First Name:</label>
        <input
          type="text"
          placeholder="Enter your first name..."
          onChange={(e) => cData("name", e.target.value)}
          className="name"
        />
        <br/>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => cData("email", e.target.value)}
          className="email"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          placeholder="Enter your password..."
          onChange={(e) => cData("password", e.target.value)}
          className="password"
        />
        <br />
        <Link to="/">
          <button type="submit" className="login">
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
