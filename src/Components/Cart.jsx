import React, { useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Cart = () => {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total using offerprice if available, otherwise use orginalprice
  const total = cartItems.reduce((sum, item) => {
    const priceString = item.offerprice || item.orginalprice || "₹0";
    const price = typeof priceString === "string"
      ? parseFloat(priceString.replace("₹", ""))
      : 0;
    return sum + item.quantity * price;
  }, 0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const totalAmount = cartItems.reduce((sum, item) => {
      const priceString = item.offerprice || item.orginalprice || "₹0";
      const price = typeof priceString === "string"
        ? parseFloat(priceString.replace("₹", ""))
        : 0;
      return sum + item.quantity * price;
    }, 0);

    const options = {
      key: "rzp_test_iGbSUFbbnkBoAb",
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      name: "SreeMart",
      description: "Thank you for shopping!",
      handler: function (response) {
        alert("✅ Payment Successful! ID: " + response.razorpay_payment_id);
        clearCart();
        navigate("/");
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#0a7cff",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
   
   <>
   <Navbar/>
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>🛒 No items in the cart.</p>
          <button className="back-home-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => {
            const price = item.offerprice || item.orginalprice;
            return (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} />
                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p className="price">{price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <h3 className="total">Total: ₹{total.toFixed(2)}</h3>
          <button className="pay-now-btn" onClick={handlePayment}>
            Pay Now
          </button>
          <button className="back-home-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      )}
    </div>
   </>
  );
};

export default Cart;
