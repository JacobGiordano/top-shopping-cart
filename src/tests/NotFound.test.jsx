import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFound from "../components/NotFound";

describe("NotFound Component", () => {
  it("renders not found page correctly", () => {
    render(<NotFound />);

    expect(
      screen.getByText(/Looks like this page was whisked away into a portal./i)
    ).toBeInTheDocument();
  });
});
