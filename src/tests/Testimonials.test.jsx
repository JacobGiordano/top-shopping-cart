import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import data from "../data/testimonials.json";
import Testimonials from "../components/Testimonials";

describe("Testimonials Component", () => {
  it("renders testimonials correctly", async () => {
    render(
      <BrowserRouter>
        <Testimonials />
      </BrowserRouter>
    );
  });
  it("shows the section header correctly", () => {
    render(
      <BrowserRouter>
        <Testimonials />
      </BrowserRouter>
    );
    expect(screen.getByText(/What others are saying/i)).toBeInTheDocument();
  });
  it("renders category names correctly", async () => {
    render(
      <BrowserRouter>
        <Testimonials />
      </BrowserRouter>
    );
    for (const obj of data.testimonials) {
      // Using findByText to wait for the testimonial text to appear
      expect(
        await screen.findByText((content) => content.includes(obj.testimonial))
      );
    }
  });
});
