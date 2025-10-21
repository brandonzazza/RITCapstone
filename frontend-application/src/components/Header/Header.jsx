import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        TaskPro
      </Link>
      <button className={styles.loginButton} onClick={() => navigate("/login")}>
        Login / Signup
      </button>
    </header>
  );
}

export default Header;
