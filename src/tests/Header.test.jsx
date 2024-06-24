import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  it("renders navigation links correctly", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const navLinks = screen.getAllByRole("link");
    expect(navLinks).toHaveLength(5);
  });
});
