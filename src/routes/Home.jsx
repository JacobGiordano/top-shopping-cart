import { Box, Heading, Flex, Text } from "@radix-ui/themes";
import { Link, useOutletContext } from "react-router-dom";
import Testimonials from "../components/Testimonials";

function Home() {
  const context = useOutletContext();
  // console.log(context.cart);
  console.log(context.testimonials);

  return (
    <Flex className='max-w-[1080px] m-auto p-0 flex-col'>
      <Flex className='relative' justify='center' align='center'>
        <img
          src='/images/store-images/homepage-banner.jpg'
          alt="An image depicting an alchemist's shop filled with magical items."
        />
        <div className='absolute text-center text-white'>
          <Text className='md:text-xl'>Welcome, Dear Traveler, to</Text>
          <h1 className='uncial-antiqua-regular uppercase py-2 md:py-5 text-3xl md:text-5xl'>
            Gilded Gryphon
          </h1>
          <Text>
            What adventures await <span className='italic'>you</span>?
          </Text>
        </div>
      </Flex>
      <Flex
        justify='center'
        align='center'
        gap='2'
        direction='column'
        className='py-5'
      >
        <Box>
          <Flex justify='center' align='center' gap='2' direction='column'>
            <Text>It&apos;s dangerous to go alone.</Text>
            <Text weight='bold' size='5'>
              Take one of these
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex justify='center' align='center' gap='2'>
            <Link to='/collections/consumables'>
              <Flex justify='center' align='center' gap='2' direction='column'>
                <img src='/images/store-images/consumables.jpg' alt='' />
                <Text>Consumables</Text>
              </Flex>
            </Link>
            <Link to='/collections/weapons'>
              <Flex justify='center' align='center' gap='2' direction='column'>
                <img src='/images/store-images/weapons.jpg' alt='' />
                <Text>Weapons</Text>
              </Flex>
            </Link>
            <Link to='/collections/armor'>
              <Flex justify='center' align='center' gap='2' direction='column'>
                <img src='/images/store-images/armor.jpg' alt='' />
                <Text>Armor</Text>
              </Flex>
            </Link>
            <Link to='/collections/relics'>
              <Flex justify='center' align='center' gap='2' direction='column'>
                <img src='/images/store-images/relics.jpg' alt='' />
                <Text>Relics</Text>
              </Flex>
            </Link>
            <Link to='/collections/utilities'>
              <Flex justify='center' align='center' gap='2' direction='column'>
                <img src='/images/store-images/utilities.jpg' alt='' />
                <Text>Utilities</Text>
              </Flex>
            </Link>
          </Flex>
        </Box>
      </Flex>
      <Flex justify='center' align='center' gap='2' direction='column'>
        <Heading>What others are saying</Heading>
        <Testimonials tData={context.testimonials} />
      </Flex>
    </Flex>
  );
}
export default Home;
