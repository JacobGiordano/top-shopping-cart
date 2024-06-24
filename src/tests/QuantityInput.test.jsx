import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import QuantityInput from "../components/QuantityInput";

describe("QuantityInput Component", () => {
  it("renders correctly and allows quantity change", () => {
    render(<QuantityInput initialQuantity={1} maxQuantity={10} />);

    const input = screen.getByRole("spinbutton");
    expect(input.value).toBe("1");

    userEvent.type(input, "{backspace}5");
    expect(input.value).toBe("5");
  });

  it("prevents setting quantity above maximum", () => {
    render(<QuantityInput initialQuantity={1} maxQuantity={10} />);

    const input = screen.getByRole("spinbutton");
    userEvent.type(input, "{backspace}15");
    expect(input.value).toBe("10");
  });
});
