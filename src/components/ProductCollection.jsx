import { Link, useParams } from "react-router-dom";
import data from "../data/products.json";
import {
  Text,
  Box,
  Card,
  Inset,
  Flex,
  Grid,
  Section,
  Container,
  Heading,
  Reset,
} from "@radix-ui/themes";
import NotFound from "./NotFound";

function ProductCollection() {
  const { tags } = useParams();
  const splitTags = tags.split("+");
  let collectionTitle = "";
  let matches = [];
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
              <Text as='p' size='4'>
                {match.title}
              </Text>
              <Flex gap='2' align='baseline'>
                <Text as='p' size='3'>
                  {match.price}&#164;
                </Text>
                {match.price < match.compare_at_price && (
                  <Flex align='end'>
                    <Text
                      as='p'
                      size='3'
                      style={{ textDecoration: "line-through" }}
                    >
                      {match.compare_at_price}&#164;
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Card>
          </Link>
        </Reset>
      </Box>
    );
  });

  console.log(matches);
  return (
    <Section>
      <Container style={{ maxWidth: 900, margin: "0 auto" }} m>
        <Heading as='h1' size='8' mb='6' align='left'>
          {collectionTitle}
        </Heading>
      </Container>
      <Container>
        <Box align='center'>
          {matches.length > 0 ? (
            <Grid
              columns={{
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
              }}
              gap='5'
              rows='auto'
              width='auto'
              justify={{ xs: "center" }}
              align={{ xs: "center" }}
              maxWidth={"900px"}
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
    </Section>
  );
}
export default ProductCollection;
