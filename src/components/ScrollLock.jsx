import { useState, useEffect, useRef } from "react";

const ScrollLock = ({ boolVal }) => {
  const isScrollLocked = boolVal;
  const scrollPosition = useRef({ top: 0, left: 0 });

  useEffect(() => {
    if (isScrollLocked) {
      // Capture the current scroll position once when locking
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      scrollPosition.current = { top: scrollTop, left: scrollLeft };

      // Function to prevent scrolling
      const preventScroll = () => {
        window.scrollTo(
          scrollPosition.current.left,
          scrollPosition.current.top
        );
      };

      // Add event listeners to prevent scrolling
      window.addEventListener("scroll", preventScroll, { passive: false });
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });

      // Prevent arrow keys scrolling
      const preventArrowKeys = (e) => {
        if ([37, 38, 39, 40].includes(e.keyCode)) {
          e.preventDefault();
          window.scrollTo(
            scrollPosition.current.left,
            scrollPosition.current.top
          );
        }
      };
      window.addEventListener("keydown", preventArrowKeys, { passive: false });

      return () => {
        // Cleanup: Remove event listeners when unlocking
        window.removeEventListener("scroll", preventScroll);
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", preventArrowKeys);
      };
    }
  }, [isScrollLocked]);

  return <></>;
};

export default ScrollLock;
