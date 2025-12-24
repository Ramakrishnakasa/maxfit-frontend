import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/adminProducts.css";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get("/products");
      setProducts(res.data.content || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  // 🔴 Delete product
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      // remove from UI
      setProducts(prev => prev.filter(p => p.id !== id));

      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  // ⭐ Toggle featured
  async function handleToggleFeatured(id) {
    try {
      const res = await api.patch(`/products/${id}/featured`);
      const updatedProduct = res.data;

      setProducts(prev =>
        prev.map(p =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update featured status");
    }
  }

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-products-container">
      <div className="admin-products-header">
        <h2>Admin – Products</h2>

        <button
          className="add-product-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          + Add Product
        </button>
      </div>

      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>

              {/* ⭐ Featured toggle */}
              <td>
                <input
                  type="checkbox"
                  checked={p.featured}
                  onChange={() => handleToggleFeatured(p.id)}
                />
              </td>

              <td className="actions">
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/admin/products/${p.id}/edit`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
