import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductCollection from "../routes/ProductCollection";
import { BrowserRouter as Router } from "react-router-dom";
import products from "../data/products.json";
import categories from "../data/categories.json";

describe("ProductCollection Component", () => {
  it("renders products correctly based on category", () => {
    const selectedCategory = categories[0];

    render(
      <Router>
        <ProductCollection category={selectedCategory} />
      </Router>
    );

    const categoryProducts = products.filter(
      (product) => product.category === selectedCategory.id
    );
    categoryProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it("displays categories correctly", () => {
    render(
      <Router>
        <ProductCollection />
      </Router>
    );

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });
});
