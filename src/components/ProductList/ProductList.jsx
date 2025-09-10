import ProductCard from "../ProductCard";
import styles from "./ProductList.module.css";

function ProductList({ products }) {
  return (
    <>
      {products.length === 0 ? (
        <div className={styles.noResults}>
          No products found. Try adjusting your filters.
        </div>
      ) : (
        <section className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      )}
    </>
  );
}

export default ProductList;
