import React, { Component } from "react";
import '../App.css';
import {
  Coffee,
  ShoppingBag,
  Truck,
  Gift,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

import { 
  FaInstagram,
  FaFacebookF,
  FaTwitter
} from 'react-icons/fa';


const Footer = () => {
    return (
       <footer>
        <div className="footer-main">

          <div className="footer-about">
            <div className="footer-logo">
              <span><Coffee size={20} /></span>
              BrewHaven
            </div>

            <p>
              Lorem ipsum dolor sit amet. Sit voluptatem explicabo ut eveniet
              consequuntur non consectetur enim At veniam labore qui.
            </p>

            <div className="socials">
              <span><FaInstagram size={17} /></span>
              <span><FaFacebookF size={17} /></span>
              <span><FaTwitter size={17} /></span>
            </div>
          </div>

          <div>
            <h4>Menu</h4>
            <p>Featured Drinks</p>
            <p>Espresso Bar</p>
            <p>Cold Craft Brews</p>
            <p>Organic Teas</p>
            <p>Fresh Bakery</p>
          </div>

          <div>
            <h4>Company</h4>
            <p>Our Roast Philosophy</p>
            <p>Barista Careers</p>
            <p>Neighborhood Impact</p>
            <p>Franchise Plan</p>
            <p>Sourcing Standards</p>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <p><MapPin size={16} /> 111 cafe street, Ontario</p>
            <p><Phone size={16} /> (123) 456-7891</p>
            <p><Mail size={16} /> @brewhaven.com</p>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 BrewHaven Inc. All materials are locly hand selected.</span>

          <div>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Sitemap</span>
          </div>
        </div>
      </footer>
    );
}

export default Footer;