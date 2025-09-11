// src/__tests__/sorting.logic.test.js
import { expect, test } from "vitest";
import { sortProducts } from "../helpers";
import { SAMPLE } from "./fixtures";

test("sort price ascending", () => {
  const res = sortProducts([...SAMPLE], "priceAsc");
  const prices = res.map((p) => p.price);
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

test("sort rating descending", () => {
  const res = sortProducts([...SAMPLE], "ratingDesc");
  const ratings = res.map((p) => p.rating);
  const sorted = [...ratings].sort((a, b) => b - a);
  expect(ratings).toEqual(sorted);
});
