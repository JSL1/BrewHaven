import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch('https://brewhaven-backend-qf3e.onrender.com/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setOrders(result.data || []);
        } else {
          setMessage(result.message);
        }

        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setMessage('Unable to load orders.');
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div className="orders-page">

      <h1>My Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : message ? (
        <p>{message}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">

          {orders.map(order => (
            <div className="order-card" key={order.id}>

              <div>
                <h3>Order {order.orderNumber || order.id}</h3>
                <p>{order.customerName}</p>
              </div>

              <div>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>

                <p>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Orders;