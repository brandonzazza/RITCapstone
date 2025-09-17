import { useState } from "react";
import Header from "../Header/Header.jsx";
import styles from "./Login.module.css";

function Login() {
  // state to track active tab
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Header />

      <div className={styles.container}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${isLogin ? styles.active : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </div>
          <div
            className={`${styles.tab} ${!isLogin ? styles.active : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </div>
        </div>

        {/* Form */}
        <form className={styles.form}>
          <h2>{isLogin ? "Login to Your Account" : "Create a New Account"}</h2>

          <input type="email" placeholder="Email" required />

          {/* Extra field for signup */}
          {!isLogin && <input type="text" placeholder="Username" required />}

          <input type="password" placeholder="Password" required />
          {!isLogin && (
            <input type="text" placeholder="Re-enter Password" required />
          )}

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
      </div>
    </>
  );
}

export default Login;
