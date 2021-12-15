import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import DashBoard from "./components/users/DashBoard";
import LogIn from "./components/users/LogIn";

import UserErrors from "./components/Errors/UserErrors";
import CampgroundShow from "./components/campgrounds/CampgroundShow";


function App() {

  return (
    <div className="App">
      <UserErrors />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/login" element={<LogIn />} />
          <Route path="campgrounds/:id" element={<CampgroundShow />} />
          <Route element={<RequireAuth />}>
            <Route path="/users/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
