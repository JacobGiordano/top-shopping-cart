import { useOutletContext } from "react-router-dom";
import { Box } from "@radix-ui/themes";

function Cart() {
  const context = useOutletContext();
  console.log(context.cart);
  return (
    <Box>
      <div>Cart</div>
      <ul>
        {context.cart.map((lineItem) => (
          <li key={lineItem.id}>
            {lineItem.title}
            {" x"}
            {lineItem.quantity}
          </li>
        ))}
      </ul>
    </Box>
  );
}
export default Cart;
