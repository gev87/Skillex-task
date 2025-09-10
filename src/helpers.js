export function getAvailableFilters(products) {
  if (!products || products.length === 0) {
    return { categories: [], brands: [], minPrice: 0, maxPrice: 0 };
  }

  const categorySet = new Set();
  const brandSet = new Set();
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  for (const product of products) {
    if (product.category) categorySet.add(product.category);
    if (product.brand) brandSet.add(product.brand);
    minPrice = Math.min(minPrice, product.price);
    maxPrice = Math.max(maxPrice, product.price);
  }

  return {
    categories: Array.from(categorySet).sort(),
    brands: Array.from(brandSet).sort(),
    minPrice,
    maxPrice,
  };
}

export function applyFilters(products, options = {}) {
  const {
    categories = [],
    brands = [],
    minPrice = -Infinity,
    maxPrice = Infinity,
    minRating = 0,
    search = "",
  } = options;

  const q = search.trim().toLowerCase();

  return products.filter((p) => {
    const inCategory = !categories.length || categories.includes(p.category);
    const inBrand = !brands.length || brands.includes(p.brand);
    const inPrice = p.price >= minPrice && p.price <= maxPrice;
    const inRating = (p.rating ?? 0) >= minRating;
    const inSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q);

    return inCategory && inBrand && inPrice && inRating && inSearch;
  });
}

export function sortProducts(products, sortBy) {
  const arr = [...products];
  switch (sortBy) {
    case "priceAsc":
      return arr.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return arr.sort((a, b) => b.price - a.price);
    case "ratingAcs":
      return arr.sort((a, b) => b.rating - a.rating);
    case "ratingDesc":
      return arr.sort((a, b) => b.rating - a.rating);
    case "nameAsc":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "default":
    default:
      return arr; // leave order as-is
  }
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}