import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";


const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    stock: "",
    featured: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch single product
  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    try {
      const res = await api.get(`/products/${id}`);

      setForm({
        name: res.data.name || "",
        price: res.data.price || "",
        description: res.data.description || "",
        imageUrl: res.data.imageUrl || "",
        stock: res.data.stock || "",
        featured: res.data.featured || false,
      });

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, type, value, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // ✅ Update product
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl: form.imageUrl,
        featured: form.featured,
      };

      await api.put(`/products/${id}`, payload);

      // redirect after success
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
    }
  }

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Edit Product</h2>

      {error && <p className="add-product-status error">{error}</p>}

      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>
          Product Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price (₹)
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Image URL
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </label>

        <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
