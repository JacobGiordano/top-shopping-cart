import { Box, Flex, Switch } from "@radix-ui/themes";
import Moon from "/src/assets/svg/moon.svg?react";
import Sun from "/src/assets/svg/sun.svg?react";

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
    <header className='flex justify-between p-2'>
      Gilded Gryphon
      <Flex gap='2' align='center'>
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
