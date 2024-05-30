import { NavLink } from "react-router-dom";
import { Flex, Switch, Text } from "@radix-ui/themes";
import Moon from "/src/assets/svg/moon.svg?react";
import Sun from "/src/assets/svg/sun.svg?react";
import SiteNav from "./SiteNav";
import navData from "../data/navigation.json";
import CartIcon from "/src/assets/svg/cart.svg?react";

function Header({ cart }) {
  const handleThemeToggleClick = () => {
    const themeEl = document.querySelector(".radix-themes");
    const innerWrapper = document.querySelector(".theme-inner-wrapper");
    if (themeEl.classList.contains("dark")) {
      themeEl.classList.remove("dark");
      innerWrapper.classList.remove("bg-slate-950");
    } else {
      themeEl.classList.add("dark");
      innerWrapper.classList.add("bg-slate-950");
    }
  };

  return (
    <header className='flex justify-between flex-col p-2 gap-2'>
      <Flex justify='between' align='center'>
        <NavLink to='/'>Gilded Gryphon</NavLink>
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
