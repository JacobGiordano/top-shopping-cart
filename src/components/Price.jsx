import { Flex } from "@radix-ui/themes";
import Gem from "/src/assets/svg/gem.svg?react";
import Coins from "/src/assets/svg/coins.svg?react";

function Price({ children }) {
  return (
    <Flex gap='2'>
      {children}
      {/* <Gem className='w-4 -ml-1.5'></Gem> */}
      <Coins className='w-4 -ml-1.5'></Coins>
    </Flex>
  );
}
export default Price;
