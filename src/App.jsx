import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./App.module.css";

import { ITEMS_PER_PAGE, PRODUCTS_DATA, SETTINGS_KEY } from "./constants";
import { applyFilters, getAvailableFilters, isEmptyObject, sortProducts } from "./helpers";

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

  const selectedOptions = useMemo(
    () => ({
      categories: settings.categories,
      brands: settings.brands,
      minPrice: settings.minPrice,
      maxPrice: settings.maxPrice,
      minRating: settings.minRating,
      search: settings.search,
    }),
    [settings]
  );
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
    () => applyFilters(sortedProducts, selectedOptions),
    [sortedProducts, selectedOptions]
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

  const handleSelectedOptionsChange = useCallback(
    (updatedFilters) => {
      setIsLoading(true);
      setTimeout(() => {
        setSettings({ ...updatedFilters, sortBy });
        setPage(1);
        setIsLoading(false);
      }, 600);
    },
    [setSettings, sortBy]
  );

  const handleSort = useCallback(
    (value) => {
      setIsLoading(true);
       setTimeout(() => {
         setSettings({ ...selectedOptions, sortBy: value });
         setPage(1);
         setIsLoading(false);
       }, 600);
    },
    [selectedOptions, setSettings]
  );

  const handlePageChange = (page) => {
       setIsLoading(true);
       setTimeout(() => {
         setPage(page);
         setIsLoading(false);
       }, 600);
  }


  useEffect(() => {
    const t = setTimeout(() => {
      setProducts(PRODUCTS_DATA);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`${styles.container} ${
        isLoading && isEmptyObject(availableOptions) ? `${styles.loading}` : ""
      }`}
    >
      <FilterPanel
        availableOptions={availableOptions}
        selectedOptions={selectedOptions}
        onSelectedOptionsChange={handleSelectedOptionsChange}
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <main className={styles.main}>
          <CatalogHeader
            sortBy={sortBy}
            onSort={handleSort}
            toggleFilterPanel={() => setIsFilterPanelOpen((open) => !open)}
          />
          <ProductList products={paged} />
          <Pagination
            page={pageSafe}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      )}
    </div>
  );
}

export default App;
