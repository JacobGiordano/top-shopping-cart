import { useOutletContext } from "react-router-dom";

function Home() {
  const context = useOutletContext();
  console.log(context.cart);
  return <div>Home</div>;
}
export default Home;
