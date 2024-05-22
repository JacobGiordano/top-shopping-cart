import App from "./App";
import ProductCollection from "./components/ProductCollection";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "collections/:tags",
    element: <ProductCollection />,
    errorElement: <NotFound />,
  },
  {
    path: "/products/:handle",
    element: <ProductDetail />,
    errorElement: <NotFound />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];

export default routes;
