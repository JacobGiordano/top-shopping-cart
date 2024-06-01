import { Flex, Box, Popover, Text, Button } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

function SiteNav({ navData }) {
  const toggleMobileNav = () => {
    document.querySelector(".site-nav-wrapper").classList.toggle("open");
  };

  const nav = navData.navigation.map((navObj) => {
    return (
      <li key={navObj.category}>
        {navObj.subcategories ? (
          <Popover.Root>
            <Popover.Trigger>
              <Text className='hover:cursor-pointer hover:text-purple-500'>
                {navObj.category}
              </Text>
            </Popover.Trigger>
            <Popover.Content width='360px'>
              <Flex gap='3' direction='column'>
                {navObj.subcategories.map((subcategory) => {
                  return (
                    <NavLink
                      key={subcategory.name}
                      to={subcategory.url}
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-500 border-b border-b-purple-600 active"
                          : "text-white-900 hover:text-purple-500"
                      }
                    >
                      {subcategory.name}
                    </NavLink>
                  );
                })}
              </Flex>
            </Popover.Content>
          </Popover.Root>
        ) : (
          <NavLink
            key={navObj.category}
            to={navObj.url}
            className={({ isActive }) =>
              isActive
                ? "text-purple-500 border-b border-b-purple-600 active"
                : "text-white-900 hover:text-purple-500"
            }
          >
            {navObj.category}
          </NavLink>
        )}
      </li>
    );
  });

  return (
    <>
      <Button
        highContrast
        className='md:hidden md:invisible hover:cursor-pointer'
        onClick={toggleMobileNav}
      >
        &equiv;
      </Button>
      <div className='site-nav-wrapper absolute z-10 bg-inherit -translate-x-8 md:relative md:translate-x-0 group'>
        <nav className='site-nav absolute -translate-x-full group-[.open]:translate-x-8 group-[.open]:translate-y-8 group-[.open]:p-4 group-[.open]:bg-zinc-900 rounded-lg      md:relative md:group-[.open]:translate-x-0 md:translate-x-0 md:group-[.open]:translate-y-0 md:translate-y-0 md:group-[.open]:p-0 md:p-0 md:group-[.open]:bg-transparent md:bg-transparent'>
          <ul className='flex gap-4 flex-col md:flex-row'>{nav}</ul>
        </nav>
      </div>
    </>
  );
}
export default SiteNav;
