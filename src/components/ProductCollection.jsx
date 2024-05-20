import { useParams } from "react-router-dom";
import data from "../data/products.json";
import {
  Text,
  Box,
  Card,
  Inset,
  Grid,
  Section,
  Container,
} from "@radix-ui/themes";

function ProductCollection() {
  const { tags } = useParams();
  const splitTags = tags.split("+");
  let matches = [];
  if (tags == "all") {
    matches = data.products;
  } else {
    matches = data.products.filter((product) => {
      return product.tags.some((tag) => splitTags.includes(tag));
    });
  }

  console.log(matches);
  return (
    <Section>
      <Container>
        <Box align='center'>
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
            {matches.map((match) => {
              return (
                <Box key={match.id}>
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
                    <Text as='p' size='3'>
                      {match.title}
                    </Text>
                  </Card>
                </Box>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Section>
  );
}
export default ProductCollection;
