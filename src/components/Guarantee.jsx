import { Box, Flex, Heading } from "@radix-ui/themes";

function Guarantee() {
  return (
    <Flex className='relative mt-12 min-h-96 bg-cover bg-[url("/images/store-images/epic-battle.jpg")]'>
      <Heading className='text-white z-5'>Something here</Heading>
      <Box className='absolute z-0 bg-black/25 w-full h-full'></Box>
    </Flex>
  );
}
export default Guarantee;
