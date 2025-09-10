import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <div className={styles.card} data-testid="product-card">
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <div className={styles.body}>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.meta}>
          <span>{product.brand}</span>
          <span className={styles.dot}>•</span>
          <span>{product.category}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <span className={styles.rating}>⭐ {product.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
