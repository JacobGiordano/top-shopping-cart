import { Link } from "react-router-dom";
import GitHubLogo from "/src/assets/svg/github-logo.svg?react";
import { Box, Text, Flex } from "@radix-ui/themes";

function Footer() {
  return (
    <footer className='bottom-0 border-t w-full py-2 box-border'>
      <Flex
        wrap='wrap'
        direction={{ initial: "column", xs: "row" }}
        justify={{ initial: "start", xs: "between" }}
        align={{ initial: "start", xs: "center" }}
      >
        <Link to='https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart'>
          View on The Odin Project
        </Link>
        <Link to='https://github.com/JacobGiordano/top-shopping-cart'>
          <Flex justify='end' align='center' gap='2'>
            <GitHubLogo className='w-6' />
            <Text>View on GitHub</Text>
          </Flex>
        </Link>
      </Flex>
    </footer>
  );
}
export default Footer;
