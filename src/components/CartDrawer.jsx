import { forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
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
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

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
                  className='max-[380px]:max-w-16 max-w-[6rem] rounded-md'
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
                    className='remove-btn hover:cursor-pointer'
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
            className='cart-drawer fixed top-0 right-0 h-full max-[420px]:w-full sm:max-w-[400px] flex flex-col bg-white shadow-lg'
            ref={ref}
          >
            {/* Header Section */}
            <div className='cart-drawer-header flex-shrink-0 p-2 border-b'>
              <Flex justify='between' align='center' direction='row'>
                <Heading
                  as='h1'
                  size='5'
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
            </div>
            {/* Scrollable Line Items Section */}
            <div className='cart-drawer-line-items flex-grow overflow-auto '>
              {cart.length > 0 ? (
                <Box>
                  <Table.Root variant='ghost'>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>{lineItems}</Table.Body>
                  </Table.Root>
                </Box>
              ) : (
                <Section className='flex flex-col items-center justify-center h-full'>
                  <Text as='p' size='6' className='text-center max-w-[350px]'>
                    Your cart is empty, Dear Traveler. Please consider looking
                    over some of our humble offerings.
                  </Text>
                  <Button highContrast>
                    <Link to='/collections/all'>View All Products</Link>
                  </Button>
                </Section>
              )}
            </div>
            {/* Footer Section */}
            <div className='cart-drawer-footer flex-shrink-0 px-4 pt-3 pb-5 border-t'>
              <Flex justify='end' align='end' direction='column' gap='4'>
                <Flex justify='end' gap='2' className='w-full'>
                  <Text as='p' size='3' mr='.5' align='right'>
                    Subtotal:
                  </Text>
                  <Price className='text-right'>
                    <Text as='p' size='3' mr='.5' className=''>
                      {lineItemTotal.toLocaleString()}
                    </Text>
                  </Price>
                </Flex>

                <Link to={"/cart"} className='w-full'>
                  <Button
                    className='hover:cursor-pointer mb-2 min-w-[100%!important] py-[1.25rem!important]'
                    highContrast
                  >
                    View Cart
                  </Button>
                </Link>
              </Flex>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
});

CartDrawer.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
  drawerIsOpen: PropTypes.bool,
  setDrawerIsOpen: PropTypes.func,
};

export default CartDrawer;
