import { render, screen } from "@testing-library/react";
import App from "../App";
import { expect, test } from "vitest";

test("renders Catalog and then products", async () => {
  render(<App />);

  expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();

  expect(
    await screen.findByText(/Catalog/i, {}, { timeout: 1000 })
  ).toBeInTheDocument();

  const cards = await screen.findAllByTestId("product-card");
  expect(cards.length).toBeGreaterThan(0);
});
