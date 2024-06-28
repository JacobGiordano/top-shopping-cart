import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import navData from "../data/navigation.json";

// Mock useLocation
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("Header Component", () => {
  const mockLocation = {
    pathname: "/some-path",
  };

  const mockSetDrawerIsOpen = vi.fn();

  it("renders navigation links correctly", () => {
    render(
      <BrowserRouter>
        <Header
          cart={[]}
          drawerIsOpen={false}
          setDrawerIsOpen={mockSetDrawerIsOpen}
          location={mockLocation}
        />
      </BrowserRouter>
    );

    const navLinks = screen.getAllByRole("link");
    expect(navLinks).toHaveLength(3);
  });

  it("renders SiteNav with correct props", () => {
    render(
      <BrowserRouter>
        <Header
          cart={[]}
          drawerIsOpen={false}
          setDrawerIsOpen={mockSetDrawerIsOpen}
          location={mockLocation}
        />
      </BrowserRouter>
    );

    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
    navData.navigation.forEach((item) => {
      expect(screen.getByText(item.category)).toBeInTheDocument();
    });
  });
});
