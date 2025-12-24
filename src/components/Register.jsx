import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";              // your existing axios instance
import "../styles/register.css";       // CSS file

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
  if (localStorage.getItem("token")) {
    navigate("/Home");
  }
}, []);


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleChange = (e) => {
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      const data = res.data;

      setSuccess(data.message || "Registration successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userId", data.userId);

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data.message || "Registration failed.");
      } else {
        setError("Network error. Try again.");
      }
    } finally {
      setLoading(false);
      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2 className="register-title">Create Account</h2>

        {error && <p className="msg msg-error">{error}</p>}
        {success && <p className="msg msg-success">{success}</p>}

        <label className="field-label">Full Name</label>
        <input
          className="field-input"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label className="field-label">Email</label>
        <input
          className="field-input"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="field-label">Password</label>
        <input
          className="field-input"
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label className="field-label">Confirm Password</label>
        <input
          className="field-input"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="login-note">
          Already have an account?{" "}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
