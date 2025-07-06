import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';
import { CartProvider } from './CartContext';


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <CartProvider>
      

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/*  Footer shown on all pages */}
      <Footer />
    </CartProvider>
  );
};

export default App;
