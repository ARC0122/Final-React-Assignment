import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../auth";

export default function Logout() {
  console.log("Logout");
  const navigate = useNavigate();
  function logout() {
    setAuth(false);
    navigate("/");
    alert("Logout Successfull !!");
  }
  return (
    <div>
      <button
        onClick={logout}
        style={{
          margin: "15px",
          width: "150px",
          height: "40px",
          background: "transparent",
          borderRadius: "20px",
        }}
      >
        Logout{" "}
      </button>
    </div>
  );
}
