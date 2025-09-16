import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>MyApp</div>
        <button
          className={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Login / Signup
        </button>
      </header>

      <main className={styles.content}>
        <h1>Welcome to MyApp</h1>
        <h2>Intro text... Will Include Photos</h2>
      </main>
    </div>
  );
}

export default LandingPage;
