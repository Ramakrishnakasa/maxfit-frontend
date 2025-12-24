import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductCard from "./ProductCard";
import "../styles/featured-products.css";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeatured();
  }, []);

  async function fetchFeatured() {
    try {
      const res = await api.get("/products/featured");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch featured products", err);
    }
  }

  if (products.length === 0) return null;

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>Featured Products</h2>
        <button
          className="view-all"
          onClick={() => navigate("/products")}
        >
          View All
        </button>
      </div>

      <div className="featured-grid">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
