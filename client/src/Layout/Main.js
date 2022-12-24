import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";

const Main = () => {
  return (
    <div>
      <AppBar></AppBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
