import { NavLink } from "react-router-dom";
import { Flex, Switch, Text } from "@radix-ui/themes";
import Moon from "/src/assets/svg/moon.svg?react";
import Sun from "/src/assets/svg/sun.svg?react";
import SiteNav from "./SiteNav";
import navData from "../data/navigation.json";
import CartIcon from "/src/assets/svg/cart.svg?react";
import Gryphon from "/src/assets/svg/gryphon.svg?react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, forwardRef } from "react";

const Header = forwardRef(function Header(
  { cart, drawerIsOpen, setDrawerIsOpen, location },
  ref
) {
  const handleThemeToggleClick = () => {
    const body = document.querySelector("body");
    const themeEl = document.querySelector(".radix-themes");
    body.classList.toggle("light");
    themeEl.classList.toggle("dark");
  };

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();
    if (current > previous && current > ref.current.clientHeight) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleCartClick = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <motion.header
      className='sticky top-0 flex justify-between flex-col py-2 gap-2 group border-b z-50'
      variants={{
        visible: {
          y: 0,
        },
        hidden: {
          y: "-100%",
        },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      ref={ref}
    >
      <Flex justify='between' align='center'>
        <NavLink to='/'>
          <Flex justify='start' align='center' gap='2'>
            <Gryphon className='w-6' />
            <Text className='uncial-antiqua-regular uppercase pt-1'>
              Gilded Gryphon
            </Text>
          </Flex>
        </NavLink>
        <Flex
          className={
            location.pathname !== "/cart" ? "hover:cursor-pointer" : "disabled"
          }
          gap='1'
          justify='center'
          align='center'
          onClick={location.pathname !== "/cart" ? handleCartClick : undefined}
        >
          <CartIcon width='21' />
          <Text size='2'>{cart.length}</Text>
        </Flex>
      </Flex>
      <Flex gap='2' justify='between' align='center'>
        <SiteNav navData={navData} />
        <Flex gap='2' justify='between' align='center'>
          <Sun className='w-4' />
          <Switch
            defaultChecked
            onClick={handleThemeToggleClick}
            size='1'
            className='hover:cursor-pointer'
          />
          <Moon className='w-3' />
        </Flex>
      </Flex>
    </motion.header>
  );
});
export default Header;
