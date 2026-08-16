import { useState } from "react";
import "../App.css";
import API_BASE_URL from "../config/api";

function Cart({ cart = [], setCart }) {
    const [orderNotes, setOrderNotes] = useState("");
    const [pickupTime, setPickupTime] = useState("");

    const addOne = (item) => {
        if (!setCart) {
            return;
        }

        setCart([...cart, item]);
    };

    const removeOne = (item) => {
        if (!setCart) {
            return;
        }

        const index = cart.findIndex(
            (cartItem) => cartItem.id === item.id
        );

        if (index !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            setCart(updatedCart);
        }
    };

    const removeFromCart = (item) => {
        if (!setCart) {
            return;
        }

        const updatedCart = cart.filter(
            (cartItem) => cartItem.id !== item.id
        );

        setCart(updatedCart);
    };

    const groupedCart = cart.reduce(
        (groupedItems, item) => {
            const existingItem = groupedItems.find(
                (group) =>
                    group.item.id === item.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                groupedItems.push({
                    item: item,
                    quantity: 1
                });
            }

            return groupedItems;
        },
        []
    );

    const total = cart.reduce(
        (sum, item) => sum + Number(item.price),
        0
    );

    const handleCheckout = async () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!token || !user) {
            alert("Please login before checking out.");
            return;
        }

        if (!pickupTime) {
            alert("Please select a pickup time.");
            return;
        }

        const orderItems = groupedCart.map(
            (group) => {
                return {
                    itemId: group.item.id,
                    quantity: group.quantity
                };
            }
        );

        try {
            const response = await fetch(
                `${API_BASE_URL}/orders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        items: orderItems,
                        orderNotes: orderNotes,
                        pickupTime: pickupTime
                    })
                }
            );

            const result = await response.json();

            if (result.success) {
                alert("Order placed successfully!");
                setCart([]);
                setOrderNotes("");
                setPickupTime("");
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.log(error);
            alert("Unable to place order.");
        }
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="cart-items">
                        {groupedCart.map((group) => (
                            <div
                                className="cart-item" key={group.item.id} >
                                <div>
                                    <h3>
                                        {group.item.title}
                                    </h3>

                                    <p>$ {Number(group.item.price).toFixed(2)}
                                    </p>

                                    <div className="cart-quantity">
                                        <button
                                            type="button" onClick={() => removeOne(group.item)} > - </button>
                                        <span>
                                            {group.quantity}
                                        </span>

                                        <button type="button" onClick={() => addOne(group.item)} > + </button>
                                    </div>
                                </div>

                                <div>
                                    <p>$ {(Number(group.item.price) * group.quantity).toFixed(2)}</p>

                                    <button type="button" onClick={() => removeFromCart(group.item)}> Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total">
                        <h2>
                            Total: ${total.toFixed(2)}
                        </h2>

                        <div className="order-form">
                            <label htmlFor="pickup-time">
                                Pickup Time
                            </label>

                            <input
                                id="pickup-time"
                                type="datetime-local"
                                value={pickupTime}
                                onChange={(event) =>
                                    setPickupTime(
                                        event.target.value
                                    )
                                }
                                required
                            />

                            <label htmlFor="order-notes">
                                Order Notes
                            </label>

                            <textarea
                                id="order-notes"
                                value={orderNotes}
                                onChange={(event) =>
                                    setOrderNotes(
                                        event.target.value
                                    )
                                }
                                maxLength="500"
                                placeholder="Add preparation or pickup details"
                            />

                            <button
                                type="button"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;