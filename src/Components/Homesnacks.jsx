import React, { useRef, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../CartContext";

const Homesnacks = ({ searchTerm = "", onEmpty }) => {
  const { cartItems, addToCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const showAlert = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const snacks = [
    { id: "s1", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240122/SKU011211-20240122-175135.webp", name: "Popular Palli Laddu", orginalprice: "₹60",
price: "₹60",
},
    { id: "s2", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240128/SKU034369-20240128-074155.webp", name: "Popular Palli Chikki", orginalprice: "₹60",
price: "₹60",
},
    { id: "s3", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240319/SKU011218-20240319-091223.webp", name: "Popular Chana", orginalprice: "₹60",
price: "₹60",
},
    { id: "s4", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240128/SKU011212-20240128-074201.webp", name: "Popular Til Chikki", orginalprice: "₹60",
price: "₹60",
},
    { id: "s5", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240122/SKU000981-20240122-160922.webp", name: "Popular Khara", orginalprice: "₹60",
price: "₹60",
},
    { id: "s6", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240128/SKU016679-20240128-074144.webp", name: "Popular Khara Dal Chakodi", orginalprice: "₹60",
price: "₹60",
},
    { id: "s7", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240122/SKU016676-20240122-183511.webp", name: "Popular Khara Yellow Chakodi", orginalprice: "₹60",
price: "₹60",
},
    { id: "s8", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240122/SKU034370-20240122-122609.webp", name: "Popular Special Murmura Laddu", orginalprice: "₹60",
price: "₹60",
},
    { id: "s9", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240319/SKU011217-20240319-120223.webp", name: "Popular Batana", orginalprice: "₹60",
price: "₹60",
},
    { id: "s10", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240319/SKU016685-20240319-094128.webp", name: "Popular Khara Corn Flakes Mixture", orginalprice: "₹60",
price: "₹60",
 },
    { id: "s11", img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240319/SKU011230-20240319-093850.webp", name: "Popular Butter Chakli", orginalprice: "₹60",
price: "₹60",
},
  ];

  const filteredSnacks = snacks.filter(snack => snack.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const sliderWrapRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const imagesToShow = 6;
  const maxIndex = Math.max(0, filteredSnacks.length - imagesToShow);

  useEffect(() => {
    if (onEmpty) onEmpty(searchTerm && filteredSnacks.length === 0);
  }, [searchTerm, filteredSnacks, onEmpty]);

  useEffect(() => {
    if (sliderWrapRef.current && filteredSnacks.length > imagesToShow) {
      sliderWrapRef.current.style.transform = `translateX(-${index * 445}px)`;
    }
  }, [index, filteredSnacks]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        setIndex(prev => prev - 1);
      } else if (e.key === "ArrowRight" && index < maxIndex) {
        e.preventDefault();
        setIndex(prev => prev + 1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [index, maxIndex, isHovered]);

  const movePrev = () => { if (index > 0) setIndex(index - 1); };
  const moveNext = () => { if (index < maxIndex) setIndex(index + 1); };

 const handleAddToCart = (snack) => {
  const snackWithQuantity = { ...snack, quantity: 1, price: snack.orginalprice };
  addToCart(snackWithQuantity);
  showAlert();
};



  const getQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="products-container">
      {showPopup && (
        <div style={{
          backgroundColor: "green",
          color: "white",
          position: "fixed",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          borderRadius: "8px",
          zIndex: 9999,
        }}>
          ✅ Item added to cart!
        </div>
      )}

      {filteredSnacks.length > imagesToShow ? (
        <>
          <button onClick={movePrev} className="slider-button">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="products-slider" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="products-wrap" ref={sliderWrapRef}>
              {filteredSnacks.map(snack => {
                const quantity = getQuantity(snack.id);
                return (
                  <div className="snacks-card" key={snack.id}>
                    <img src={snack.img} alt={snack.name} />
                    <h4>{snack.name}</h4>
                    <h5 className="original-price">{snack.orginalprice}</h5>
                    {quantity === 0 ? (
                      <button className="add-to-cart-btn" onClick={() => handleAddToCart(snack)}>Add to Cart</button>
                    ) : (
                      <div className="quantity-controls">
                        <button onClick={() => decrementQuantity(snack.id)}><FontAwesomeIcon icon={faMinus} /></button>
                        <span>{quantity}</span>
                        <button onClick={() => incrementQuantity(snack.id)}><FontAwesomeIcon icon={faPlus} /></button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={moveNext} className="slider-button">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      ) : (
        <div className="products-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {filteredSnacks.length > 0 ? (
            filteredSnacks.map(snack => {
              const quantity = getQuantity(snack.id);
              return (
                <div className="snacks-card" key={snack.id}>
                  <img src={snack.img} alt={snack.name} />
                  <h4>{snack.name}</h4>
                  <h5 className="original-price">{snack.orginalprice}</h5>
                  {quantity === 0 ? (
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(snack)}>Add to Cart</button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => decrementQuantity(snack.id)}><FontAwesomeIcon icon={faMinus} /></button>
                      <span>{quantity}</span>
                      <button onClick={() => incrementQuantity(snack.id)}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="no-results-message">No matching snacks found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Homesnacks;
