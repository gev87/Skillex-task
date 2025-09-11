// src/__tests__/filterpanel.interaction.test.jsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import FilterPanel from "../components/FilterPanel";

test("debounced search updates parent", async () => {
  vi.useFakeTimers();

  const availableOptions = {
    categories: ["Electronics", "Clothing"],
    brands: ["Brand A", "Brand E"],
    minPrice: 0,
    maxPrice: 1000,
  };
  const selectedOptions = {
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    search: "",
  };
  const onSelectedOptionsChange = vi.fn();

  render(
    <FilterPanel
      availableOptions={availableOptions}
      selectedOptions={selectedOptions}
      onSelectedOptionsChange={onSelectedOptionsChange}
      isOpen
      onClose={() => {}}
    />
  );

  const input = screen.getByPlaceholderText(/Search products or brands/i);

  await act(async () => {
    fireEvent.change(input, { target: { value: "phone" } });
    vi.advanceTimersByTime(400);
  });

  expect(onSelectedOptionsChange).toHaveBeenCalled();

  vi.useRealTimers();
});
