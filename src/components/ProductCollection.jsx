import { useParams } from "react-router-dom";
import data from "../data/products.json";

function ProductCollection() {
  const { tags } = useParams();
  const splitTags = tags.split("+");
  const matches = data.products.filter((product) => {
    return product.tags.some((tag) => splitTags.includes(tag));
  });

  console.log(matches);
  return (
    <div>
      {matches.map((match) => {
        return <div key={match.id}>{match.title}</div>;
      })}
    </div>
  );
}
export default ProductCollection;
