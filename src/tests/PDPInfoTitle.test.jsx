import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PDPInfoTitle from "../components/PDPInfoTitle";

describe("PDPInfoTitle Component", () => {
  it("renders product title correctly", () => {
    render(<PDPInfoTitle text='Product Title' />);

    expect(screen.getByText(/Product Title/i)).toBeInTheDocument();
  });
});
