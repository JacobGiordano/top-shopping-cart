import { Box } from "@radix-ui/themes";
import PropTypes from "prop-types";

function MediaGallery({ product }) {
  return (
    <Box>
      <img src={product.image} width='100%' alt={product.title}></img>
    </Box>
  );
}

MediaGallery.propTypes = {
  product: PropTypes.object,
};

export default MediaGallery;
