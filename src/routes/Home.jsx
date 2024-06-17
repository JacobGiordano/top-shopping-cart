import { Flex, Heading, Text } from "@radix-ui/themes";
import Testimonials from "../components/Testimonials";
import BestSellers from "../components/BestSellers";
import Categories from "../components/Categories";
import Guarantee from "../components/Guarantee";

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
          <Heading
            className='uncial-antiqua-regular uppercase py-2 md:py-5'
            size={{ initial: "8", sm: "9" }}
          >
            Gilded Gryphon
          </Heading>
          <Text>
            What adventures await <span className='italic'>you</span>?
          </Text>
        </div>
      </Flex>
      <BestSellers />
      <Categories />
      <Guarantee />
      <Testimonials />
    </Flex>
  );
}
export default Home;
