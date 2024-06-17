import { Box, Heading, Flex, Text } from "@radix-ui/themes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import bestData from "../data/best-sellers.json";

function BestSellers() {
  const bestSellers = bestData.best_sellers.map((product) => {
    return (
      <SwiperSlide key={product.id}>
        <Link to={`/products/${product.handle}`} className='select-none'>
          <Flex className='flex flex-col justify-center items-center'>
            <img
              className='rounded-t-md'
              src={product.image}
              alt={product.name}
            />
            <Text
              size='4'
              className='p-2 bg-slate-700 w-full text-center text-gray-100 rounded-b-md'
            >
              {product.title}
            </Text>
          </Flex>
        </Link>
      </SwiperSlide>
    );
  });

  return (
    <Flex
      justify='center'
      align='center'
      gap='2'
      direction='column'
      className='pt-12'
    >
      <Box className='pb-4'>
        <Flex justify='center' align='center' gap='2' direction='column'>
          <Text size='6'>It&apos;s dangerous to go alone.</Text>
          <Heading
            as='h2'
            weight='bold'
            size='8'
            className='uncial-antiqua-regular uppercase text-center'
          >
            Take one of these
          </Heading>
        </Flex>
      </Box>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className='swiper best-sellers white-buttons'
      >
        {bestSellers}
      </Swiper>
    </Flex>
  );
}
export default BestSellers;
