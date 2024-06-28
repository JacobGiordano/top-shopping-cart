import { render, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import ScrollLock from "../components/ScrollLock";

describe("ScrollLock Component", () => {
  beforeEach(() => {
    // Mock the window.scrollTo function
    window.scrollTo = (x, y) => {
      Object.defineProperty(window, "scrollX", { value: x, writable: true });
      Object.defineProperty(window, "scrollY", { value: y, writable: true });
      window.scrollX = x;
      window.scrollY = y;
    };
  });

  const simulateScroll = (x, y) => {
    window.scrollTo(x, y);
    window.dispatchEvent(new Event("scroll"));
  };

  const checkScrollPosition = (expectedX, expectedY) => {
    expect(window.scrollX).toBe(expectedX);
    expect(window.scrollY).toBe(expectedY);
  };

  it("locks the scroll when boolVal is true", async () => {
    render(<ScrollLock boolVal={true} />);

    await act(async () => {
      simulateScroll(0, 100);
    });

    // Check if scroll position is locked
    checkScrollPosition(0, 0);
  });

  it("unlocks the scroll when boolVal is false", async () => {
    render(<ScrollLock boolVal={false} />);

    await act(async () => {
      simulateScroll(0, 100);
    });

    // Check if scroll position is allowed to change
    checkScrollPosition(0, 100);
  });

  it("toggles scroll lock based on boolVal prop", async () => {
    const { rerender } = render(<ScrollLock boolVal={false} />);

    await act(async () => {
      simulateScroll(0, 100);
    });

    // Initially should be scrollable
    checkScrollPosition(0, 100);

    // Lock the scroll
    rerender(<ScrollLock boolVal={true} />);

    await act(async () => {
      simulateScroll(0, 200);
    });

    // Check if scroll position is locked
    checkScrollPosition(0, 100);

    // Unlock the scroll
    rerender(<ScrollLock boolVal={false} />);

    await act(async () => {
      simulateScroll(0, 200);
    });

    // Check if scroll position is allowed to change
    checkScrollPosition(0, 200);
  });
});
