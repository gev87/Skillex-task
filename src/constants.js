
export const SETTINGS_KEY = "settings";

export const SORT = Object.freeze({
  DEFAULT: "default",
  PRICE_ASC: "priceAsc",
  PRICE_DESC: "priceDesc",
  RATING_ASC: "ratingAsc",
  RATING_DESC: "ratingDesc",
  NAME_ASC: "nameAsc",
});

export const SORT_OPTIONS = [
  { id: SORT.DEFAULT, label: "Default" },
  { id: SORT.PRICE_ASC, label: "Sort by Price: Low to High" },
  { id: SORT.PRICE_DESC, label: "Sort by Price: High to Low" },
  { id: SORT.RATING_ASC, label: "Sort by Rating: Low to High" },
  { id: SORT.RATING_DESC, label: "Sort by Rating: High to Low" },
  { id: SORT.NAME_ASC, label: "Sort by Name: A → Z" },
];


export const ITEMS_PER_PAGE = 6;