import SortPanel from "../SortPanel";
import styles from "./CatalogHeader.module.css";

function CatalogHeader({ sortBy, onSort, toggleFilterPanel }) {
  return (
    <div className={styles.header}>
      <h1>Catalog</h1>
      <div className={styles.toolbar}>
        <div className={styles.mobileBar}>
          <button className={styles.btn} onClick={toggleFilterPanel}>
            Filters
          </button>
        </div>
        <SortPanel value={sortBy} onSort={onSort} />
      </div>
    </div>
  );
}

export default CatalogHeader;