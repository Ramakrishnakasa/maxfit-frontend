import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Banner() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [index, setIndex] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const HERO_BG =
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2000&q=80";

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  async function fetchFeaturedProducts() {
    try {
      const res = await api.get("/products/featured");
      setFeatured(res.data || []);
    } catch (err) {
      console.error("Failed to fetch featured products", err);
    }
  }

  // Auto slide
  useEffect(() => {
    if (featured.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured]);

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (featured.length === 0) return null;
  const product = featured[index];

  return (
    <section className="relative h-[420px] lg:h-[520px] overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `linear-gradient(
            rgba(8,10,18,0.65),
            rgba(8,10,18,0.65)
          ), url('${HERO_BG}')`,
          transform: `translateY(${offsetY}px)`,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
         {/* LEFT TEXT */}
<div className="text-white">
  <h1
    key={`title-${product.id}`}
    className="text-4xl lg:text-5xl font-extrabold animate-title"
  >
    {product.name}
  </h1>

  <p
    key={`desc-${product.id}`}
    className="mt-4 max-w-xl text-white/90 line-clamp-3 animate-desc"
  >
    {product.description}
  </p>

  <div
    key={`cta-${product.id}`}
    className="mt-6 flex gap-4 animate-cta"
  >
    <button
      onClick={() => navigate(`/products/${product.id}`)}
      className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-md font-semibold transition"
    >
      Buy Now – ₹{product.price}
    </button>

    <button
      onClick={() => navigate("/products")}
      className="px-5 py-3 border border-white/30 rounded-md hover:bg-white/10 transition"
    >
      View All
    </button>
  </div>
</div>

          {/* RIGHT PRODUCT CARD */}
          <div className="hidden lg:flex justify-end">
            <div
              key={product.id} // 🔥 forces animation on slide change
              className="bg-white rounded-xl p-5 shadow-2xl w-[320px] 
                         animate-floatIn hover:-translate-y-1 transition"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-56 object-contain mb-4"
              />

              <div className="font-semibold text-lg">{product.name}</div>

              <div className="mt-1 text-gray-600 truncate">
                {product.description}
              </div>

              <div className="mt-3 text-xl font-bold">
                ₹{product.price}
              </div>

              {/* RESTORED VIEW PRODUCT BUTTON */}
              <button
                onClick={() => navigate(`/products/${product.id}`)}
                className="mt-4 w-full py-2.5 bg-black text-white rounded-md hover:bg-gray-900 transition"
              >
                View Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
