import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../routes/Home";
import { BrowserRouter } from "react-router-dom";

describe("Home Component", () => {
  // Only checking the hero banner because all child components
  // have their own tests
  it("renders the hero banner correctly", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Welcome, Dear Traveler, to/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Gilded Gryphon/i)[1]).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          content.includes("What adventures await") &&
          element.innerHTML.includes('<span class="italic">you</span>')
        );
      })
    ).toBeInTheDocument();
  });
});
