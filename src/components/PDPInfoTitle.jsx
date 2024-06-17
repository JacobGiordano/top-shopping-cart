import { Text } from "@radix-ui/themes";
import PropTypes from "prop-types";

function PDPInfoTitle({ text }) {
  return (
    <Text size='1' weight='bold'>
      {text}
    </Text>
  );
}

PDPInfoTitle.propTypes = {
  text: PropTypes.string,
};

export default PDPInfoTitle;
