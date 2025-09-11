import { useEffect, useRef, useState } from "react";
import styles from "./FilterPanel.module.css";
import useDebouncedValue from "../../hooks/useDebounce";
import { isEmptyObject } from "../../helpers";

export default function FilterPanel({
  availableOptions,
  selectedOptions,
  onSelectedOptionsChange,
  isOpen,
  onClose,
}) {
  const [minPrice, setMinPrice] = useState(selectedOptions.minPrice);
  const [maxPrice, setMaxPrice] = useState(selectedOptions.maxPrice);
  const [searchQuery, setSearchQuery] = useState(selectedOptions.search || "");

  const debouncedMinPrice = useDebouncedValue(minPrice);
  const debouncedMaxPrice = useDebouncedValue(maxPrice);
  const debouncedSearch = useDebouncedValue(searchQuery);
  const isInitialRender = useRef(true);

  function toggle(arr, value) {
    return arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
  }

  function handleResetFilters() {
    setSearchQuery("");
    setMinPrice(availableOptions.minPrice);
    setMaxPrice(availableOptions.maxPrice);
    onSelectedOptionsChange({
      categories: [],
      brands: [],
      minPrice: availableOptions.minPrice,
      maxPrice: availableOptions.maxPrice,
      minRating: 0,
      search: "",
    });
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const next = {
      ...selectedOptions,
      minPrice: Number(debouncedMinPrice) ,
      maxPrice: Number(debouncedMaxPrice),
      search: debouncedSearch,
    };

    if (
      next.minPrice !== selectedOptions.minPrice ||
      next.maxPrice !== selectedOptions.maxPrice ||
      next.search !== selectedOptions.search
    ) {
      onSelectedOptionsChange(next);
    }
  }, [
    debouncedMinPrice,
    debouncedMaxPrice,
    debouncedSearch,
    selectedOptions,
    onSelectedOptionsChange,
  ]);


  if (isEmptyObject(availableOptions)) return null;

  return (
    <aside className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <h2>Filters</h2>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close selectedOptions"
        >
          ✕
        </button>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="search">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search products or brands"
          className={styles.input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Category</div>
        <div className={styles.chips}>
          {availableOptions.categories.map((cat) => (
            <label key={cat} className={styles.chip}>
              <input
                type="checkbox"
                checked={selectedOptions.categories.includes(cat)}
                onChange={() =>
                  onSelectedOptionsChange({
                    ...selectedOptions,
                    categories: toggle(selectedOptions.categories, cat),
                  })
                }
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Brand</div>
        <div className={styles.chips}>
          {availableOptions.brands.map((brand) => (
            <label key={brand} className={styles.chip}>
              <input
                type="checkbox"
                checked={selectedOptions.brands.includes(brand)}
                onChange={() =>
                  onSelectedOptionsChange({
                    ...selectedOptions,
                    brands: toggle(selectedOptions.brands, brand),
                  })
                }
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Price range</div>
        <div className={styles.rangeRow}>
          <input
            type="number"
            value={minPrice}
            min={availableOptions.minPrice}
            max={availableOptions.maxPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={styles.input}
          />
          <span className={styles.sep}>—</span>
          <input
            type="number"
            value={maxPrice}
            min={availableOptions.minPrice}
            max={availableOptions.maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.help}>
          Min: {availableOptions.minPrice} • Max: {availableOptions.maxPrice}
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="rating">
          Minimum rating
        </label>
        <select
          id="rating"
          className={styles.select}
          value={String(selectedOptions.minRating)}
          onChange={(e) =>
            onSelectedOptionsChange({
              ...selectedOptions,
              minRating: Number(e.target.value),
            })
          }
        >
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <option key={r} value={r}>
              {r === 0 ? "Any" : `${r}+`}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.resetBtn}
          onClick={handleResetFilters}
          aria-label="Reset filters"
        >
          Reset filters
        </button>
      </div>
    </aside>
  );
}
