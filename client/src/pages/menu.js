import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import API_BASE_URL from "../config/api";

function Menu({ cart, setCart }) {

  const loc = useLocation();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(loc.state?.category || "All Categories"); //getting the category from the previous page click, or fall back to all
  const [loading, setLoading] = useState(true);
  const [addedItem, setAddedItem] = useState(null);
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/items`)
      .then(response => response.json())
      .then(result => {
        setItems(result.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);

    setAddedItem(item.id);

    setTimeout(() => {
      setAddedItem(null);
    }, 1000);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'All Categories' ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="menu-page">

      <p className="cart-count">
        Cart: {cart.length}
      </p>

      <div className="menu-header">
        <p>OUR MENU</p>
        <h1>Find Your Favourite</h1>

        <span>
          Choose from our selection of coffee, cold drinks, tea and bakery.
        </span>
      </div>

      <div className="menu-search">

        <input
          type="text"
          placeholder="Search for a drink..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Coffee</option>
          <option>Cold Drinks</option>
          <option>Iced Coffees</option>
          <option>Tea</option>
          <option>Bakery</option>
        </select>

      </div>

      {loading ? (

        <p className="menu-message">
          Loading menu...
        </p>

      ) : filteredItems.length === 0 ? (

        <p className="menu-message">
          No items found.
        </p>

      ) : (

        <div className="menu-products">

          {filteredItems.map(item => (

            <div className="menu-card" key={item.id}>
              <div className="menu-card-image">
                <img
                  src={`/images/${item.image}`}
                  alt={item.title}
                />
              </div>
              <div className="menu-card-info">
              <Link to='../productDetails' state={{ product: item }}>
                <h3>{item.title}</h3>
              </Link>
                <p>
                  {item.description}
                </p>
                <div>
                  <strong>
                    ${Number(item.price).toFixed(2)}
                  </strong>
                  <button
                    onClick={() => addToCart(item)}
                    className={
                      addedItem === item.id ? 'added' : ''
                    }
                  >
                    {addedItem === item.id
                      ? 'Added!'
                      : 'Add to cart ＋'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;