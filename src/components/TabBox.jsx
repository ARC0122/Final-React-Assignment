import React from "react";
import { Link } from "react-router-dom";
import "./tabbox.css";

export default function TabBox(props) {
  console.log("TabBox");
  return (
    <div>
      <Link className="box" to={`${props.link}`}>
        {props.title}
      </Link>
    </div>
  );
}
