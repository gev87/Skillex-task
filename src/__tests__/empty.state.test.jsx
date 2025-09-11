import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { expect, test } from "vitest";

test("shows empty state when filters match nothing", async () => {
  render(<App />);
  const anyCard = await screen.findAllByTestId("product-card");
  expect(anyCard.length).toBeGreaterThan(0);

  const search = screen.getByPlaceholderText(/Search products or brands/i);
  fireEvent.change(search, { target: { value: "zzzzzzzzz" } });

  await new Promise((r) => setTimeout(r, 1000));

  expect(await screen.findByText(/No products found/i)).toBeInTheDocument();
});
