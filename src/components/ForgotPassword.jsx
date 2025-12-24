import React, { useState } from "react";
import api from "../services/api";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post("/auth/forgot-password", { email: email.trim() });
      setMessage("If this email exists, a reset link has been sent.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <h2>Forgot Password</h2>
        <p className="auth-subtext">
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}
