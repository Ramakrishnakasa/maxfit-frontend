import React, { useEffect, useState } from "react";
import api from "../services/api";
import CategoryRow from "./CategoryRow";

export default function CategoryRows() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  }

  return (
    <>
      {categories.map((cat) => (
        <CategoryRow key={cat.id} category={cat} />
      ))}
    </>
  );
}
