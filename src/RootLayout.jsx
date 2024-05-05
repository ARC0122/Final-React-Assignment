import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";

export default function RootLayout() {
  console.log("RootLayout");
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
}
