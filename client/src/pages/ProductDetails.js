import React from "react";
import "../App.css";
import { Link, useLocation } from "react-router-dom";

function ProductDetails({ cart, setCart }) {

  const loc = useLocation();
  const product = loc.state?.product;

  if (!product) {
    return (
        <div className="product-page">
            <h1>Please select a product</h1>

            <Link
                className="product-back"
                to="/menu"
            >
                View Menu
            </Link>
        </div>
    );
}

  return (
    <div className="product-page">

      <Link className="product-back" to="/menu">
        Back to Menu
      </Link>

      <div className="product-details">

        <div className="product-details-image">
          <img src="/images/coffee2.png" alt="Classic Latte" />
        </div>

        <div className="product-details-info">
          <p className="product-label">BARISTA FAVOURITE</p>

          <h1>{product.title}</h1>

          <h2>{product.price}</h2>

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-option">
            <h3>Size</h3>

            <div className="option-buttons">
                <button>Small</button>
                <button>Medium</button>
                <button>Large</button>
            </div>
          </div>

          <div className="product-option">
            <h3>Milk</h3>

            <div className="option-buttons">
              <button>Oat</button>
              <button>Regular</button>
              <button>None</button>
            </div>
          </div>

          <div className="product-order">
            <div className="quantity">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button
              className="add-product"
              onClick={() => setCart([...cart, product])}
            >
              Add to Cart
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;