import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import "../styles/categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategoryId = searchParams.get("category"); // from URL

  // Fetch categories from backend
  async function fetchCategories() {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle click on category card
  function handleCategoryClick(categoryId) {
    navigate(`/products?category=${categoryId}`);
  }

  return (
    <div className="categories-container">
      <h2 className="categories-title">Shop by Category</h2>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`category-card ${
              activeCategoryId === String(cat.id) ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
