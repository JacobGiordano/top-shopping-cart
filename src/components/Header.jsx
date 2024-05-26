import { Flex, Switch } from "@radix-ui/themes";
import Moon from "/src/assets/svg/moon.svg?react";
import Sun from "/src/assets/svg/sun.svg?react";
import { Link } from "react-router-dom";

function Header() {
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
        <Link to='/'>Gilded Gryphon</Link>
        <Link to='/cart'>Cart</Link>
      </Flex>
      <Flex gap='2' justify='end' align='center'>
        <Sun className='w-4' />
        <Switch
          defaultChecked
          onClick={handleThemeToggleClick}
          size='1'
          className='hover:cursor-pointer'
        />
        <Moon className='w-3' />
      </Flex>
    </header>
  );
}
export default Header;
