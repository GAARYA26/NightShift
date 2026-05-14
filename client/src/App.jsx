import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessDashboard from "./components/BusinessDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TrustedContacts from "./pages/TrustedContacts";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 LOGIN */}
        <Route
          path="/login"
          element={
            token ? (
              role === "business" ? (
                <Navigate to="/business" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Login />
            )
          }
        />

        {/* 📝 REGISTER */}
        <Route path="/register" element={<Register />} />

        {/* 🏠 USER HOME */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 🏪 BUSINESS */}
        <Route
          path="/business"
          element={
            <ProtectedRoute role="business">
              <BusinessDashboard />
            </ProtectedRoute>
          }
        />
        <Route
        path="/contacts"
        element={<TrustedContacts />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;