import { useOutletContext } from "react-router-dom";
import { Flex, IconButton } from "@radix-ui/themes";
import PDPInfoTitle from "./PDPInfoTitle";
import TrashCan from "/src/assets/svg/trash-can.svg?react";

function QuantityInput({ product, quantity, updateCart }) {
  const context = useOutletContext();

  const handleQtyClick = (e) => {
    const action = e.target.dataset.action;
    const qtyEl = document.querySelector(`[data-product-id='${product.id}']`);
    if (action === "increase") {
      qtyEl.value !== qtyEl.max
        ? (qtyEl.value = parseInt(qtyEl.value) + 1)
        : null;
    } else {
      qtyEl.value !== qtyEl.min
        ? (qtyEl.value = parseInt(qtyEl.value) - 1)
        : null;
    }
    updateCart === true ? handleQtyUpdate(e) : null;
  };

  const validateQty = () => {
    const qtyEl = document.querySelector(`[data-product-id='${product.id}'`);
    if (parseInt(qtyEl.value) > parseInt(qtyEl.max)) {
      qtyEl.value = qtyEl.max;
    }
  };

  const handleRemoveItem = (e) => {
    if (updateCart === true) {
      const lineItemQtyInput = e.target
        .closest("fieldset")
        .querySelector("[data-product-id]");
      const lineItemId = lineItemQtyInput.dataset.productId;
      const updatedCart = context.cart.filter(
        (cartItem) => parseInt(lineItemId) !== cartItem.id
      );
      context.setCart(updatedCart);
    }
  };

  const handleQtyUpdate = (e) => {
    if (updateCart === true) {
      const lineItemQtyInput = e.target
        .closest("fieldset")
        .querySelector("[data-product-id]");
      const lineItemId = lineItemQtyInput.dataset.productId;
      const updatedCart = context.cart.map((cartItem) =>
        parseInt(lineItemId) === cartItem.id
          ? { ...cartItem, quantity: parseInt(lineItemQtyInput.value) }
          : cartItem
      );
      context.setCart(updatedCart);
    }
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
          >
            -
          </IconButton>

          <label hidden={true} htmlFor='quantity'>
            Quanity
          </label>

          <input
            type='number'
            name='quantity'
            id='quantity'
            defaultValue={quantity || 1}
            min={1}
            max={product.available}
            data-product-id={product.id}
            className='border rounded-md pt-1 pb-1 pl-2 pr-2 min-w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            onKeyUp={validateQty}
            onChange={(e) => handleQtyUpdate(e)}
          />
          <IconButton
            variant='solid'
            highContrast
            data-action='increase'
            className='hover:cursor-pointer'
            onClick={handleQtyClick}
          >
            +
          </IconButton>
          {updateCart && (
            <IconButton
              variant='solid'
              highContrast
              className='hover:cursor-pointer'
              onClick={handleRemoveItem}
            >
              <TrashCan className='p-1' />
            </IconButton>
          )}
        </Flex>
      </fieldset>
    </Flex>
  );
}
export default QuantityInput;
