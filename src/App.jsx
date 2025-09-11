import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./App.module.css";

import { ITEMS_PER_PAGE, SETTINGS_KEY } from "./constants";
import {
  applyFilters,
  delay,
  getAvailableFilters,
  isEmptyObject,
  sortProducts,
} from "./helpers";

import Pagination from "./components/Pagination";
import useLocalStorage from "./hooks/useLocalStorage";
import ProductList from "./components/ProductList";
import CatalogHeader from "./components/CatalogHeader";
import FilterPanel from "./components/FilterPanel";
import Spinner from "./components/Spinner";

const initialSettings = {
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 99999,
  minRating: 0,
  search: "",
};

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(
    window.innerWidth > 900
  );

  const [settings, setSettings] = useLocalStorage(SETTINGS_KEY, {
    ...initialSettings,
    sortBy: "default",
  });

  const timerRef = useRef(null);

  const sortBy = settings.sortBy;

  const availableOptions = useMemo(
    () => (products.length ? getAvailableFilters(products) : {}),
    [products]
  );

  const sortedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy]
  );

  const filteredProducts = useMemo(
    () => applyFilters(sortedProducts, settings),
    [sortedProducts, settings]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );
  const pageSafe = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (pageSafe - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, pageSafe]);

  const runWithSpinner = useCallback((run) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsLoading(true);
    run();
    timerRef.current = setTimeout(() => setIsLoading(false), 600);
  }, []);

  const handleSelectedOptionsChange = useCallback(
    (updatedFilters) => {
      runWithSpinner(() => {
        setSettings({ ...updatedFilters, sortBy: settings.sortBy });
        setPage(1);
      });
    },
    [runWithSpinner, setSettings, settings.sortBy]
  );

  const handleSort = useCallback(
    (value) => {
      runWithSpinner(() => {
        setSettings((prev) => ({ ...prev, sortBy: value }));
        setPage(1);
      });
    },
    [runWithSpinner, setSettings]
  );

  const handlePageChange = (page) => {
    runWithSpinner(() => setPage(page));
  };


  useEffect(() => {
    async function getInitialData(){
      try {
        await delay(600); 
        const res = await fetch(`${import.meta.env.BASE_URL}products.json`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("[App] Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialData();
  }, []);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${
        isLoading && isEmptyObject(availableOptions) ? `${styles.loading}` : ""
      }`}
    >
      <FilterPanel
        availableOptions={availableOptions}
        selectedOptions={settings}
        onSelectedOptionsChange={handleSelectedOptionsChange}
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
      />
      <main className={styles.main}>
        <CatalogHeader
          sortBy={sortBy}
          onSort={handleSort}
          toggleFilterPanel={() => setIsFilterPanelOpen((open) => !open)}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ProductList products={paged} />
            <Pagination
              page={pageSafe}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
