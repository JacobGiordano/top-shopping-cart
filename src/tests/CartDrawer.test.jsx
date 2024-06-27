import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CartDrawer from "../components/CartDrawer";
import { MemoryRouter } from "react-router-dom";
import { createContext, useState } from "react";

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

const MockCartContext = createContext();

const MockCartProvider = ({ children, cart, setCart }) => (
  <MockCartContext.Provider value={{ cart, setCart }}>
    {children}
  </MockCartContext.Provider>
);

describe("CartDrawer Component", () => {
  const initialCart = [
    {
      id: 345098765432,
      title: "Potion of Healing",
      image: "/images/product-images/potion-of-healing.jpeg",
      price: 50,
      quantity: 1,
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
      quantity: 1,
      compare_at_price: 100,
      tags: ["elixirs", "strength", "consumables", "sale"],
      available: 8,
      handle: "elixir-of-strength",
    },
  ];

  const Wrapper = ({ children, cart, setCart }) => (
    <MemoryRouter>
      <MockCartProvider cart={cart} setCart={setCart}>
        {children}
      </MockCartProvider>
    </MemoryRouter>
  );

  let cartState;
  let setCartMock;

  beforeEach(() => {
    cartState = [...initialCart];
    setCartMock = vi.fn((newCart) => {
      cartState = newCart;
    });
    render(
      <Wrapper cart={cartState} setCart={setCartMock}>
        <CartDrawer
          cart={cartState}
          setCart={setCartMock}
          drawerIsOpen={true}
          setDrawerIsOpen={vi.fn()}
        />
      </Wrapper>
    );
  });

  it("renders cart items correctly", () => {
    initialCart.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("calculates total price correctly", () => {
    const totalPrice = initialCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    expect(screen.getByText("Subtotal:")).toBeInTheDocument();
    expect(screen.getByText(totalPrice.toLocaleString())).toBeInTheDocument();
  });

  it("removes item from cart on click", async () => {
    const removeButton = screen.getByTestId("remove-button-345098765432");

    console.log("Remove Button Found:", removeButton);

    await userEvent.click(removeButton);

    // Mock the state change by updating the cart
    const updatedCart = initialCart.filter((item) => item.id !== 345098765432);
    setCartMock(updatedCart);

    await waitFor(() => {
      console.log("Checking if 'Potion of Healing' is in the document...");
      expect(screen.queryByText("Potion of Healing")).not.toBeInTheDocument();
    });

    expect(setCartMock).toHaveBeenCalledWith(
      initialCart.filter((item) => item.id !== 345098765432)
    );
  });
});
