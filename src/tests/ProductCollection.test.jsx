import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProductCollection from "../routes/ProductCollection";

// Mock data for useOutletContext
const mockContext = {
  data: {
    products: [
      {
        id: 1,
        handle: "product-1",
        title: "Product 1",
        image: "/path/to/image1.jpg",
        price: "$10.00",
        compare_at_price: "$15.00",
        tags: ["category1", "category2"],
      },
      {
        id: 2,
        handle: "product-2",
        title: "Product 2",
        image: "/path/to/image2.jpg",
        price: "$20.00",
        compare_at_price: "$25.00",
        tags: ["category1"],
      },
    ],
  },
  headerRef: { current: { scrollIntoView: vi.fn() } }, // Mock headerRef
};

// Mock useOutletContext and useParams hooks
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => mockContext,
    useParams: () => ({ tags: "category1+category2" }), // Mock useParams to return a valid tags string
  };
});

describe("ProductCollection Component", () => {
  const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return render(
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={ui} />
        </Routes>
      </BrowserRouter>
    );
  };

  it("renders products correctly based on category", () => {
    renderWithRouter(<ProductCollection />, { route: "/some-path/category1" });

    // Check that products belonging to category1 are rendered
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("displays categories correctly", () => {
    renderWithRouter(<ProductCollection />, {
      route: "/some-path/category1+category2",
    });

    // Check that the categories are displayed correctly
    expect(screen.getByText("Category1 Category2")).toBeInTheDocument();

    // Check that products belonging to category1 and category2 are rendered
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
