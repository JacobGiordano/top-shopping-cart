import { useParams } from "react-router-dom";
import products from "../data/product-data.js";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((product) => product.id.toString() === id);
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
      <div>{product.image}</div>
      <div>{product.available}</div>
      <ul>{tags}</ul>
    </div>
  );
}
export default ProductDetail;
