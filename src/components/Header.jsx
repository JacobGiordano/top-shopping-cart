import { NavLink } from "react-router-dom";
import { Box, Flex, Switch, Text } from "@radix-ui/themes";
import Moon from "/src/assets/svg/moon.svg?react";
import Sun from "/src/assets/svg/sun.svg?react";
import SiteNav from "./SiteNav";
import navData from "../data/navigation.json";
import CartIcon from "/src/assets/svg/cart.svg?react";
import Gryphon from "/src/assets/svg/gryphon.svg?react";

function Header({ cart }) {
  const handleThemeToggleClick = () => {
    const body = document.querySelector("body");
    const themeEl = document.querySelector(".radix-themes");
    const themeInnerWrapper = document.querySelector(".theme-inner-wrapper");
    const nav = document.querySelector(".site-nav");
    body.classList.toggle("light");
    themeEl.classList.toggle("dark");
    themeInnerWrapper.classList.toggle("bg-slate-950");
    nav.classList.toggle("group-[.open]:bg-zinc-900");
    nav.classList.toggle("group-[.open]:bg-white");
  };

  return (
    <header className='flex justify-between flex-col p-2 gap-2 group'>
      <Flex justify='between' align='center'>
        <NavLink to='/'>
          <Flex justify='start' align='center' gap='2'>
            <Gryphon className='w-6' />
            <Text className='uncial-antiqua-regular uppercase pt-1'>
              Gilded Gryphon
            </Text>
          </Flex>
        </NavLink>
        <NavLink to='/cart'>
          <Flex gap='1' justify='center' align='center'>
            <CartIcon width='21' />
            <Text size='2'>{cart.length}</Text>
          </Flex>
        </NavLink>
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
    </header>
  );
}
export default Header;
