import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");
  const [newpassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (newpassword !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
    await api.post("/auth/reset-password", {
  token, 
  newPassword: newpassword
});

      setMessage("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 9000);
    } catch (err) {
      console.log(err+"ee");
      setError("Reset link invalid or expired");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card slide-up">
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Resetting…" : "Reset Password"}
          </button>
        </form>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}
