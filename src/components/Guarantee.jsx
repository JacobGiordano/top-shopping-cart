import { Box, Flex, Heading, Text } from "@radix-ui/themes";

function Guarantee() {
  return (
    <Flex
      className='relative mt-12 text-center md:text-right'
      justify={{ initial: "center", sm: "end" }}
      align='center'
    >
      <Flex
        justify='center'
        align={{ initial: "center", sm: "end" }}
        direction='column'
        className='text-white z-10 absolute p-12 lg:max-w-[75%]'
      >
        <Heading
          as='h3'
          align={{ initial: "center", sm: "right" }}
          weight='medium'
          className='text-lg sm:text-xl md:text-2xl lg:text-3xl'
        >
          Your coin well-spent with the
        </Heading>
        <Heading
          as='h2'
          className='uncial-antiqua-regular uppercase py-2 md:py-5 text-xl sm:text-3xl md:text-4xl lg:text-5xl w-full'
          align={{ initial: "center", sm: "right" }}
        >
          Gryphon Guarantee
        </Heading>
        <Text
          as='p'
          className='md:max-w-[75%] sm:text-lg md:text-xl lg:text-2xl'
        >
          If you aren&apos;t completely satisfied with your purchase, contact us
          for a full refund.
        </Text>
        <Text
          as='p'
          className='pt-6 md:max-w-[75%] sm:text-lg md:text-xl lg:text-2xl'
        >
          No questions asked.
        </Text>
      </Flex>
      <Box className='absolute left-0 top-0 z-0 bg-slate-950/50 w-full h-full'></Box>
      <img className='' src='/images/store-images/epic-battle.jpg'></img>
    </Flex>
  );
}
export default Guarantee;
