import { Flex, Popover, Text, Button } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function SiteNav({ navData, popoverKey }) {
  // Add popoverKey prop
  const [openPopovers, setOpenPopovers] = useState({});

  useEffect(() => {
    // Close all popovers when popoverKey changes
    setOpenPopovers({});
  }, [popoverKey]);

  const toggleMobileNav = () => {
    document.querySelector(".site-nav-wrapper").classList.toggle("open");
  };

  const handlePopoverChange = (category, isOpen) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [category]: isOpen,
    }));
  };

  const nav = navData.navigation.map((navObj) => {
    return (
      <li key={navObj.category}>
        {navObj.subcategories ? (
          <Popover.Root
            open={openPopovers[navObj.category] || false}
            onOpenChange={(isOpen) =>
              handlePopoverChange(navObj.category, isOpen)
            }
          >
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
                ? "nav-link text-purple-500 border-b border-b-purple-600 active"
                : "nav-link text-white-900 hover:text-purple-500"
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
        variant='outline'
        highContrast
        className='mobile-nav-btn md:hidden md:invisible hover:cursor-pointer'
        onClick={toggleMobileNav}
      >
        &equiv;
      </Button>
      <div className='site-nav-wrapper absolute z-10 bg-inherit -translate-x-8 md:relative md:translate-x-0 group'>
        <nav className='site-nav absolute -translate-x-full group-[.open]:translate-x-8 group-[.open]:translate-y-8 group-[.open]:p-4 rounded-lg  md:relative md:group-[.open]:translate-x-0 md:translate-x-0 md:group-[.open]:translate-y-0 md:group-[.open]:p-0 md:p-0 md:group-[.open]:bg-transparent md:bg-transparent'>
          <ul className='flex gap-4 flex-col md:flex-row'>{nav}</ul>
        </nav>
      </div>
    </>
  );
}

SiteNav.propTypes = {
  navData: PropTypes.object,
  popoverKey: PropTypes.number.isRequired, // Add prop type
};

export default SiteNav;
