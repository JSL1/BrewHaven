import '../App.css';

function Cart({ cart = [], setCart }) {

  const removeFromCart = (index) => {
    if (!setCart) return;
    
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div className="cart-page">

      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">

            {cart.map((item, index) => (
              <div className="cart-item" key={index}>

                <div>
                  <h3>{item.title}</h3>
                  <p>${Number(item.price).toFixed(2)}</p>
                </div>

                <button onClick={() => removeFromCart(index)}>
                  Remove
                </button>

              </div>
            ))}

          </div>

          <div className="cart-total">
            <h2>
              Total: ${total.toFixed(2)}
            </h2>

            <button>
              Checkout
            </button>
          </div>
        </>
      )}

    </div>
  );
}

export default Cart;