// src/pages/ProductsList.jsx
import React, { useEffect, useState, useRef } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function ProductsList() {
  const navigate = useNavigate();
const [searchParams] = useSearchParams();
const categoryFromUrl = searchParams.get("category");



useEffect(() => {
  console.log(localStorage.getItem("token"));
  if (!localStorage.getItem("token")) {
    console.log("No token found, redirecting to login");
    console.log(localStorage.getItem("token"));
    navigate("/login");
  }
}, []);

  const [products, setProducts] = useState([]);
  const [pageMeta, setPageMeta] = useState({
    number: 0,
    size: 12,
    totalPages: 0,
    totalElements: 0,
  });
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState(""); // active query used for fetch
  const [pendingQ, setPendingQ] = useState(""); // immediate input value
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);

  // Core fetch function — supports page, size, and optional query
  async function fetchProducts({ page = 0, size = pageMeta.size, query = q } = {}) {
    setLoading(true);
    setError(null);

    try {
     const params = { page, size };
if (query && query.trim() !== "") params.q = query.trim();
if (categoryFromUrl) params.category = categoryFromUrl;

      const res = await api.get("/products", { params });
      const data = res.data;

      if (data && data.content) {
        // Spring Data Page object
        setProducts(data.content || []);
        setPageMeta({
          number: data.number ?? page,
          size: data.size ?? size,
          totalPages: data.totalPages ?? 0,
          totalElements: data.totalElements ?? 0,
        });
      } else if (Array.isArray(data)) {
        // backend returned a plain array
        setProducts(data);
        setPageMeta({ number: 0, size: data.length, totalPages: 1, totalElements: data.length });
      } else {
        // fallback: set whatever came back
        setProducts(data || []);
        setPageMeta({ number: 0, size: (data || []).length, totalPages: 1, totalElements: (data || []).length });
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products from server");
    } finally {
      setLoading(false);
    }
  }

  // initial load
  useEffect(() => {
  fetchProducts({ page: 0 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [categoryFromUrl]);


  // debounce pendingQ -> when user stops typing, apply as active q and fetch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setQ(pendingQ);
      fetchProducts({ page: 0, query: pendingQ });
    }, 3000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };

    
  }, [pendingQ]);

  // handlers
  function onInputChange(e) {
    setPendingQ(e.target.value);
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setQ(pendingQ);
    fetchProducts({ page: 0, query: pendingQ });
  }

  function goToPage(p) {
    if (p < 0) p = 0;
    if (p > Math.max(0, pageMeta.totalPages - 1)) p = Math.max(0, pageMeta.totalPages - 1);
    fetchProducts({ page: p, query: q });
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  // windowed page buttons (max 7 shown)
  const renderPageButtons = () => {
    const total = Math.max(1, pageMeta.totalPages);
    const windowSize = 7;
    let start = Math.max(0, pageMeta.number - Math.floor(windowSize / 2));
    let end = start + windowSize - 1;
    if (end > total - 1) {
      end = total - 1;
      start = Math.max(0, end - (windowSize - 1));
    }

    const buttons = [];
    for (let i = start; i <= end; i++) {
      const active = i === pageMeta.number;
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          style={{
            padding: "8px 10px",
            background: active ? "#ef4444" : undefined,
            color: active ? "#fff" : undefined,
            border: "1px solid #ddd",
            borderRadius: 6,
            cursor: "pointer"
          }}
          aria-current={active ? "page" : undefined}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  // placeholder cart action (replace with real CartContext)
  function onAddToCart(product) {
    // TODO: connect to CartContext and update header badge
    alert(`(placeholder) added ${product.name} to cart`);
  }

  // optional: navigate to product details page if you have one
  function openProductDetail(productId) {
    navigate(`/products/${productId}`);
  }

  return (
    <div className="container" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Products</h1>

        <form onSubmit={onSearchSubmit} style={{ display: "flex", gap: 8 }}>
          <input
            value={pendingQ}
            onChange={onInputChange}
            placeholder="Search products by name or description..."
            style={{ padding: 8, width: 320, borderRadius: 6, border: "1px solid #ddd" }}
            aria-label="Search products"
          />
          <button type="submit" style={{ padding: "8px 12px", borderRadius: 6 }}>Search</button>
        </form>
      </div>

      {loading && <div style={{ padding: 20 }}>Loading products…</div>}
      {error && <div style={{ padding: 20, color: "red" }}>{error}</div>}

      {!loading && !error && (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16
          }}>
            {products.length === 0 && <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 40 }}>No products found.</div>}
            {products.map((p) => (
              // your ProductCard expects `product` prop and an onAddToCart callback
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>

          {/* Pagination */}
          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "#666" }}>
              Showing page {pageMeta.number + 1} of {Math.max(1, pageMeta.totalPages)} — {pageMeta.totalElements} products
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => goToPage(pageMeta.number - 1)} disabled={pageMeta.number <= 0} style={{ padding: "8px 10px", borderRadius: 6 }}>
                Prev
              </button>

              {renderPageButtons()}

              <button onClick={() => goToPage(pageMeta.number + 1)} disabled={pageMeta.number >= pageMeta.totalPages - 1} style={{ padding: "8px 10px", borderRadius: 6 }}>
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
