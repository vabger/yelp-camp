import React from "react";
import { useSelector } from "react-redux";

import { Outlet, useLocation, Navigate } from "react-router-dom";

function RequireAuth() {
  const { currentUser } = useSelector((state) => state.users);

  const location = useLocation();

  if (!currentUser.loggedIn) {
    return <Navigate to="/users/login" state={{ from: location }} />;
  }

  return <Outlet></Outlet>;
}

export default RequireAuth;
