import { useOutletContext } from "react-router-dom";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import QuantityInput from "../components/QuantityInput";

function Cart() {
  const context = useOutletContext();
  console.log(context.cart);
  return (
    <Container style={{ maxWidth: 900, margin: "0 auto" }}>
      <Heading as='h1' size='7' mb='3' align='left' trim='both'>
        Cart
      </Heading>
      <ul>
        {context.cart.map((lineItem) => (
          <li key={lineItem.id}>
            <Flex gap='2' justify='between' align='center'>
              <Box>{lineItem.title}</Box>
              <QuantityInput quantity={lineItem.quantity} />
            </Flex>
          </li>
        ))}
      </ul>
    </Container>
  );
}
export default Cart;
