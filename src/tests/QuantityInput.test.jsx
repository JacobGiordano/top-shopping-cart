// src/tests/QuantityInput.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import QuantityInput from "../components/QuantityInput";
import { useOutletContext } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  useOutletContext: vi.fn(),
}));

describe("QuantityInput Component", () => {
  const mockContext = {
    cart: [{ id: 1, quantity: 2 }],
    setCart: vi.fn(),
  };

  beforeEach(() => {
    useOutletContext.mockReturnValue(mockContext);
  });

  it("renders correctly and allows quantity change", async () => {
    const product = { id: 1, available: 10 };
    render(<QuantityInput product={product} quantity={1} updateCart={true} />);

    const input = screen.getByRole("spinbutton");
    expect(input.value).toBe("1");

    await userEvent.clear(input);
    await userEvent.type(input, "5");
    expect(input.value).toBe("5");
  });

  it("prevents setting quantity above maximum", async () => {
    const product = { id: 1, available: 10 };
    render(<QuantityInput product={product} quantity={1} updateCart={true} />);

    const input = screen.getByRole("spinbutton");
    await userEvent.clear(input);
    await userEvent.type(input, "15");
    await userEvent.tab();
    expect(input.value).toBe("10");
  });

  it("prevents setting quantity below 1", async () => {
    const product = { id: 1, available: 10 };
    render(<QuantityInput product={product} quantity={1} updateCart={true} />);

    const input = screen.getByRole("spinbutton");
    await userEvent.clear(input);
    await userEvent.type(input, "0");
    await userEvent.tab();
    expect(input.value).toBe("1");
  });
});
