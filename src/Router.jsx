import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./routes/Home";
import ProductDetail from "./routes/ProductDetail";
import ProductCollection from "./routes/ProductCollection";
import Cart from "./routes/Cart";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/cart",
        element: <Cart />,
        errorElement: <NotFound />,
      },
      {
        path: "/collections/:tags",
        element: <ProductCollection />,
        errorElement: <NotFound />,
      },
      {
        path: "/products/:handle",
        element: <ProductDetail />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default router;
