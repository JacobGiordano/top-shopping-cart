import { Flex, Text } from "@radix-ui/themes";
import Testimonials from "../components/Testimonials";
import BestSellers from "../components/BestSellers";
import Categories from "../components/Categories";

function Home() {
  return (
    <Flex className='max-w-[1080px] m-auto p-0 pb-12 flex-col'>
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
      <BestSellers />
      <Categories />
      <Testimonials />
    </Flex>
  );
}
export default Home;
