import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/productDetails.css";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setError("");
    } catch (err) {
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="loading">Loading product...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-details-page">
      <div className="product-details-card">
        {/* IMAGE */}
        <div className="product-details-image">
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x500?text=No+Image";
            }}
          />
        </div>

        {/* INFO */}
        <div className="product-details-info">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-price">₹{product.price}</div>

          <div
            className={`stock-status ${
              product.stock > 0 ? "in-stock" : "out-stock"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </div>

          <p className="product-short-desc">
            {product.description || "No description available."}
          </p>

          <button
            className="add-to-cart-btn"
            disabled={product.stock === 0}
            onClick={() =>
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
              })
            }
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="product-description">
        <h3>Product Description</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
