import { Flex, IconButton } from "@radix-ui/themes";
import PDPInfoTitle from "./PDPInfoTitle";

function QuantityInput({ available }) {
  const handleQtyClick = (e) => {
    const action = e.target.dataset.action;
    const qtyEl = document.querySelector("#quantity");
    if (action === "increase") {
      qtyEl.value !== qtyEl.max
        ? (qtyEl.value = parseInt(qtyEl.value) + 1)
        : null;
    } else {
      qtyEl.value !== qtyEl.min
        ? (qtyEl.value = parseInt(qtyEl.value) - 1)
        : null;
    }
  };

  const validateQty = () => {
    const qtyEl = document.querySelector("#quantity");
    if (parseInt(qtyEl.value) > parseInt(qtyEl.max)) {
      qtyEl.value = qtyEl.max;
    }
  };

  return (
    <Flex gap='2' direction='column' align='baseline'>
      <PDPInfoTitle text='Quantity:' />
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
            defaultValue={1}
            min={1}
            max={available}
            className='border rounded-md pt-1 pb-1 pl-2 pr-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            onKeyUp={validateQty}
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
        </Flex>
      </fieldset>
    </Flex>
  );
}
export default QuantityInput;
