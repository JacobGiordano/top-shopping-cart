import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Price from "../components/Price";
import { Text } from "@radix-ui/themes";

describe("Price Component", () => {
  it("displays price correctly", () => {
    render(
      <Price>
        <Text as='p' size='3' weight='medium' mr='.5'>
          250
        </Text>
      </Price>
    );

    expect(screen.getByText("250")).toBeInTheDocument();
  });
});
