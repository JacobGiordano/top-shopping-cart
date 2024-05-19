import { useParams } from "react-router-dom";
import data from "../data/products.json";
import MediaGallery from "./MediaGallery.jsx";
import QuantityInput from "./QuantityInput.jsx";

function ProductDetail() {
  const { handle } = useParams();
  const product = data.products.find((product) => product.handle === handle);
  console.log(product);
  const tags = product.tags.map((tag) => <li key={tag}>{tag}</li>);

  return (
    <div>
      <div>{product.title}</div>
      <div>{product.type}</div>
      <div>{product.rarity}</div>
      <div>{product.price}</div>
      {product.price < product.compare_at_price && (
        <div>{product.compare_at_price}</div>
      )}
      <div>{product.description}</div>
      <MediaGallery media={product.image} />
      <div>{product.available}</div>
      <QuantityInput />
      <ul>{tags}</ul>
    </div>
  );
}
export default ProductDetail;
