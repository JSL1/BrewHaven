import '../App.css';

function Cart({ cart = [], setCart }) {

  const addOne = (item) => {
    if (!setCart) return;

    setCart([...cart, item]);
  };

  const removeOne = (item) => {
    if (!setCart) return;

    const index = cart.findIndex(cartItem => cartItem.id === item.id);

    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    }
  };

  const removeFromCart = (item) => {
    if (!setCart) return;

    const updatedCart = cart.filter(
      cartItem => cartItem.id !== item.id
    );

    setCart(updatedCart);
  };

  const groupedCart = cart.reduce((grouped, item) => {
    const existingItem = grouped.find(
      group => group.item.id === item.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      grouped.push({
        item: item,
        quantity: 1
      });
    }

    return grouped;
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      alert('Please login before checking out.');
      return;
    }

    try {
      const response = await fetch(
        'https://brewhaven-backend-qf3e.onrender.com/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            customerName: `${user.firstname} ${user.lastname}`
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('Order placed successfully!');
        setCart([]);
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.log(error);
      alert('Unable to place order.');
    }
  };

  return (
    <div className="cart-page">

      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">

            {groupedCart.map(group => (
              <div className="cart-item" key={group.item.id}>

                <div>
                  <h3>{group.item.title}</h3>

                  <p>
                    ${Number(group.item.price).toFixed(2)}
                  </p>

                  <div className="cart-quantity">

                    <button onClick={() => removeOne(group.item)}>
                      -
                    </button>

                    <span>{group.quantity}</span>

                    <button onClick={() => addOne(group.item)}>
                      +
                    </button>

                  </div>
                </div>

                <div>
                  <p>
                    ${(Number(group.item.price) * group.quantity).toFixed(2)}
                  </p>

                  <button onClick={() => removeFromCart(group.item)}>
                    Remove
                  </button>
                </div>

              </div>
            ))}

          </div>

          <div className="cart-total">

            <h2>
              Total: ${total.toFixed(2)}
            </h2>

            <button onClick={handleCheckout}>
              Checkout
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;