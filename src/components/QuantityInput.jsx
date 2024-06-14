import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Flex, IconButton } from "@radix-ui/themes";
import PDPInfoTitle from "./PDPInfoTitle";

function QuantityInput({ product, quantity, updateCart, cart, setCart }) {
  const [inputValue, setInputValue] = useState(quantity || 1);
  const context = useOutletContext();
  const cartData = cart || context.cart;
  const setCartFunc = setCart || context.setCart;
  const cartItem = cartData.find((lineItem) => lineItem.id === product.id);
  const available =
    !updateCart && cartItem
      ? product.available - cartItem.quantity
      : product.available;

  const handleQtyClick = (e) => {
    const action = e.target.dataset.action;
    let newValue = inputValue;

    if (action === "increase") {
      newValue = Math.min(inputValue + 1, available);
    } else if (action === "decrease") {
      newValue = Math.max(inputValue - 1, 1);
    }

    setInputValue(newValue);
    if (updateCart) {
      handleQtyUpdate(newValue);
    }
  };

  const validateQty = (value) => {
    let newValue = Math.min(Math.max(value, 1), available);
    setInputValue(newValue);
    return newValue;
  };

  const handleQtyUpdate = (newValue) => {
    if (isNaN(newValue) || newValue === "") {
      setInputValue(1); // Default to 1 if value is invalid or empty
    } else {
      const validatedValue = validateQty(newValue);
      if (updateCart) {
        const updatedCart = cartData.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: validatedValue }
            : cartItem
        );
        setCartFunc(updatedCart);
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      // Allow empty input but don't update the cart yet
      setInputValue("");
    } else {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue)) {
        setInputValue(newValue);
      }
    }
  };

  const handleBlur = (e) => {
    // Validate and update quantity on blur if empty or invalid
    handleQtyUpdate(parseInt(e.target.value, 10) || 1);
  };

  return (
    <Flex gap='2' direction='column' align='baseline'>
      {updateCart === false && <PDPInfoTitle text='Quantity:' />}
      <fieldset>
        <Flex gap='1' align='center'>
          <IconButton
            variant='solid'
            highContrast
            data-action='decrease'
            className='hover:cursor-pointer'
            onClick={handleQtyClick}
            disabled={!updateCart && available === 0}
          >
            -
          </IconButton>

          <label hidden={true} htmlFor='quantity'>
            Quantity
          </label>

          <input
            type='number'
            name='quantity'
            id='quantity'
            value={inputValue}
            min={1}
            max={available}
            disabled={available === 0}
            data-product-id={product.id}
            className='border rounded-md pt-1 pb-1 pl-2 pr-2 min-w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <IconButton
            variant='solid'
            highContrast
            data-action='increase'
            className='hover:cursor-pointer'
            onClick={handleQtyClick}
            disabled={!updateCart && available === 0}
          >
            +
          </IconButton>
        </Flex>
      </fieldset>
    </Flex>
  );
}

export default QuantityInput;
