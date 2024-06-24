import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MediaGallery from "../components/MediaGallery";

describe("MediaGallery Component", () => {
  const product = {
    id: 345098765432,
    title: "Potion of Healing",
    type: "consumable",
    price: 50,
    compare_at_price: 50,
    description:
      "Feeling down in the dumps after tangling with some pesky goblins? Fear not! This magical elixir, lovingly brewed by mystical apothecaries, will patch you right up and have you back in the fight in no time. Just a sip, and voila! Good as new!",
    image: "/images/product-images/potion-of-healing.jpeg",
    tags: ["potions", "healing", "consumables"],
    rarity: "very common",
    duration: null,
    available: 10,
    handle: "potion-of-healing",
  };

  it("displays media gallery correctly", () => {
    render(<MediaGallery product={product} />);
  });
});
