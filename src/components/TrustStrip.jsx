import React from "react";
import "../styles/trust-strip.css";

export default function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="trust-item">
        <span className="trust-icon">🚚</span>
        <div>
          <div className="trust-title">Free Shipping</div>
          <div className="trust-sub">On orders above ₹1499</div>
        </div>
      </div>

      <div className="trust-item">
        <span className="trust-icon">🔒</span>
        <div>
          <div className="trust-title">Secure Payments</div>
          <div className="trust-sub">100% safe checkout</div>
        </div>
      </div>

      <div className="trust-item">
        <span className="trust-icon">💯</span>
        <div>
          <div className="trust-title">Authentic Products</div>
          <div className="trust-sub">Direct from brands</div>
        </div>
      </div>

      <div className="trust-item">
        <span className="trust-icon">↩</span>
        <div>
          <div className="trust-title">Easy Returns</div>
          <div className="trust-sub">Hassle-free policy</div>
        </div>
      </div>
    </section>
  );
}
