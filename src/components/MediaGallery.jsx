import { Box } from "@radix-ui/themes";

function MediaGallery({ product }) {
  return (
    <Box>
      <img src={product.image} width='100%' alt={product.title}></img>
    </Box>
  );
}
export default MediaGallery;
