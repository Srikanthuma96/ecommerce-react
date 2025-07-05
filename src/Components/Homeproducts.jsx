import React, { useRef, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../CartContext";

const Homeproducts = ({ searchTerm = "", onEmpty }) => {
  const { cartItems, addToCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const showAlert = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const products = [
    {
      id: "p1",
      img: "https://i1.zopping.com/zopsmart-media/24019/images/320/20240709/b78f0cdf-d2b9-4f2b-92eb-ed4b267b142a-SKU0327482.webp",
      discount: "10% off",
      name: "Tomato Local-Tamatar",
      orginalprice: "₹100",
      offerprice: "₹90",
    },
    {
      id: "p2",
      img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240326/e342dd87-d5e1-41c8-b733-40c239e8fd72-032756.webp",
      discount: "05% off",
      name: "Onion Red-Ullipaya",
      orginalprice: "₹50",
      offerprice: "₹45",
    },
    {
      id: "p3",
      img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240326/3583155e-09fc-435c-ae09-73b6da1db81e-PV032740.webp",
      discount: "15% off",
      name: "Potato-Aloo",
      orginalprice: "₹120",
      offerprice: "₹105",
    },
    {
      id: "p4",
      img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240128/SKU018707-20240128-070812.webp",
      discount: "10% off",
      name: "Heritage Curd",
      orginalprice: "₹50",
      offerprice: "₹40",
    },
    {
      id: "p5",
      img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240313/SKU002212-20240313-115418.webp",
      name: "Idly Rava",
      discount: "05% off",
      orginalprice: "₹80",
      offerprice: "₹75",
    },
    {
      id: "p6",
      img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240206/SKU018723-20240206-053348.webp",
      name: "Paneer",
      discount: "20% off",
      orginalprice: "₹100",
      offerprice: "₹80",
    },
    {
      id: "p7",
      img: "https://i1.zopping.com/zopsmart-media/24019/images/320/20240705/2faace50-1722-4f94-aa13-ef2bdbf4092e-SKU002203.webp",
      name: "Vijetha Whole Wheat Atta-5 kg",
      discount: "05% off",
      orginalprice: "₹210",
      offerprice: "₹205",
    },
    {
      id: "p8",
      img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240319/SKU000880-20240319-090049.webp",
      name: "Maggie",
      discount: "10% off",
      orginalprice: "₹102",
      offerprice: "₹91",
    },
    {
      id: "p9",
      img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240319/SKU005048-20240319-115926.webp",
      name: "Vim-Soap",
      discount: "03% off",
      orginalprice: "₹16",
      offerprice: "₹12",
    },
    {
      id: "p10",
      img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240128/SKU013843-20240128-070952.webp",
      name: "Milk",
      discount: "05% off",
      orginalprice: "₹35",
      offerprice: "₹30",
    },
    {
      id: "p11",
      img: "https://i1.zopping.com/zopping-uploads/24019/images/320/20240128/SKU002073-20240128-071409.webp",
      name: "Rice Kurnool",
      discount: "20% off",
      orginalprice: "₹1500",
      offerprice: "₹1350",
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sliderWrapRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const imagesToShow = 6;
  const maxIndex = Math.max(0, filteredProducts.length - imagesToShow);

  useEffect(() => {
    if (sliderWrapRef.current) {
      sliderWrapRef.current.style.transform = `translateX(-${index * 370}px)`;
    }
  }, [index, filteredProducts]);

  useEffect(() => {
    if (onEmpty) {
      onEmpty(searchTerm && filteredProducts.length === 0);
    }
  }, [searchTerm, filteredProducts, onEmpty]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === "ArrowLeft" && index > 0) {
        setIndex(prev => prev - 1);
      } else if (e.key === "ArrowRight" && index < maxIndex) {
        setIndex(prev => prev + 1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [index, maxIndex, isHovered]);

  const moveNext = () => {
    if (index < maxIndex) setIndex(prev => prev + 2);
  };

  const movePrev = () => {
    if (index > 0) setIndex(prev => prev - 2);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showAlert();
  };

  return (
    <div className="products-container">
      {showPopup && <div className="popup-message">✅ Item added to cart!</div>}

      {filteredProducts.length > imagesToShow ? (
        <>
          <button onClick={movePrev} className="slider-button left">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div
            className="products-slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="products-wrap" ref={sliderWrapRef}>
              {filteredProducts.map(product => {
                const cartItem = cartItems.find(item => item.id === product.id);
                return (
                  <div className="product-card" key={product.pid}>
                    <img src={product.img} alt={product.name} />
                    {product.discount && <p className="product-discount">{product.discount}</p>}
                    <h4>{product.name}</h4>
                    <h5 className="original-price">{product.orginalprice}</h5>
                    <h6 className="offer-price">{product.offerprice}</h6>

                    {!cartItem ? (
                      <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
                    ) : (
                      <div className="quantity-controls">
                        <button onClick={() => decrementQuantity(product.id)}>
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span>{cartItem.quantity}</span>
                        <button onClick={() => incrementQuantity(product.id)}>
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={moveNext} className="slider-button right">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      ) : (
        <div className="products-wrap no-slider">
          {filteredProducts.map(product => {
            const cartItem = cartItems.find(item => item.id === product.id);
            return (
              <div className="product-card" key={product.id}>
                <img src={product.img} alt={product.name} />
                {product.discount && <p className="product-discount">{product.discount}</p>}
                <h4>{product.name}</h4>
                <h5 className="original-price">{product.orginalprice}</h5>
                <h6 className="offer-price">{product.offerprice}</h6>

                {!cartItem ? (
                  <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button onClick={() => decrementQuantity(product.id)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => incrementQuantity(product.id)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Homeproducts;
