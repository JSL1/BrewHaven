import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import API_BASE_URL from "../config/api";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] =
        useState("");
    const [editingOrderId, setEditingOrderId] =
        useState(null);
    const [editedStatus, setEditedStatus] =
        useState("");
    const [editedNotes, setEditedNotes] =
        useState("");
    const [historyComment, setHistoryComment] =
        useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`${API_BASE_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setOrders(result.data || []);
                } else {
                    setErrorMessage(result.message);
                }

                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(
                    "Unable to load orders."
                );
                setLoading(false);
            });
    }, [navigate]);

    const startEditing = (order) => {
        setEditingOrderId(order.id);
        setEditedStatus(order.status);
        setEditedNotes(order.orderNotes || "");
        setHistoryComment("");
        setErrorMessage("");
        setSuccessMessage("");
    };

    const cancelEditing = () => {
        setEditingOrderId(null);
        setEditedStatus("");
        setEditedNotes("");
        setHistoryComment("");
        setErrorMessage("");
    };

    const updateOrder = async (event, orderId) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!historyComment.trim()) {
            setErrorMessage(
                "Please describe the reason for this update."
            );
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `${API_BASE_URL}/orders/${orderId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        status: editedStatus,
                        orderNotes: editedNotes,
                        historyComment: historyComment
                    })
                }
            );

            const result = await response.json();

            if (result.success) {
                const updatedOrders = orders.map(
                    (order) => {
                        if (order.id === orderId) {
                            return result.data;
                        }

                        return order;
                    }
                );

                setOrders(updatedOrders);
                setEditingOrderId(null);
                setEditedStatus("");
                setEditedNotes("");
                setHistoryComment("");
                setSuccessMessage(
                    "Order updated successfully."
                );
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(
                "Unable to update the order."
            );
        }
    };

    if (loading) {
        return (
            <div className="orders-page">
                <h1>My Orders</h1>
                <p>Loading orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-page">
                <h1>My Orders</h1>
                <p>No orders found.</p>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h1>My Orders</h1>

            {errorMessage && (
                <p className="order-error">
                    {errorMessage}
                </p>
            )}

            {successMessage && (
                <p className="order-success">
                    {successMessage}
                </p>
            )}

            <div className="orders-list">
                {orders.map((order) => {
                    const orderTotal = order.items.reduce(
                        (total, item) => {
                            return (
                                total +
                                Number(item.price) *
                                    item.quantity
                            );
                        },
                        0
                    );

                    return (
                        <div
                            className="order-card"
                            key={order.id}
                        >
                            <div className="order-summary">
                                <h2>
                                    Order {order.orderNumber}
                                </h2>

                                <span
                                    className={
                                        "status-badge status-" +
                                        order.status.toLowerCase()
                                    }
                                >
                                    {order.status}
                                </span>

                                <p>
                                    <strong>Created:</strong>{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleString()}
                                </p>

                                <p>
                                    <strong>Pickup:</strong>{" "}
                                    {new Date(
                                        order.pickupTime
                                    ).toLocaleString()}
                                </p>

                                <p>
                                    <strong>Notes:</strong>{" "}
                                    {order.orderNotes ||
                                        "No notes provided"}
                                </p>

                                <h3>Items</h3>

                                <ul className="order-items">
                                    {order.items.map((item) => (
                                        <li key={item.itemId}>
                                            {item.quantity} ×{" "}
                                            {item.title} — $
                                            {(
                                                Number(
                                                    item.price
                                                ) *
                                                item.quantity
                                            ).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>

                                <p>
                                    <strong>Total:</strong>{" "}
                                    ${orderTotal.toFixed(2)}
                                </p>

                                <h3>History</h3>

                                <ul className="order-history">
                                    {order.history.map(
                                        (historyEntry, index) => (
                                            <li key={index}>
                                                <strong>
                                                    {
                                                        historyEntry.username
                                                    }
                                                </strong>
                                                {" — "}
                                                {new Date(
                                                    historyEntry.date
                                                ).toLocaleString()}
                                                <br />
                                                {
                                                    historyEntry.comment
                                                }
                                            </li>
                                        )
                                    )}
                                </ul>

                                {editingOrderId !== order.id && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startEditing(order)
                                        }
                                    >
                                        Manage Order
                                    </button>
                                )}

                                {editingOrderId === order.id && (
                                    <form
                                        className="order-edit-form"
                                        onSubmit={(event) =>
                                            updateOrder(
                                                event,
                                                order.id
                                            )
                                        }
                                    >
                                        <label
                                            htmlFor={
                                                `status-${order.id}`
                                            }
                                        >
                                            Status
                                        </label>

                                        <select
                                            id={`status-${order.id}`}
                                            value={editedStatus}
                                            onChange={(event) =>
                                                setEditedStatus(
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>
                                            <option value="Preparing">
                                                Preparing
                                            </option>
                                            <option value="Ready">
                                                Ready
                                            </option>
                                            <option value="Served">
                                                Served
                                            </option>
                                            <option value="Completed">
                                                Completed
                                            </option>
                                            <option value="Cancelled">
                                                Cancelled
                                            </option>
                                        </select>

                                        <label
                                            htmlFor={
                                                `notes-${order.id}`
                                            }
                                        >
                                            Order Notes
                                        </label>

                                        <textarea
                                            id={`notes-${order.id}`}
                                            value={editedNotes}
                                            onChange={(event) =>
                                                setEditedNotes(
                                                    event.target.value
                                                )
                                            }
                                            maxLength="500"
                                        />

                                        <label
                                            htmlFor={
                                                `history-${order.id}`
                                            }
                                        >
                                            Update Comment
                                        </label>

                                        <textarea
                                            id={`history-${order.id}`}
                                            value={historyComment}
                                            onChange={(event) =>
                                                setHistoryComment(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Describe this update"
                                            required
                                        />

                                        <div className="order-actions">
                                            <button type="submit">
                                                Save Update
                                            </button>

                                            <button
                                                type="button"
                                                onClick={
                                                    cancelEditing
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Orders;