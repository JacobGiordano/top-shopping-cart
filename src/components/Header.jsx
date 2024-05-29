import { NavLink } from "react-router-dom";
import { Flex, Switch, Text } from "@radix-ui/themes";
import Moon from "/src/assets/svg/moon.svg?react";
import Sun from "/src/assets/svg/sun.svg?react";
import SiteNav from "./SiteNav";
import navData from "../data/navigation.json";

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
          Cart
          <Text> {cart.length}</Text>
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
