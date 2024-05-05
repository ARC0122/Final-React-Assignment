import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, setAuth } from "../auth";

export default function LoginPage() {
  console.log("LoginPage");

  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);
  const [error, setError] = useState("");

  function handleClick(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");

    if (username === "" || password === "") {
      setError("Please enter credentials");
      return;
    }

    if (username === "abc" && password === "123") {
      setLoginState(true);
      navigate("/listitem");
      setAuth(true);
      console.log(getAuth());
      setError("");
    } else if (username !== "abc") {
      setError("User Name invalid");
    } else if (password !== "123") {
      setError("Password invalid");
    }
  }

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        border: "2px solid gray",
        borderRadius: "10px",
        margin: "auto",
        marginTop: "10px",
        fontSize: "16px",
      }}
    >
      {!loginState && (
        <form
          onSubmit={handleClick}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            marginTop: "18px",
          }}
        >
          <label style={{ margin: "10px" }}>User Name</label>
          <input
            style={{
              margin: "10px",
              border: "none",
              borderBottom: "2px solid gray",
              width: "200px",
              height: "30px",
            }}
            type="text"
            name="username"
          ></input>
          <label style={{ margin: "10px" }}>Password</label>
          <input
            type="password"
            name="password"
            style={{
              margin: "10px",
              border: "none",
              borderBottom: "2px solid gray",
              width: "200px",
              height: "30px",
            }}
          ></input>
          <button
            type="submit"
            style={{
              margin: "10px",
              width: "150px",
              height: "50px",
              borderRadius: "20px",
              background: " transparent",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          {error && <div style={{ color: "red", margin: "10px" }}>{error}</div>}
        </form>
      )}
    </div>
  );
}
