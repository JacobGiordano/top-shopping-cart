import { Flex, Popover, Text, Button } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import useRouteChange from "../hooks/useRouteChange"; // Import the custom hook

function SiteNav({ navData }) {
  const [openPopovers, setOpenPopovers] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false); // State to track .site-nav visibility

  const closeAllPopoversAndNav = useCallback(() => {
    console.log("Route changed, closing all popovers and nav");
    setOpenPopovers({});
    setIsNavOpen(false); // Close the .site-nav element
  }, []);

  useRouteChange(closeAllPopoversAndNav);

  const toggleMobileNav = () => {
    setIsNavOpen((prev) => !prev); // Toggle .site-nav visibility
  };

  const handlePopoverChange = (category, isOpen) => {
    console.log(`Popover ${category} is now ${isOpen ? "open" : "closed"}`);
    setOpenPopovers((prevState) => ({
      ...prevState,
      [category]: isOpen,
    }));
  };

  useEffect(() => {
    console.log("Open Popovers State:", JSON.stringify(openPopovers));
  }, [openPopovers]);

  const renderSubcategories = (subcategories) => (
    <Flex gap='3' direction='column'>
      {subcategories.map((subcategory) => (
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
      ))}
    </Flex>
  );

  const renderNav = (navigation) => (
    <ul className='flex gap-4 flex-col md:flex-row'>
      {navigation.map((navObj) => (
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
                {renderSubcategories(navObj.subcategories)}
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
      ))}
    </ul>
  );

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
      <div
        className={`site-nav-wrapper absolute z-10 bg-inherit -translate-x-8 md:relative md:translate-x-0 group ${
          isNavOpen ? "open" : ""
        }`}
      >
        <nav className='site-nav absolute -translate-x-full group-[.open]:translate-x-8 group-[.open]:translate-y-8 group-[.open]:p-4 rounded-lg md:relative md:group-[.open]:translate-x-0 md:translate-x-0 md:group-[.open]:translate-y-0 md:translate-y-0 md:group-[.open]:p-0 md:p-0 md:group-[.open]:bg-transparent md:bg-transparent'>
          {renderNav(navData.navigation)}
        </nav>
      </div>
    </>
  );
}

SiteNav.propTypes = {
  navData: PropTypes.object.isRequired,
};

export default SiteNav;
