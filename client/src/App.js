import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import DashBoard from "./components/users/DashBoard";
import LogIn from "./components/users/LogIn";
import AlertDismissible from "./components/Alerts/AlertDismissible";

import { CLEAR_ERRORS } from "./redux-store/action-types/usersTypes";
import { getCurrentUser } from "./redux-store/actions/usersActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch({
      type: CLEAR_ERRORS,
    });
  }, [dispatch]);

  const userErrors = useSelector((state) => state.users.error);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/login" element={<LogIn />} />\
          <Route element={<RequireAuth />}>
            <Route path="/users/dashboard" element={<DashBoard />} />
          </Route>
          <Route
            path="/alert"
            element={
              <AlertDismissible
                variant="danger"
                duration={5000}
                message="hello world"
                heading="ERROR!"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
