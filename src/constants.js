

const BASE_IMAGE_URL = "https://images.unsplash.com";


export const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    brand: "Brand A",
    price: 99.99,
    rating: 4.5,
    imageUrl: `${BASE_IMAGE_URL}/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop`,
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    category: "Electronics",
    brand: "Brand B",
    price: 49.99,
    rating: 4.0,
    imageUrl: `${BASE_IMAGE_URL}/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop`,
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Footwear",
    brand: "Brand C",
    price: 59.99,
    rating: 4.2,
    imageUrl: `${BASE_IMAGE_URL}/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop`,
  },
  {
    id: 4,
    name: "Smartphone",
    category: "Electronics",
    brand: "Brand D",
    price: 499.99,
    rating: 4.8,
    imageUrl: `${BASE_IMAGE_URL}/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop`,
  },
  {
    id: 5,
    name: "Leather Jacket",
    category: "Clothing",
    brand: "Brand E",
    price: 199.99,
    rating: 4.7,
    imageUrl: `${BASE_IMAGE_URL}/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop`,
  },
  {
    id: 6,
    name: "Laptop",
    category: "Electronics",
    brand: "Brand A",
    price: 899.99,
    rating: 4.6,
    imageUrl: `${BASE_IMAGE_URL}/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop`,
  },
  {
    id: 7,
    name: "Sneakers",
    category: "Footwear",
    brand: "Brand C",
    price: 79.99,
    rating: 4.3,
    imageUrl: `${BASE_IMAGE_URL}/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop`,
  },
  {
    id: 8,
    name: "T-Shirt",
    category: "Clothing",
    brand: "Brand E",
    price: 29.99,
    rating: 4.1,
    imageUrl: `${BASE_IMAGE_URL}/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop`,
  },
];

export const SETTINGS_KEY = "settings";


export const SORT_OPTIONS = [
  { id: "default", label: "Default" },
  { id: "priceAsc", label: "Sort by Price: Low to High" },
  { id: "priceDesc", label: "Sort by Price: High to Low" },
  { id: "ratingAsc", label: "Sort by Rating: Low to High" },
  { id: "ratingDesc", label: "Sort by Rating: High to Low" },
  { id: "nameAsc", label: "Sort by Name: A → Z" },
];


export const ITEMS_PER_PAGE = 6;