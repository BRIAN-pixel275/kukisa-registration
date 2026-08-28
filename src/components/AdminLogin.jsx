import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      console.error("Login error:", error);

      setErrorMessage(
        error.message || "Unable to sign in. Please try again."
      );

      return;
    }

    console.log("LOGIN SUCCESSFUL:", data.user);
    console.log("SESSION:", data.session);

    if (!data.session) {
      setErrorMessage(
        "Login was successful but no session was created. Please try again."
      );
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <LockKeyhole size={30} />
        </div>

        <p className="admin-label">KUKISA ADMIN</p>

        <h1>Welcome back</h1>

        <p className="admin-login-text">
          Sign in to manage and view KUKISA member registrations.
        </p>

        <form onSubmit={handleLogin}>
          <div className="admin-input-group">
            <label>Email Address</label>

            <div className="admin-input-wrapper">
              <Mail size={18} />

              <input
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label>Password</label>

            <div className="admin-input-wrapper">
              <LockKeyhole size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="admin-error">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;