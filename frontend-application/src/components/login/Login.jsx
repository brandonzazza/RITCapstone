import { useState } from "react";
import Header from "../Header/Header.jsx";
import styles from "./Login.module.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const backendURL = "http://localhost:5000/api/auth"; // Change if deployed

  // Helper to reset all input fields and messages
  const resetForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirm("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (!email || !password) {
        setMessage("Please fill out all required fields.");
        setLoading(false);
        return;
      }

      if (!isLogin && password !== confirm) {
        setMessage("Passwords do not match.");
        setLoading(false);
        return;
      }

      const endpoint = isLogin ? "/login" : "/register";
      const payload = isLogin
        ? { email, password }
        : { email, username, password };

      const res = await fetch(`${backendURL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      // Save JWT token
      localStorage.setItem("token", data.token);
      setMessage(isLogin ? "Logged in successfully!" : "Account created!");

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/dashboard"; // change route as needed
      }, 1000);
    } catch (err) {
      setMessage(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${isLogin ? styles.active : ""}`}
            onClick={() => {
              setIsLogin(true);
              resetForm();
            }}
          >
            Login
          </div>
          <div
            className={`${styles.tab} ${!isLogin ? styles.active : ""}`}
            onClick={() => {
              setIsLogin(false);
              resetForm();
            }}
          >
            Signup
          </div>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>{isLogin ? "Login to Your Account" : "Create a New Account"}</h2>

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Re-enter Password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>

          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
