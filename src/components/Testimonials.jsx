import { Flex, Text } from "@radix-ui/themes";
import Carousel from "./Carousel";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

function Testimonials({ tData }) {
  console.log(tData);

  const testimonialCards = tData.testimonials.map((data) => {
    return (
      <SwiperSlide key={data.product}>
        <Flex
          justify='center'
          align='center'
          gap='4'
          direction='column'
          className='max-w-[700px]'
        >
          <Text className='text-2xl'>&quot;{data.testimonial}&quot;</Text>
          <Text className='text-lg'>{data.product}</Text>
          <Text className='text-sm italic'>{data.reviewer}</Text>
        </Flex>
      </SwiperSlide>
    );
  });

  return <Carousel data={tData.testimonials}>{testimonialCards}</Carousel>;
}
export default Testimonials;
