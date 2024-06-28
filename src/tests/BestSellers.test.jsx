import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import BestSellers from "../components/BestSellers";
import data from "../data/best-sellers.json";

describe("BestSellers Component", () => {
  it("renders best sellers correctly", async () => {
    render(
      <BrowserRouter>
        <BestSellers />
      </BrowserRouter>
    );
  });
  it("shows the section header correctly", () => {
    render(
      <BrowserRouter>
        <BestSellers />
      </BrowserRouter>
    );
    expect(screen.getByText(/Take one of these/i)).toBeInTheDocument();
  });
  it("renders category names correctly", async () => {
    render(
      <BrowserRouter>
        <BestSellers />
      </BrowserRouter>
    );
    for (const obj of data.best_sellers) {
      // Using findByText to wait for the best seller product text to appear
      expect(await screen.findByText((content) => content.includes(obj.title)));
    }
  });
});
