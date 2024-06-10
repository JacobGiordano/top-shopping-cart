import { Link, useOutletContext, useParams } from "react-router-dom";
import MediaGallery from "../components/MediaGallery.jsx";
import Price from "../components/Price.jsx";
import QuantityInput from "../components/QuantityInput.jsx";
import PDPInfoTitle from "../components/PDPInfoTitle.jsx";
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
  const context = useOutletContext();
  const data = context.data;
  const product = data.products.find((product) => product.handle === handle);
  const cartItem = context.cart.find((lineItem) => lineItem.id === product.id);
  const available = cartItem
    ? product.available - cartItem.quantity
    : product.available;

  const handleAddToCartClick = () => {
    let lineItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      compare_at_price: product.compare_at_price,
      tags: product.tags,
      available: available,
      handle: product.handle,
      quantity: parseInt(
        document.querySelector(`[data-product-id='${product.id}']`).value
      ),
    };
    let addToCart = true;
    const updatedCart = context.cart.map((cartItem) => {
      if (lineItem.id === cartItem.id) {
        addToCart = false;
        return {
          ...cartItem,
          quantity: parseInt(cartItem.quantity) + parseInt(lineItem.quantity),
        };
      } else {
        return cartItem;
      }
    });

    addToCart
      ? context.setCart([...updatedCart, lineItem])
      : context.setCart(updatedCart);

    document.querySelector("[data-product-id]").value = 1;
    context.setDrawerIsOpen(true);
  };

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
    <Container className='max-w-[900px] m-auto =pt-5 md:pt-8 pb-20'>
      <Flex gap='6' direction={{ initial: "column", sm: "row" }}>
        <Box className='left-column'>
          <MediaGallery product={product} />
        </Box>
        <Flex direction='column' gapY='3' className='right-column md:max-w-sm'>
          <Heading
            as='h1'
            size='7'
            mb='3'
            align='left'
            trim='both'
            className='uncial-antiqua-regular uppercase pt-1'
          >
            {capitalizeEachWord(product.title)}
          </Heading>
          <Flex direction='column'>
            <PDPInfoTitle text='Price: ' />
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
            <PDPInfoTitle text='Type: ' />
            <Box>{capitalizeEachWord(product.type)}</Box>
          </Flex>
          <Flex direction='column'>
            <PDPInfoTitle text='Rarity: ' />
            <Box>{capitalizeEachWord(product.rarity)}</Box>
          </Flex>
          <Flex direction='column'>
            <PDPInfoTitle text='Description: ' />
            <Text>{product.description}</Text>
          </Flex>
          <Flex gap='2' align='baseline'>
            <PDPInfoTitle text='Available: ' />
            <Text data-product-available>{available}</Text>
          </Flex>
          <QuantityInput product={product} updateCart={false} />
          <Box mt='2' mb='6'>
            <Button
              variant='solid'
              highContrast
              className='hover:cursor-pointer'
              onClick={handleAddToCartClick}
              data-add-to-cart
              disabled={available === 0 ? true : false}
            >
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
