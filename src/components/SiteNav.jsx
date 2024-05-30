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
                          ? "text-purple-500 active"
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
                ? "text-purple-500 active"
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
      <div className='site-nav-wrapper absolute -translate-x-8 md:relative md:translate-x-0 group'>
        <nav className='absolute -translate-x-full z-20 group-[.open]:translate-x-0 md:relative md:translate-x-0'>
          <ul className='flex gap-4 flex-col md:flex-row'>{nav}</ul>
        </nav>
      </div>
    </>
  );
}
export default SiteNav;
