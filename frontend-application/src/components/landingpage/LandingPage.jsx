import Header from "../Header/Header.jsx";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>Welcome to MyApp</h1>
          <p>
            The ultimate solution to simplify your event planning workflow and
            boost productivity.
          </p>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <h2>Features</h2>
          <div className={styles.featureList}>
            <div className={styles.feature}>
              <h3>RSVP Management</h3>
              <p>Manage event attendees for your events</p>
            </div>
            <div className={styles.feature}>
              <h3>Data Driven Results</h3>
              <p>
                Get current up to date result and live metrics for your event.
              </p>
            </div>
            <div className={styles.feature}>
              <h3>Intuitive Design</h3>
              <p>
                Easy-to-use interface that integrates with other event planning
                applications
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className={styles.ctaSection}>
          <h2>Ready to get started?</h2>
          <button className={styles.ctaButton}>Sign Up Now</button>
        </section>
      </main>
    </>
  );
}

export default LandingPage;
