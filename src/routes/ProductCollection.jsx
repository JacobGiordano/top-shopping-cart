import { useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import {
  Text,
  Box,
  Card,
  Inset,
  Flex,
  Grid,
  Container,
  Heading,
  Reset,
  Badge,
} from "@radix-ui/themes";
import NotFound from "../components/NotFound";
import Price from "../components/Price";

function ProductCollection() {
  const context = useOutletContext();
  const data = context.data;
  const headerRef = context.headerRef;
  const { tags } = useParams();
  const splitTags = tags.split("+");
  let collectionTitle = "";
  let matches = [];

  useEffect(() => {
    setTimeout(() => {
      if (headerRef.current) {
        headerRef.current.scrollIntoView();
      }
    }, 0);
  }, [headerRef]);

  if (tags == "all") {
    matches = data.products;
    collectionTitle = "All Products";
  } else {
    matches = data.products.filter((product) => {
      return product.tags.some((tag) => splitTags.includes(tag));
    });
    collectionTitle = splitTags
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
  }
  const cards = matches.map((match) => {
    return (
      <Box key={match.id}>
        <Reset>
          <Link to={`/products/${match.handle}`}>
            <Card size='2'>
              <Inset clip='padding-box' side='top' pb='current'>
                <img
                  src={match.image}
                  alt={match.title}
                  style={{
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                    height: "auto",
                    backgroundColor: "var(--gray-5)",
                  }}
                />
              </Inset>
              <Text as='p' className='text-med md:text-lg'>
                {match.title}
              </Text>
              <Flex gap='2' className='items-baseline flex-wrap'>
                <Price>
                  <Text as='p' className='text-med md:text-lg'>
                    {match.price}
                  </Text>
                </Price>
                {match.price < match.compare_at_price && (
                  <>
                    <Price>
                      <Text
                        as='p'
                        style={{ textDecoration: "line-through" }}
                        className='text-med md:text-lg'
                      >
                        {match.compare_at_price}
                      </Text>
                    </Price>
                  </>
                )}
                {match.price < match.compare_at_price && (
                  <Badge color='crimson'>On Sale!</Badge>
                )}
              </Flex>
            </Card>
          </Link>
        </Reset>
      </Box>
    );
  });

  return (
    <Box className='pt-5 md:pt-8 pb-24'>
      <Container className='max-w-[900px] m-auto'>
        <Heading
          as='h1'
          size='7'
          mb='6'
          align='left'
          className='uncial-antiqua-regular uppercase'
        >
          {collectionTitle}
        </Heading>
      </Container>
      <Container>
        <Box align='center'>
          {matches.length > 0 ? (
            <Grid
              columns={{
                initial: "repeat(2, 46.5%)",
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
              }}
              gap='5'
              rows='auto'
              justify={{ xs: "center" }}
              align={{ xs: "center" }}
              maxWidth={{ initial: "100%", sm: "900px" }}
              className='max-w-full sm:max-w-[900px]'
            >
              {cards}
            </Grid>
          ) : (
            <Box>
              <NotFound></NotFound>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
export default ProductCollection;
