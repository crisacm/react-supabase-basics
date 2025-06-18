import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword";
import RequestChangePass from "./pages/RequestChangePass";
import RegisterSuccess from "./pages/RegisterSuccess";
import ConfirmEmail from "./pages/ConfirmEmail";
import RequestChangePassSucess from "./pages/RequestChangePassSucess";
import { ToastProvider } from "./components/ToastProvider";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/success" element={<RegisterSuccess />} />
          <Route path="/auth/confirm" element={<ConfirmEmail />} />
          <Route
            path="/request-change-password"
            element={<RequestChangePass />}
          />
          <Route
            path="/request-change-password/success"
            element={<RequestChangePassSucess />}
          />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
