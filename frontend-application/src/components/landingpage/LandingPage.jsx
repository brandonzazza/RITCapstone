import styles from "./LandingPage.module.css";
import Header from "../Header/Header.jsx";

function LandingPage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.content}>
          <h1>Welcome to MyApp</h1>
          <h2>Intro text... Will Include Photos</h2>
        </main>
      </div>
    </>
  );
}

export default LandingPage;
