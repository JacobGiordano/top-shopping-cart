import { Flex, Text, Box } from "@radix-ui/themes";
import PDPInfoTitle from "./PDPInfoTitle";

function QuantityInput({ available }) {
  return (
    <Flex gap='2' align='baseline'>
      <PDPInfoTitle text='Quantity:' />
      <Box>
        <fieldset>
          <input
            type='number'
            name=''
            id=''
            defaultValue={1}
            min={1}
            max={available}
          />
        </fieldset>
      </Box>
    </Flex>
  );
}
export default QuantityInput;
