import App from "./App";
import ProductCollection from "./routes/ProductCollection";
import ProductDetail from "./routes/ProductDetail";
import Cart from "./routes/Cart";
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
    errorElement: <NotFound />,
  },
];

export default routes;
