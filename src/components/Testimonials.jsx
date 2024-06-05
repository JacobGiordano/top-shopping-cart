import { Flex, Heading, Text } from "@radix-ui/themes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination, Navigation } from "swiper/modules";
import tData from "../data/testimonials.json";

function Testimonials() {
  console.log(tData);

  const testimonialCards = tData.testimonials.map((data) => {
    return (
      <SwiperSlide key={data.product}>
        <Flex
          justify='center'
          align='center'
          gap='4'
          direction='column'
          className='w-[80%] max-w-[700px]'
        >
          <Text className='text-xl'>&quot;{data.testimonial}&quot;</Text>
          <Text className='text-lg'>{data.product}</Text>
          <Text className='text-sm italic'>{data.reviewer}</Text>
        </Flex>
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
      <Heading as='h2' className='uncial-antiqua-regular uppercase py-2'>
        What others are saying
      </Heading>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Keyboard, Pagination, Navigation]}
        className='swiper testimonials'
      >
        {testimonialCards}
      </Swiper>
    </Flex>
  );
}
export default Testimonials;
