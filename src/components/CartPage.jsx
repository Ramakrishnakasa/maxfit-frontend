import "../styles/cart.css";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalAmount,
  } = useCart();

  const navigate = useNavigate();

  async function handlePlaceOrder() {
    if (cart.length === 0) return;

    const orderRequest = {
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      await api.post("/orders", orderRequest);
      clearCart();
      navigate("/orders"); // or order success page
    } catch (err) {
      alert("Failed to place order. Please try again.");
      console.error(err);
    }
  }

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is empty</div>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      {cart.map((item) => (
        <div className="cart-item" key={item.productId}>
          <div className="cart-item-info">
            <h4>{item.name}</h4>
            <p>Price: ₹{item.price}</p>
            <p>Subtotal: ₹{item.price * item.quantity}</p>
          </div>

          <div className="cart-quantity">
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity - 1)
              }
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

          <button
            className="cart-remove-btn"
            onClick={() => removeFromCart(item.productId)}
          >
            Remove
          </button>
        </div>
      ))}

      <hr className="cart-divider" />

      <div className="cart-summary">
        <div className="cart-total">Total: ₹{totalAmount}</div>
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
