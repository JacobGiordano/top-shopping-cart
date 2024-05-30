import { Link, useOutletContext } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Section,
  Table,
  Text,
} from "@radix-ui/themes";
import QuantityInput from "../components/QuantityInput";
import Price from "../components/Price";
import TrashCan from "/src/assets/svg/trash-can.svg?react";

function Cart() {
  const context = useOutletContext();
  let lineItemTotal = 0;

  const handleRemoveItem = (e) => {
    const lineItemId = e.target.dataset.productId;
    const updatedCart = context.cart.filter(
      (cartItem) => parseInt(lineItemId) !== cartItem.id
    );
    context.setCart(updatedCart);
  };

  const lineItems = context.cart.map((lineItem) => {
    lineItemTotal = lineItemTotal + lineItem.price * lineItem.quantity;
    return (
      <Table.Row key={lineItem.id}>
        <Table.RowHeaderCell>
          <Link to={`/products/${lineItem.handle}`}>
            <Flex gap='3' justify='start'>
              <img
                src={lineItem.image}
                alt={lineItem.title}
                className='max-w-20'
              />
              <Text size='3'>{lineItem.title}</Text>
            </Flex>
          </Link>
        </Table.RowHeaderCell>
        <Table.Cell>
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
        <Table.Cell>
          <Flex justify='start'>
            <Price>
              <Text as='p' size='3' mr='.5'>
                {(lineItem.price * lineItem.quantity).toLocaleString()}
              </Text>
            </Price>
          </Flex>
        </Table.Cell>
        <Table.Cell>
          <Flex justify='end'>
            <IconButton
              variant='solid'
              highContrast
              className='hover:cursor-pointer'
              onClick={handleRemoveItem}
            >
              <TrashCan className='p-1' data-product-id={lineItem.id} />
            </IconButton>
          </Flex>
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <Container style={{ maxWidth: 900, margin: "0 auto" }}>
      <Heading as='h1' size='7' mb='3' align='left' trim='both'>
        Cart
      </Heading>
      {context.cart.length > 0 ? (
        <>
          <Table.Root variant='surface'>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {lineItems}
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell justify='end' align='center'>
                  <Text as='p' size='3' mr='.5'>
                    Subtotal:
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Price>
                    <Text as='p' size='3' mr='.5'>
                      {lineItemTotal.toLocaleString()}
                    </Text>
                  </Price>
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell justify='end' align='center'>
                  <Text as='p' size='3' mr='.5'>
                    Royal taxes:
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Price>
                    <Text as='p' size='3' mr='.5'>
                      {lineItemTotal * 0.1}
                    </Text>
                  </Price>
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell justify='end' align='center'>
                  <Text as='p' size='3' mr='.5'>
                    Total:
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Price>
                    <Text as='p' size='3' mr='.5'>
                      {(lineItemTotal + lineItemTotal * 0.1).toLocaleString()}
                    </Text>
                  </Price>
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
          <Flex justify='end' mt='4'>
            <Button highContrast disabled>
              Checkout
            </Button>
          </Flex>
        </>
      ) : (
        <Section>
          <Text as='p' size='6'>
            Your cart is empty, dear traveler. Perhaps peruse more of our humble
            offerings?
          </Text>
        </Section>
      )}
    </Container>
  );
}
export default Cart;
