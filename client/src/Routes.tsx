import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { Login, Register } from "./pages/auth";
import { TaskList } from "./pages/task/";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  if (!authenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};

const Logout = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  if (authenticated) {
    setAuthenticated(false);
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

function Routes() {
  return (
    <Router>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/task" element={<TaskList />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Router>
  );
}

export default Routes;
