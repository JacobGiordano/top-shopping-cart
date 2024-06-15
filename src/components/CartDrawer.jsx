import { forwardRef } from "react";
import { Link } from "react-router-dom";
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
import { motion, AnimatePresence, easeInOut } from "framer-motion";

const CartDrawer = forwardRef(function CartDrawer(
  { cart, setCart, drawerIsOpen, setDrawerIsOpen },
  ref
) {
  let lineItemTotal = 0;

  const variants = {
    initial: {
      opacity: 0,
      right: "-100%",
      x: "100%",
      position: "fixed",
      zIndex: 100,
    },
    open: {
      opacity: 1,
      right: 0,
      x: 0,
      position: "fixed",
      overflow: "auto",
      zIndex: 100,
    },
    closed: {
      opacity: 0,
      right: "-100%",
      x: "100%",
      position: "fixed",
      zIndex: 100,
    },
  };

  const handleCartCloseBtnClick = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const handleRemoveItem = (e) => {
    const lineItemId = e.target.dataset.productId;
    const updatedCart = cart.filter(
      (cartItem) => parseInt(lineItemId) !== cartItem.id
    );
    setCart(updatedCart);
  };

  const lineItems = cart.map((lineItem) => {
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
                  className='max-w-16 sm:max-w-[6rem] rounded-md'
                />
              </Link>
              <Flex direction='column' gap='2'>
                <Link to={`/products/${lineItem.handle}`}>
                  <Text size='3'>{lineItem.title}</Text>
                </Link>
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
                    cart={cart}
                    setCart={setCart}
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
    <>
      <AnimatePresence mode='wait' key={location.pathname}>
        {drawerIsOpen && (
          <motion.aside
            initial={"initial"}
            animate={drawerIsOpen ? "open" : "closed"}
            exit={"closed"}
            variants={variants}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            id='cart-drawer'
            className='cart-drawer relative border-l cart-drawer pt-5 p-2 min-h-svh w-full sm:max-w-[400px]'
            ref={ref}
          >
            <Container>
              <Flex
                justify='between'
                align='center'
              >
                <Heading
                  as='h1'
                  size='5'
                  mb='3'
                  align='left'
                  trim='both'
                  className='uncial-antiqua-regular uppercase'
                >
                  Cart
                </Heading>
                <Button
                  highContrast
                  variant='outline'
                  className='hover:cursor-pointer'
                  onClick={handleCartCloseBtnClick}
                >
                  &times;
                </Button>
              </Flex>
              {cart.length > 0 ? (
                <Box className='min-h-[500px]'>
                  <Table.Root variant='ghost'>
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
                    </Table.Body>
                  </Table.Root>
                  <Flex justify='end' mt='4'>
                    <Link to={"/cart"}>
                      <Button className='hover:cursor-pointer' highContrast>
                        View Cart
                      </Button>
                    </Link>
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
                    <Text as='p' size='6' className='max-w-[350px] text-center'>
                      Your cart is empty, Dear Traveler. Please consider looking
                      over some of our humble offerings.
                    </Text>
                    <Button highContrast>
                      <Link to='/collections/all'>View All Products</Link>
                    </Button>
                  </Flex>
                </Section>
              )}
            </Container>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
});
export default CartDrawer;
