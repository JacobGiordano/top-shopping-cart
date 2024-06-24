import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../routes/Home";
import { BrowserRouter as Router } from "react-router-dom";
import products from "../data/products.json";
import bestSellers from "../data/best-sellers.json";
import testimonials from "../data/testimonials.json";

describe("Home Component", () => {
  it("renders featured products correctly", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    products.slice(0, 5).forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it("displays best sellers section", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    bestSellers.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it("displays testimonials", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    testimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.author)).toBeInTheDocument();
      expect(screen.getByText(testimonial.content)).toBeInTheDocument();
    });
  });
});
