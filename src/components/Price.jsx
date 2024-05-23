import { Flex } from "@radix-ui/themes";
import Gem from "/src/assets/svg/gem.svg?react";

function Price({ children }) {
  return (
    <Flex gap='.5'>
      {children}
      <Gem className='w-4' />
    </Flex>
  );
}
export default Price;
