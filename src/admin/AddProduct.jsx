// src/admin/AddProduct.jsx
import React, { useState } from "react";
import api from "../services/api";
import "../styles/addProduct.css";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    stock: "",
    featured: false,
  });

  const [status, setStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: "", type: "" });

    try {
      // prepare payload exactly matching ProductRequest DTO
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl: form.imageUrl,
        featured: form.featured,
      };

      const res = await api.post("/products", payload);

      setStatus({
        message: `Product added successfully (ID: ${res.data.id})`,
        type: "success",
      });

      // reset form
      setForm({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        stock: "",
        featured: false,
      });
    } catch (err) {
      console.error("Add product failed:", err);

      setStatus({
        message:
          err.response?.data?.message ||
          "Failed to add product. Please check inputs.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Add New Product</h2>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          <label>Featured Product</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {status.message && (
        <div className={`add-product-status ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  );
}
