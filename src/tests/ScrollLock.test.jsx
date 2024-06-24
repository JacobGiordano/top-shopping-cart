import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ScrollLock from "../components/ScrollLock";

describe("ScrollLock Component", () => {
  it("applies scroll lock when active", () => {
    render(<ScrollLock boolVal={true} />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("removes scroll lock when not active", () => {
    render(<ScrollLock boolVal={false} />);

    expect(document.body.style.overflow).toBe("");
  });
});
