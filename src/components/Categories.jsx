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
            size={{ initial: "4", sm: "3" }}
            className='absolute left-0 bottom-0 bg-white/75 rounded-bl-md rounded-tr-md text-purple-900 p-1 px-2'
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
      gap={{ initial: "2", md: "4" }}
      direction={{ initial: "column", md: "row" }}
      className='pt-12'
    >
      <Box className='pb-4' width={{ initial: "auto", md: "50vw" }}>
        <Flex
          justify='center'
          align={{ initial: "center", md: "start" }}
          gap='2'
          direction='column'
        >
          <Text size='6'>Need to stock up?</Text>
          <Heading
            as='h2'
            weight='bold'
            size='8'
            className='uncial-antiqua-regular uppercase py-2 text-center'
          >
            We&apos;ve got your back!
          </Heading>
          <Text as='p'>
            Every adventurer is unique and every epic quest requires your best.
            Here at Gilded Gryphon we help you get back out there with the right
            gear, at affordable prices.
          </Text>
          <Text as='p'>
            From common potions to ultra-rare finds, we scour the known world —
            and beyond — just so we can offer only the best items your
            hard-earned coin can buy.
          </Text>
          <Text as='p'>
            Select a category and dive in, we&apos;re sure to have something for
            everyone! Don&apos;t see what you&apos;re looking for? Let us know!
          </Text>
        </Flex>
      </Box>
      <Grid
        columns={{ initial: "1", xs: "2", sm: "3", md: "2" }}
        gap='3'
        width={{ initial: "auto", md: "50vw" }}
        flow='row'
        className=''
      >
        {categoryCards}
      </Grid>
    </Flex>
  );
}
export default Categories;
