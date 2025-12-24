import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductCard from "./ProductCard";
import "../styles/category-row.css";

export default function CategoryRow({ category }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category.id]);

  async function fetchCategoryProducts() {
    try {
      const res = await api.get("/products", {
        params: { categoryId: category.id, size: 4 },
      });
      setProducts(res.data?.content || []);
    } catch (err) {
      console.error("Failed to load products for", category.name, err);
    }
  }

  if (products.length === 0) return null;

  return (
    <section className="category-row">
      <div className="category-row-header">
        <h3>{category.name}</h3>
        <button onClick={() => navigate(`/products?category=${category.id}`)}>
          View all
        </button>
      </div>

      <div className="category-row-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
