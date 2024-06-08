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
          <Flex align='start' direction='column' gap='3'>
            <Flex gap='3' justify='start'>
              <Link to={`/products/${lineItem.handle}`}>
                <img
                  src={lineItem.image}
                  alt={lineItem.title}
                  className='max-w-16 sm:max-w-[6rem]'
                />
              </Link>
              <Flex direction='column' gap='2'>
                <Link to={`/products/${lineItem.handle}`}>
                  <Text size='3'>{lineItem.title}</Text>
                </Link>
                <Flex
                  gap={{ initial: "2", md: "5" }}
                  justify={{ initial: "start", md: "between" }}
                  align={{ initial: "center" }}
                  direction={{ initial: "column", md: "row" }}
                >
                  <Flex gap='2'>
                    <Price>
                      <Text as='p' size={{ initial: "2", sm: "3" }} mr='.5'>
                        {lineItem.price}
                      </Text>
                    </Price>
                    {lineItem.price < lineItem.compare_at_price && (
                      <>
                        <Price>
                          <Text
                            as='p'
                            size={{ initial: "2", sm: "3" }}
                            className='line-through'
                          >
                            {lineItem.compare_at_price}
                          </Text>
                        </Price>
                        <Badge color='crimson'>On Sale!</Badge>
                      </>
                    )}
                  </Flex>
                  <Flex
                    gap='3'
                    direction='row'
                    wrap='nowrap'
                    justify='start'
                    align='center'
                  >
                    <QuantityInput
                      product={lineItem}
                      quantity={lineItem.quantity}
                      updateCart={true}
                      className='text-sm'
                    />
                    <IconButton
                      variant='solid'
                      highContrast
                      className='hover:cursor-pointer'
                      onClick={handleRemoveItem}
                    >
                      <TrashCan className='p-1' data-product-id={lineItem.id} />
                    </IconButton>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Table.RowHeaderCell>

        <Table.Cell>
          <Flex justify='start'>
            <Price>
              <Text as='p' size='3' mr='.5'>
                {(lineItem.price * lineItem.quantity).toLocaleString()}
              </Text>
            </Price>
          </Flex>
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <Container className='pt-5 md:pt-8 pb-20 max-w-[900px] m-auto'>
      <Heading
        as='h1'
        size='7'
        mb='3'
        align='left'
        trim='both'
        className='uncial-antiqua-regular uppercase'
      >
        Cart
      </Heading>
      {context.cart.length > 0 ? (
        <Box className='min-h-[500px] mt-6'>
          <Table.Root variant='surface'>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {lineItems}
              <Table.Row>
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
              </Table.Row>
              <Table.Row>
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
              </Table.Row>
              <Table.Row>
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
              </Table.Row>
            </Table.Body>
          </Table.Root>
          <Flex justify='end' mt='4'>
            <Button highContrast disabled>
              Checkout
            </Button>
          </Flex>
        </Box>
      ) : (
        <Section className='min-h-80 md:min-h-[500px]'>
          <Flex
            direction='column'
            justify='center'
            align='center'
            className='min-h-80'
            gap='5'
          >
            <Text as='p' size='6' className='max-w-[580px]'>
              Your cart is empty, Dear Traveler. Please consider looking over
              some of our humble offerings.
            </Text>
            <Button highContrast>
              <Link to='/collections/all'>View All Products</Link>
            </Button>
          </Flex>
        </Section>
      )}
    </Container>
  );
}
export default Cart;
