import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/orderDetails.css";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  async function fetchOrderDetails() {
    try {
      const res = await api.get(`/orders/${orderId}`);
      setOrder(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="loading">Loading order...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="order-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Orders
      </button>

      <h2>Order #{order.orderId}</h2>

      <div className="order-summary">
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status ${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </p>
        <p>
          <strong>Total:</strong> ₹{order.totalAmount}
        </p>
      </div>

      <h3>Items</h3>

      <div className="order-items">
        {order.items.map((item, index) => (
          <div className="order-item" key={index}>
            <div>
              <p className="item-name">{item.productName}</p>
              <p className="item-price">₹{item.price}</p>
            </div>

            <div className="item-qty">
              Qty: {item.quantity}
            </div>

            <div className="item-subtotal">
              ₹{item.subtotal}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
