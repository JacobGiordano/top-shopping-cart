import { Box, Heading, Flex, Grid, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import catData from "../data/categories.json";

function Categories() {
  const categoryCards = catData.categories.map((cat) => {
    return (
      <Link to={cat.url} key={cat.name}>
        <Flex className='flex flex-col justify-center items-center gap-4 relative'>
          <img className='rounded-md' src={cat.image} alt={cat.name} />
          <Text
            size={{ initial: "3", sm: "5" }}
            className='absolute left-0 bottom-0 bg-white/75 rounded-bl-md rounded-tr-md text-purple-900 p-1 sm:p-2'
          >
            {cat.name}
          </Text>
        </Flex>
      </Link>
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
          <Text size='6'>Need to stock up?</Text>
          <Heading
            as='h2'
            weight='bold'
            size='7'
            className='uncial-antiqua-regular uppercase py-2'
          >
            We&apos;ve got your back!
          </Heading>
        </Flex>
      </Box>
      <Grid
        columns={{ initial: "1", xs: "2", sm: "3" }}
        gap='3'
        width='auto'
        flow='row'
      >
        {categoryCards}
      </Grid>
    </Flex>
  );
}
export default Categories;
