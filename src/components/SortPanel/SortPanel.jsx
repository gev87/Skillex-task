import { SORT_OPTIONS } from "../../constants";
import styles from "./SortPanel.module.css";

function SortPanel({ value, onSort }) {
  return (
    <select
      className={styles.sortSelect}
      value={value}
      onChange={(e) => onSort(e.target.value)}
      aria-label="Sort products"
      id="sortSelect"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default SortPanel;
