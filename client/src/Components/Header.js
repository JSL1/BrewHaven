import React, { Component } from "react";
import { Link } from "react-router";
import '../App.css';
import {
  Coffee,
  ShoppingBag,
  Truck,
  Gift,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Header = () => {
    return (
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">
            <Coffee size={20} />
          </span>
          BrewHaven
        </div>

        <div className="nav-links">
          <Link to="./">Home</Link>
          <Link to="./menu">Menu</Link>
          <Link to="./productdetails">Products</Link>
          <Link to="./">Rewards</Link>
          <Link to="./">Orders</Link>
          <Link to="./">Profile</Link>
          <button className="cart">Cart (2)</button>
        </div>
      </nav>
    );
}

export default Header;