import React, { useRef, useState, useEffect, useContext } from "react";
import Homeproducts from "./Homeproducts";
import Homesnacks from "./Homesnacks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import posterImage from "../Assets/image.png";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductsEmpty, setIsProductsEmpty] = useState(false);
  const [isSnacksEmpty, setIsSnacksEmpty] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const sliderWrapRef = useRef(null);

  const brands = [
    "https://i1.zopping.com/zopsmart-media/24019/images/320/20240627/529e0777-759b-43e6-b991-b35897d1eee6-1024X1024SQUARE.webp",
    "https://i1.zopping.com/zopsmart-media/24019/images/320/20240410/e5be13b5-f693-41ba-a210-4a9e874926ac-bambino.webp",
    "https://i1.zopping.com/zopsmart-media/24019/images/320/20240410/6216c6f9-b27e-4922-8844-80dfee83cc83-haldirams.webp",
    "https://i1.zopping.com/zopsmart-media/24019/images/320/20240410/a7f7ef73-852e-41f9-afa1-bdc8051f3c4a-heritage.webp",
    "https://i1.zopping.com/zopsmart-media/24019/images/320/20240410/c707692a-9987-4566-a6df-f1a66b84b49e-Cadburylogonew.webp",
    "https://i1.zopping.com/zopsmart-media/24019/images/320/20240410/6336e00c-3411-4319-aaa8-e3876339c4d2-kwal.webp",
    "https://i1.zopping.com/zopsmart-media/24019/images/320/20240410/b96611b4-b93f-4eb5-aae8-a3269e9a9855-cocacola.webp",
    "https://i1.zopping.com/zopsmart-media/24019/images/320/20240410/b4f10cd9-121c-48b8-8dba-e639a7755710-amul.webp",
  ];

  const imagesToShow = 6;
  const maxIndex = brands.length - imagesToShow;

  useEffect(() => {
    if (sliderWrapRef.current) {
      sliderWrapRef.current.style.transform = `translateX(-${index * 515}px)`;
    }
  }, [index]);

  useEffect(() => {
    if (
      searchTerm.trim() !== "" &&
      isProductsEmpty &&
      isSnacksEmpty &&
      !hasAlerted
    ) {
      alert("No matching products or snacks found.");
      setHasAlerted(true);
    }
  }, [searchTerm, isProductsEmpty, isSnacksEmpty, hasAlerted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;

      if (e.key === "ArrowLeft" && index > 0) {
        setIndex((prevIndex) => prevIndex - 1);
      } else if (e.key === "ArrowRight" && index < maxIndex) {
        setIndex((prevIndex) => prevIndex + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, maxIndex, isHovered]);

  useEffect(() => {
    setHasAlerted(false);
  }, [searchTerm]);

  const moveNext = () => {
    if (index < maxIndex) setIndex((prevIndex) => prevIndex + 2);
  };

  const movePrev = () => {
    if (index > 0) setIndex((prevIndex) => prevIndex - 2);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

     

      {searchTerm ? (
        <div className="search-result-container">
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>
            Search Results for: <em>{searchTerm}</em>
          </h2>
          <div className="search-grid">
            <Homeproducts
              searchTerm={searchTerm}
              setIsProductsEmpty={setIsProductsEmpty}
            />
            <Homesnacks
              searchTerm={searchTerm}
              setIsSnacksEmpty={setIsSnacksEmpty}
            />
          </div>
        </div>
      ) : (
        <div>
          {/* Brand Slider */}
          <h1 className="main-element">Our Brands</h1>
          <div className="slider-container">
            <button onClick={movePrev} className="slider-button">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div
              className="slider"
              tabIndex={0}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
            >
              <div className="slider-wrap" ref={sliderWrapRef}>
                {brands.map((img, i) => (
                  <img src={img} key={i} alt={`brand-${i}`} />
                ))}
              </div>
            </div>

            <button onClick={moveNext} className="slider-button">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Poster Section */}
          <div className="poster">
            <img src={posterImage} alt="poster" />
          </div>

          {/* Product Section */}
          <div className="product-heading">
            <h1>Our Products</h1>
          </div>
          <Homeproducts
            searchTerm={searchTerm}
            setIsProductsEmpty={setIsProductsEmpty}
          />

          {/* Snack Section */}
          <div className="Snacks-heading">
            <h1>Our Snacks</h1>
          </div>
          <Homesnacks
            searchTerm={searchTerm}
            setIsSnacksEmpty={setIsSnacksEmpty}
          />


          {/* Floating Cart Button */}
          
          <button className="floating-cart-btn"onClick={() => navigate("/cart")}>
            🛒 Cart ({totalItems})
          </button>
        </div>
      )}
    </>
  );
};

export default Home;



