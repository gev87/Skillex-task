// src/__tests__/filter.logic.test.js
import { expect, test } from "vitest";
import { applyFilters } from "../helpers";
import { SAMPLE } from "./fixtures";

test("filters by category + brand + price + rating + search", () => {
  const options = {
    categories: ["Electronics"],
    brands: ["Brand A", "Brand D"],
    minPrice: 90,
    maxPrice: 600,
    minRating: 4.5,
    search: "wire",
  };
  const res = applyFilters(SAMPLE, options);
  expect(res).toHaveLength(1);
  expect(res[0].name).toMatch(/Wireless Headphones/i);
});

test("search matches brand text too", () => {
  const res = applyFilters(SAMPLE, {
    categories: [],
    brands: [],
    minPrice: -Infinity,
    maxPrice: Infinity,
    minRating: 0,
    search: "brand a",
  });
  expect(res.some((p) => p.brand === "Brand A")).toBe(true);
});

test("search is case-insensitive and trims whitespace", () => {
  const res = applyFilters(SAMPLE, {
    categories: [],
    brands: [],
    minPrice: -Infinity,
    maxPrice: Infinity,
    minRating: 0,
    search: "  WIRE  ",
  });
  expect(res.find((p) => /wireless/i.test(p.name))).toBeTruthy();
});

test("coerces numeric price strings safely", () => {
  const mixed = SAMPLE.map((p) => ({ ...p, price: String(p.price) })); 
  const res = applyFilters(mixed, {
    categories: [],
    brands: [],
    minPrice: 50,
    maxPrice: 200,
    minRating: 0,
    search: "",
  });
  expect(res.length).toBeGreaterThan(0);
});


test("no filter returns all", () => {
  const res = applyFilters(SAMPLE, {
    categories: [],
    brands: [],
    minPrice: -Infinity,
    maxPrice: Infinity,
    minRating: 0,
    search: "",
  });
  expect(res).toHaveLength(SAMPLE.length);
});
