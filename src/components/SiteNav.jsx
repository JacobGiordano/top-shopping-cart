import { Flex, Box, Popover, Text } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

function SiteNav() {
  return (
    <Box>
      <nav>
        <ul className='flex gap-4'>
          <li>
            <NavLink
              to='/collections/all'
              className={({ isActive }) =>
                isActive ? "text-purple-500 active" : "text-white-900"
              }
            >
              Shop All
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/collections/consumables'
              className={({ isActive }) =>
                isActive ? "text-purple-500 active" : "text-white-900"
              }
            >
              Consumables
            </NavLink>
          </li>
          <li>
            {/* <Popover> */}
            {/* <Popover.Trigger> */}
            <NavLink
              to='/collections/weapons'
              className={({ isActive }) =>
                isActive ? "text-purple-500 active" : "text-white-900"
              }
            >
              Weapons
            </NavLink>
            {/* </Popover.Trigger> */}
            {/* <Popover.Content width='360px'> */}
            {/* <ul></ul> */}
            {/* </Popover.Content> */}
            {/* </Popover> */}
          </li>
          <li>
            <NavLink
              to='/collections/armor'
              className={({ isActive }) =>
                isActive ? "text-purple-500 active" : "text-white-900"
              }
            >
              Armor
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/collections/wands'
              className={({ isActive }) =>
                isActive ? "text-purple-500 active" : "text-white-900"
              }
            >
              Wands
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/collections/relics'
              className={({ isActive }) =>
                isActive ? "text-purple-500 active" : "text-white-900"
              }
            >
              Relics
            </NavLink>
          </li>
          <li>
            <Popover.Root>
              <Popover.Trigger>
                <Text to='/collections/consumables'>Consumables</Text>
              </Popover.Trigger>
              <Popover.Content width='360px'>
                <Flex gap='3'>
                  <NavLink
                    to='/collections/potions'
                    className={({ isActive }) =>
                      isActive ? "text-purple-500 active" : "text-white-900"
                    }
                  >
                    Potions
                  </NavLink>
                </Flex>
              </Popover.Content>
            </Popover.Root>
          </li>
        </ul>
      </nav>
    </Box>
  );
}
export default SiteNav;
