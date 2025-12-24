import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <div className="footer-logo">MF</div>
          <p className="footer-desc">
            MaxFit Market – Your trusted destination for authentic fitness
            supplements, nutrition, and gym essentials.
          </p>
        </div>

        {/* SHOP */}
        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/products">All Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products?featured=true">Featured</Link>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/orders">My Orders</Link>
          <Link to="/cart">Cart</Link>
          <a href="#">Contact Us</a>
        </div>

        {/* LEGAL */}
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MaxFit Market. All rights reserved.
      </div>
    </footer>
  );
}
