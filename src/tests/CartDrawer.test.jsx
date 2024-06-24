import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import CartDrawer from "../components/CartDrawer";
import { createContext } from "react";

const MockCartContext = createContext();

const MockCartProvider = ({ children, cart }) => (
  <MockCartContext.Provider value={{ cart }}>
    {children}
  </MockCartContext.Provider>
);

describe("CartDrawer Component", () => {
  const cart = [
    {
      id: 345098765432,
      title: "Potion of Healing",
      image: "/images/product-images/potion-of-healing.jpeg",
      price: 50,
      compare_at_price: 50,
      tags: ["potions", "healing", "consumables"],
      available: 10,
      handle: "potion-of-healing",
    },
    {
      id: 234567890123,
      title: "Elixir of Strength",
      image: "/images/product-images/elixir-of-strength.jpeg",
      price: 90,
      compare_at_price: 100,
      tags: ["elixirs", "strength", "consumables", "sale"],
      available: 8,
      handle: "elixir-of-strength",
    },
  ];

  beforeEach(() => {
    render(
      // <MockCartProvider cart={cart}>
      <CartDrawer cart={cart} />
      // {/* </MockCartProvider> */}
    );
  });

  it("renders cart items correctly", () => {
    cart.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("calculates total price correctly", () => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    expect(screen.getByText(`Total: ${totalPrice}`)).toBeInTheDocument();
  });

  it("removes item from cart on click", async () => {
    const removeButton = screen.getAllByRole("button", { name: /remove/i })[0];
    await userEvent.click(removeButton);
    expect(screen.queryByText("Potion of Healing")).not.toBeInTheDocument();
  });
});
