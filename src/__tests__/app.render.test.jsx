import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "../App";

test("renders Catalog and then products", async () => {
  render(<App />);

  expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();

  expect(
    await screen.findByText(/Catalog/i, {}, { timeout: 2000 })
  ).toBeInTheDocument();

  const cards = await screen.findAllByTestId(
    "product-card",
    {},
    { timeout: 2000 }
  );
  expect(cards.length).toBeGreaterThan(0);
});
