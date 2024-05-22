import { Box } from "@radix-ui/themes";

function MediaGallery({ media }) {
  return (
    <Box>
      <img src={media}></img>
    </Box>
  );
}
export default MediaGallery;
