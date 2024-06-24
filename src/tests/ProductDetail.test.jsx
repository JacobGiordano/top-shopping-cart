import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useOutletContext } from "react-router-dom";
import ProductDetail from "../routes/ProductDetail";
import { BrowserRouter as Router } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useOutletContext: vi.fn(),
}));

describe("ProductDetail Component", () => {
  const product = {
    id: 1,
    name: "Product 1",
    description: "A detailed description of product 1",
    price: 100,
    images: ["image1.jpg", "image2.jpg"],
    type: "Electronics",
    rarity: "Common",
    compare_at_price: 150,
  };

  it("renders product details correctly", () => {
    // useOutletContext.mockReturnValue({
    //   /* Mocked context value */
    // });

    render(
      <Router>
        <ProductDetail product={product} />
      </Router>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`${product.price}`)).toBeInTheDocument();
  });

  it("displays product images in a media gallery", () => {
    render(
      <Router>
        <ProductDetail product={product} />
      </Router>
    );

    product.images.forEach((src) => {
      expect(screen.getByAltText(src)).toBeInTheDocument();
    });
  });
});
