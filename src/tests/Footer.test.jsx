import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Footer from "../components/Footer";

describe("Footer Component", () => {
  it("renders footer content correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/View on The Odin Project/i)).toBeInTheDocument();
    expect(screen.getByText(/View on Github/i)).toBeInTheDocument();
  });
});
