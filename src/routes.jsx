import App from "./App";
import ProductCollection from "./components/ProductCollection";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "collections/:title",
    element: <ProductCollection />,
  },
];

export default routes;
