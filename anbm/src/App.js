import React, { useContext } from "react";
import Home from "./pages/home/home/Home";
import Login from "./pages/home/login/Login";
import Register from "./pages/home/register/Register";
import Profile from "./pages/profile/profile";
import Popup from "./components/Popup";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  const envVar = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />

        <Route exact path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
