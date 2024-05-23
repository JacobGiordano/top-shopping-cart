import { useParams } from "react-router-dom";
import data from "../data/products.json";
import MediaGallery from "./MediaGallery.jsx";
import QuantityInput from "./QuantityInput.jsx";
import { Box, Container, Grid, Text, Heading, Flex } from "@radix-ui/themes";

function ProductDetail() {
  const { handle } = useParams();
  const product = data.products.find((product) => product.handle === handle);
  console.log(product);

  const capitalizeEachWord = (string) => {
    return string
      .split(" ")
      .map((string) =>
        string !== "the" && string !== "of"
          ? string[0].toUpperCase() + string.substring(1)
          : string
      )
      .join(" ");
  };

  const tags = product.tags.map((tag) => (
    <li key={tag}>{capitalizeEachWord(tag)}</li>
  ));

  return (
    <Container>
      <Grid gap='5' columns={{ initial: "1", md: "2" }}>
        <Box className='left-column'>
          <MediaGallery product={product} />
        </Box>
        <Flex direction='column' gapY='3' className='right-column'>
          <Heading as='h1' size='7' mb='3' align='left' trim='both'>
            {capitalizeEachWord(product.title)}
          </Heading>
          <Text>Type: {capitalizeEachWord(product.type)}</Text>
          <Text>Rarity: {capitalizeEachWord(product.rarity)}</Text>
          <Flex gap='2' align='baseline'>
            <Text as='p' size='3' weight='800'>
              {product.price}&#164;
            </Text>
            {product.price < product.compare_at_price && (
              <Flex align='end'>
                <Text
                  as='p'
                  size='3'
                  style={{ textDecoration: "line-through" }}
                >
                  {product.compare_at_price}&#164;
                </Text>
              </Flex>
            )}
          </Flex>
          <Text>{product.description}</Text>
          <Text>Available: {product.available}</Text>
          <QuantityInput />
          <ul>{tags}</ul>
        </Flex>
      </Grid>
    </Container>
  );
}
export default ProductDetail;
