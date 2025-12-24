import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/orders.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await api.get("/orders/my");
      setOrders(res.data); // ✅ now always an array
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function handlePayNow(orderId) {
    try {
        alert("Initiating payment...");
      const res = await api.post("/payments/initiate", { orderId });
      alert(`Payment initiated!\nGateway Order ID: ${res.data.gatewayOrderId}`);
    } catch (err) {
    alert(err.message || "");
      alert("Failed to initiate payment");
      console.error(err);
    }
  }

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  if (orders.length === 0) {
    return <div className="orders-empty">No orders yet</div>;
  }

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div>
            <p className="order-id">
              <strong>Order ID:</strong> #{order.id}
            </p>
            <p className="order-date">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="order-info">
            <p className="order-total">₹{order.totalAmount}</p>

            <span className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>

            <div className="order-actions">
              <button
                className="view-details-btn"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                View Details
              </button>

              {order.status === "CREATED" && (
                <button
                  className="pay-now-btn"
                  onClick={() => handlePayNow(order.id)}
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
