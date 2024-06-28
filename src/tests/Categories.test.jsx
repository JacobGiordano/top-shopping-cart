import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Categories from "../components/Categories";
import data from "../data/categories.json";

describe("Categories Component", () => {
  it("renders categories correctly", async () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
  });
  it("shows the section header correctly", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
    expect(screen.getByText(/Need to stock up\?/i)).toBeInTheDocument();
  });
  it("renders category names correctly", async () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
    for (const category of data.categories) {
      // Using findByText to wait for the category text to appear
      expect(
        await screen.findByText((content) => content.includes(category.name))
      );
    }
  });
});
