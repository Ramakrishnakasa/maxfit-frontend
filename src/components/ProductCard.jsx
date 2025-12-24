import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/product-card.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  const handleViewProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card">
      {/* IMAGE */}
      <div className="product-image" onClick={handleViewProduct}>
        <img
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />

        {product.featured && (
          <span className="badge featured">Featured</span>
        )}
      </div>

      {/* BODY */}
      <div className="product-body">
        <h3
          className="product-name"
          title={product.name}
          onClick={handleViewProduct}
        >
          {product.name}
        </h3>

        {product.category && (
          <p className="product-category">{product.category}</p>
        )}

        <div className="product-price">₹{product.price}</div>

        {/* ACTIONS */}
        <div className="product-actions">
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* <button className="view-btn" onClick={handleViewProduct}>
            View
          </button> */}
        </div>
      </div>
    </div>
  );
}
