import '../App.css';

function ProductDetails() {

  return (
    <div className="product-page">

      <div className="product-back">
        Back to Menu
      </div>

      <div className="product-details">

        <div className="product-details-image">
          <img src="/images/coffee2.png" alt="Classic Latte" />
        </div>

        <div className="product-details-info">
          <p className="product-label">BARISTA FAVOURITE</p>

          <h1>Classic Latte</h1>

          <h2>$6.25</h2>

          <p className="product-description">
            Smooth espresso combined with creamy steamed milk
            for a rich and comforting cup.
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
              <button>Regular</button>
              <button>Oat</button>
              <button>Almond</button>
            </div>
          </div>

          <div className="product-order">
            <div className="quantity">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className="add-product">
              Add to Cart
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;