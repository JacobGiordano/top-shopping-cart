import { Link, useParams } from "react-router-dom";
import data from "../data/products.json";
import MediaGallery from "./MediaGallery.jsx";
import Price from "./Price.jsx";
import QuantityInput from "./QuantityInput.jsx";

import {
  Box,
  Container,
  Text,
  Heading,
  Flex,
  Badge,
  Button,
} from "@radix-ui/themes";

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
    <Link to={`/collections/${tag}`} key={tag}>
      <Badge variant='outline' highContrast>
        {capitalizeEachWord(tag)}
      </Badge>
    </Link>
  ));

  return (
    <Container style={{ maxWidth: 900, margin: "0 auto" }}>
      <Flex gap='6' direction={{ initial: "column", sm: "row" }}>
        <Box className='left-column'>
          <MediaGallery product={product} />
        </Box>
        <Flex direction='column' gapY='3' className='right-column md:max-w-xs'>
          <Heading as='h1' size='7' mb='3' align='left' trim='both'>
            {capitalizeEachWord(product.title)}
          </Heading>
          <Flex direction='column'>
            <Text size='2'>Price:</Text>
            <Flex gap='2' align='baseline'>
              <Price>
                <Text as='p' size='3' weight='medium' mr='.5'>
                  {product.price}
                </Text>
              </Price>
              {product.price < product.compare_at_price && (
                <>
                  <Price>
                    <Text
                      as='p'
                      size='3'
                      weight='medium'
                      className='line-through'
                    >
                      {product.compare_at_price}
                    </Text>
                  </Price>
                  <Badge color='crimson'>On Sale!</Badge>
                </>
              )}
            </Flex>
          </Flex>
          <Flex direction='column'>
            <Text size='2'>Type:</Text>
            <Box>{capitalizeEachWord(product.type)}</Box>
          </Flex>
          <Flex direction='column'>
            <Text size='2'>Rarity:</Text>
            <Box>{capitalizeEachWord(product.rarity)}</Box>
          </Flex>
          <Flex direction='column'>
            <Text size='2'>Description:</Text>
            <Text>{product.description}</Text>
          </Flex>
          <Text>Available: {product.available}</Text>
          <QuantityInput />
          <Box mb='6'>
            <Button variant='solid' highContrast>
              Add to cart
            </Button>
          </Box>
          <Flex gap='2' wrap='wrap'>
            {tags}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
export default ProductDetail;
