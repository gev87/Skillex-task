import styles from "./Spinner.module.css";

function Spinner() {
  return <div className={styles.spinner} role="status" aria-label="loading" />;
}

export default Spinner; 