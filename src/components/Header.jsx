// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { isLoggedIn, getUserRole } from "../utils/auth";
import { useCart } from "../context/CartContext";

export default function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const loggedIn = isLoggedIn();
  const role = getUserRole();

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="header__container">

        {/* Brand */}
        <Link to="/" className="brand">
          <div className="brand__logo">MF</div>
          <div className="brand__text">
            <div className="brand__title">MaxFit Market</div>
            <div className="brand__subtitle">
              Supplements • Gear • Nutrition
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="nav">
          <Link className="nav__link" to="/products">
            Products
          </Link>

          <nav className="nav">
            <Link className="nav_link" to= "/categories">
              Categories
            </Link>

          
          </nav>

         

          {loggedIn && role === "ADMIN" && (
            <>
              <button
                className="nav__link"
                onClick={() => navigate("/admin/products")}
              >
                Admin Products
              </button>

              <button
                className="nav__link"
                onClick={() => navigate("/admin/add-product")}
              >
                Add Product
              </button>
            </>
          )}
        </nav>
         {/* 🛒 Cart */}
          <Link className="nav__link cart-link" to="/cart">
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
{loggedIn && (
  <Link className="nav__link" to="/orders">
    My Orders
  </Link>
)}

        {/* Auth actions */}
        <div className="actions__auth">
          {!loggedIn ? (
            <>
              <button className="btn" onClick={() => navigate("/login")}>
                Login
              </button>
              <button
                className="btn btn--secondary"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </>
          ) : (
            <button className="btn btn--danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
