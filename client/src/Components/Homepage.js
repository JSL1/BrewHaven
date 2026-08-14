import React, { Component } from 'react';
import './../App.css';
import Menu from '../pages/menu';
import ProductDetails from '../pages/ProductDetails';


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


const Homepage = () => {
    return (

    <div className="App">
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="tag">Now offering custom craft roasts</div>

          <h1>
            Crafting moments,
            <br />
            one perfect cup at a
            <br />
            time
          </h1>

          <p>
            Lorem ipsum dolor sit amet. Sit voluptatem explicabo ut eveniet
            consequuntur non consectetur enim At veniam labore qui enim
            necessitatibus est expedita excepturi eos atque harum.
          </p>

          <div className="hero-buttons">
            <button className="order-button">Order Now →</button>
            <button className="browse-button">Browse Menu</button>
          </div>
        </div>

        <div className="hero-image">
          <img src="/images/hero.jpg" alt="Latte"/>
        </div>
      </section>

      <section className="featured" id="menu">
        <h2>Featured Barista Specialties</h2>

        <div className="product-grid">

          <div className="product-card">

            <div className="product-image">
              <img src="/images/coffee1.png" alt="Coffee 1"/>
            </div>

            <div className="product-info">
              <h3>Lorem ipsum dolor</h3>
              <span className="price">$5.75</span>
              <p>
                Lorem ipsum dolor sit amet. Sit voluptatem explicabo ut
                eveniet consequuntur non consectetur enim.
              </p>
              <button>Add to Cart ＋</button>
            </div>
          </div>

          <div className="product-card">

            <div className="product-image">
              <img src="/images/coffee2.png" alt="Coffee 2"/>
            </div>

            <div className="product-info">
              <h3>Lorem ipsum dolor</h3>
              <span className="price">$6.25</span>
              <p>
                Lorem ipsum dolor sit amet. Sit voluptatem explicabo ut
                eveniet consequuntur non consectetur enim.
              </p>
              <button>Add to Cart ＋</button>
            </div>
          </div>

          <div className="product-card">

            <div className="product-image">
              <img src="/images/coffee3.jpg" alt="Coffee 3"/>
            </div>

            <div className="product-info">
              <h3>Lorem ipsum dolor</h3>
              <span className="price">$4.95</span>
              <p>
                Lorem ipsum dolor sit amet. Sit voluptatem explicabo ut
                eveniet consequuntur non consectetur enim.
              </p>
              <button>Add to Cart ＋</button>
            </div>
          </div>

        </div>
      </section>

      <section className="categories">
        <h2>Popular Menu Categories</h2>

        <div className="category-grid">

          <div className="category">
            <div className="category-image">Image</div>
            <span>15 choices</span>
            <p>Cold Drinks →</p>
          </div>

          <div className="category">
            <div className="category-image">Image</div>
            <span>12 choices</span>
            <p>Iced Coffees →</p>
          </div>

          <div className="category">
            <div className="category-image">Image</div>
            <span>8 choices</span>
            <p>Tea →</p>
          </div>

          <div className="category">
            <div className="category-image">
              <img src="/images/bakery.jpg" alt="bakery"/>
            </div>
            <span>14 choices</span>
            <p>Fresh Bakery →</p>
          </div>

        </div>
      </section>

      <section className="difference">
        <p className="small-title">The BrewHaven Difference</p>
        <h2>What Makes Our Craft Stand Out</h2>

        <div className="difference-grid">

          <div className="difference-card">
            <div className="icon">
              <Coffee size={22} />
            </div>
            <h3>Fresh Ingredients</h3>
            <p>
              Lorem ipsum dolor sit amet. Sit voluptatem explicabo ut eveniet
              consequuntur non consectetur enim.
            </p>
          </div>

          <div className="difference-card">
            <div className="icon">
              <Truck size={22} />
            </div>
            <h3>Fast Delivery</h3>
            <p>
              Lorem ipsum dolor sit amet. Sit voluptatem explicabo ut eveniet
              consequuntur non consectetur enim.
            </p>
          </div>

          <div className="difference-card">
            <div className="icon">
              <Gift size={22} />
            </div>
            <h3>Rewards Program</h3>
            <p>
              Lorem ipsum dolor sit amet. Sit voluptatem explicabo ut eveniet
              consequuntur non consectetur enim.
            </p>
          </div>

        </div>
      </section>

      

    </div>
    );
}

export default Homepage;