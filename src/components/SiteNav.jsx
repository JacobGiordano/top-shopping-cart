import { Flex, Box, Popover, Text } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

function SiteNav({ navData }) {
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
    <Box>
      <nav>
        <ul className='flex gap-4'>{nav}</ul>
      </nav>
    </Box>
  );
}
export default SiteNav;
