import App from "./App";
import ProductCollection from "./components/ProductCollection";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "collections/:title",
    element: <ProductCollection />,
  },
  {
    path: "/products/:handle",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];

export default routes;
