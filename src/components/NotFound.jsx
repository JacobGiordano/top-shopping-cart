import { Box, Flex, Heading, Text } from "@radix-ui/themes";

function NotFound() {
  return (
    <Box>
      <Flex direction={{ xs: "column" }} gap='5'>
        <Heading as='h2'>Uh oh!</Heading>
        <Heading as='h3'>
          Looks like this page was whisked away into a portal.
        </Heading>
        <Text as='p'>That&apos;s embarressing</Text>
      </Flex>
    </Box>
  );
}
export default NotFound;
