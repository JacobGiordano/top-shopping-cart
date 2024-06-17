import { Flex } from "@radix-ui/themes";
import Coins from "/src/assets/svg/coins.svg?react";
import PropTypes from "prop-types";

function Price({ children }) {
  return (
    <Flex gap='2'>
      {children}
      <Coins className='w-4 -ml-1.5'></Coins>
    </Flex>
  );
}

Price.propTypes = {
  children: PropTypes.node,
};

export default Price;
