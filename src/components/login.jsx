import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";          // uses your existing api.js
import "../styles/login.css";     // CSS in the styles folder
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";


export default function Login() {
    
  const navigate = useNavigate();

  useEffect(() => {
  // if token exists, user is already logged in
  if (localStorage.getItem("token")) {
    navigate("/products");
  }
}, []);


  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      // Note: your api.baseURL already contains /api, so endpoint becomes /api/auth/login
      const res = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      const data = res.data;

      // Adjust this check to match your backend response shape
       // store login info
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userId", data.userId);

       navigate("/products");
       
    } catch (err) {
      // axios error shape: err.response contains backend response
      if (err?.response?.data) {
        // backend message may be { message: "Invalid credentials" } or similar
        // setError(err.response.data.message || JSON.stringify(err.response.data));
        setError("Invalid email or password.");
      } else {
        setError("Invalid email or password.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Login</h2>

        {error && <div className="msg msg-error" role="alert">{error}</div>}
        {success && <div className="msg msg-success" role="status">{success}</div>}

        <label className="field-label">Email</label>
        <input
          className="field-input"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <label className="field-label">Password</label>
        <input
          className="field-input"
          type="password"
          name="password"
          placeholder="Your password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      <div className="auth-link">
  <Link to="/forgot-password">Forgot password?</Link>


</div>


        <p className="register-note">
          Don't have an account?{" "}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/Register")}
            disabled={loading}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
