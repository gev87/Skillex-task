import { vi, beforeAll, afterAll } from "vitest";
import { SAMPLE } from "../__tests__/fixtures"; 
import "@testing-library/jest-dom/vitest";


let fetchSpy;

beforeAll(() => {
  fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation((url) => {
    const href = String(url);
    if (href.endsWith("products.json") || href.endsWith("/products.json")) {
      const body = JSON.stringify(SAMPLE);
      return Promise.resolve(
        new Response(body, {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
    return Promise.reject(new Error("Unknown fetch URL: " + href));
  });
});

afterAll(() => {
  fetchSpy?.mockRestore?.();
});
