import "./App.css";
import products from "./data/product-data";

function App() {
  return (
    <>
      <div>Hello World</div>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <div className='product-card'>
                <img src={product.image} alt='' className='card-img' />
                <div className='card-info'>
                  <span className='card-title'>{product.title}</span>
                  <span className='price'>{product.price}</span>
                  {product.compare_at_price !== product.price && (
                    <span className='compare-at-price'>
                      {product.compare_at_price}
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
