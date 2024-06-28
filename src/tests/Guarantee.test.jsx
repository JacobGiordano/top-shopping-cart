import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Guarantee from "../components/Guarantee";

describe("Guarantee Component", () => {
  it("renders guarantee section correctly", () => {
    render(<Guarantee />);

    expect(screen.getByText("Gryphon Guarantee")).toBeInTheDocument();
  });
});
