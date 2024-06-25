// src/tests/ProductDetail.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter, useOutletContext, useParams } from "react-router-dom";
import ProductDetail from "../routes/ProductDetail";

// Mock react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: vi.fn(),
    useParams: vi.fn(),
  };
});

describe("ProductDetail Component", () => {
  const product = {
    id: 345098765432,
    title: "Potion of Healing",
    type: "consumable",
    price: 50,
    compare_at_price: 50,
    description:
      "Feeling down in the dumps after tangling with some pesky goblins? Fear not! This magical elixir, lovingly brewed by mystical apothecaries, will patch you right up and have you back in the fight in no time. Just a sip, and voila! Good as new!",
    image: "/images/product-images/potion-of-healing.jpeg", // Single image property
    tags: ["potions", "healing", "consumables"],
    rarity: "very common",
    duration: null,
    available: 10,
    handle: "potion-of-healing",
  };

  const context = {
    data: { products: [product] },
    cart: [],
    setCart: vi.fn(),
    drawerIsOpen: false,
    setDrawerIsOpen: vi.fn(),
  };

  beforeEach(() => {
    vi.mocked(useOutletContext).mockReturnValue(context);
    vi.mocked(useParams).mockReturnValue({ handle: "potion-of-healing" });
  });

  it("renders product details correctly", () => {
    render(
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    );

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`${product.price}`)).toBeInTheDocument();
  });

  it("displays product images in a media gallery", () => {
    render(
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    );

    // Check for the single image with the correct alt text
    expect(screen.getByAltText(product.title)).toBeInTheDocument();
  });
});
