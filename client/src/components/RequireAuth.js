import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Outlet, useLocation, Navigate } from "react-router-dom";

import { getCurrentUser } from "../redux-store/actions/usersActions";

import LoadingBars from "./loading/LoadingBars";

function RequireAuth() {
  const { currentUser } = useSelector((state) => state.users);

  const userError = useSelector((state) => state.users.error);

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (!currentUser.loggedIn) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, currentUser.loggedIn]);

  if (userError && userError.status === 401) {
    return <Navigate to="/users/login" state={{ from: location }} />;
  }

  if (currentUser.loggedIn) {
    return <Outlet />
  }

  return <LoadingBars />
}

export default RequireAuth;
