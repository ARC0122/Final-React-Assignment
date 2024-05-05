import React, { useState, useEffect } from "react";
import TabBox from "./TabBox";
import "./topbar.css";

import { useLocation } from "react-router-dom";
import { getAuth } from "../auth";

export default function Topbar() {
  const [authenticated, setAuthenticated] = useState(getAuth());
  const location = useLocation();

  console.log("Topbar");

  useEffect(() => {
    setAuthenticated(getAuth());
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("authenticate");
  };

  return (
    <div className="topbar">
      <div>
        <h2>My Application</h2>
      </div>
      <div className="tabs">
        <TabBox title="Home" link="/" />
        {authenticated && <TabBox title="List of Items" link="/listitem" />}
        {authenticated ? (
          <TabBox title="Logout" link="/logout" onClick={handleLogout} />
        ) : (
          <TabBox title="Login" link="/login" />
        )}
      </div>
    </div>
  );
}
