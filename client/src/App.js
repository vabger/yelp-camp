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

  const userError = useSelector((state) => state.users.error);
  return (
    <div className="App">
      {console.log(userError)}
      {
        userError && <AlertDismissible
          variant="danger"
          duration={10}
          message={userError.message}
          heading="ERROR!"
        />}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/login" element={<LogIn />} />\
          <Route element={<RequireAuth />}>
            <Route path="/users/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
