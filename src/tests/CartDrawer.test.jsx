import {
  render,
  screen,
  fireEvent,
  waitFor,
  rerender,
} from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
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
      console.log("Updated Cart:", newCart);
    });
  });

  it("renders cart items correctly", () => {
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
    initialCart.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("calculates total price correctly", () => {
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
    const totalPrice = initialCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    expect(screen.getByText("Subtotal:")).toBeInTheDocument();
    expect(screen.getByText(totalPrice.toLocaleString())).toBeInTheDocument();
  });

  it("removes an item from the cart when the remove button is clicked", async () => {
    const { rerender } = render(
      <Wrapper cart={cartState} setCart={setCartMock}>
        <CartDrawer
          cart={cartState}
          setCart={setCartMock}
          drawerIsOpen={true}
          setDrawerIsOpen={vi.fn()}
        />
      </Wrapper>
    );

    // Verify initial state
    expect(screen.getByText("Potion of Healing")).toBeInTheDocument();
    expect(screen.getByText("Elixir of Strength")).toBeInTheDocument();

    const removeButton = screen.getByTestId("remove-button-345098765432");
    fireEvent.click(removeButton);

    // Rerender the component after the state change
    rerender(
      <Wrapper cart={cartState} setCart={setCartMock}>
        <CartDrawer
          cart={cartState}
          setCart={setCartMock}
          drawerIsOpen={true}
          setDrawerIsOpen={vi.fn()}
        />
      </Wrapper>
    );

    // Verify state after removal
    await waitFor(() => {
      expect(setCartMock).toHaveBeenCalledTimes(1);
      expect(setCartMock).toHaveBeenCalledWith([
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
      ]);
    });

    // Verify final state
    await waitFor(() => {
      expect(screen.queryByText("Potion of Healing")).not.toBeInTheDocument();
      expect(screen.getByText("Elixir of Strength")).toBeInTheDocument();
    });
  });
});
