import { Flex, Text } from "@radix-ui/themes";
import Carousel from "./Carousel";

function Testimonials({ tData }) {
  console.log(tData);

  const testimonialCards = tData.testimonials.map((data) => {
    return (
      <Flex
        key={data.reviewer}
        justify='center'
        align='center'
        gap='2'
        direction='column'
      >
        <Text>{data.testimonial}</Text>
        <Text>{data.product}</Text>
        <Text>{data.reviewer}</Text>
      </Flex>
    );
  });

  return <Carousel data={tData.testimonials}>{testimonialCards}</Carousel>;
}
export default Testimonials;
