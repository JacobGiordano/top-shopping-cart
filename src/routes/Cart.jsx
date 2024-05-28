import { Link, useOutletContext } from "react-router-dom";
import { Badge, Container, Flex, Heading, Table, Text } from "@radix-ui/themes";
import QuantityInput from "../components/QuantityInput";
import Price from "../components/Price";

function Cart() {
  const context = useOutletContext();
  console.log(context.cart);
  return (
    <Container style={{ maxWidth: 900, margin: "0 auto" }}>
      <Heading as='h1' size='7' mb='3' align='left' trim='both'>
        Cart
      </Heading>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {context.cart.map((lineItem) => (
            <Table.Row key={lineItem.id}>
              <Table.RowHeaderCell>
                <Link to={`/products/${lineItem.handle}`}>
                  <Flex gap='3' justify='start'>
                    <img
                      src={lineItem.image}
                      alt={lineItem.title}
                      className='max-w-20'
                    />{" "}
                    <Text size='3'>{lineItem.title}</Text>
                  </Flex>
                </Link>
              </Table.RowHeaderCell>

              <Table.Cell>
                {" "}
                <QuantityInput
                  product={lineItem}
                  quantity={lineItem.quantity}
                  updateCart={true}
                />
              </Table.Cell>
              <Table.Cell>
                <Flex gap='2'>
                  <Price>
                    <Text as='p' size='3' mr='.5'>
                      {lineItem.price}
                    </Text>
                  </Price>
                  {lineItem.price < lineItem.compare_at_price && (
                    <>
                      <Price>
                        <Text as='p' size='3' className='line-through'>
                          {lineItem.compare_at_price}
                        </Text>
                      </Price>
                      <Badge color='crimson'>On Sale!</Badge>
                    </>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
export default Cart;
