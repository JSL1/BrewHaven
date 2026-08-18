import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './../App.css';
import { Coffee, Truck, Gift } from 'lucide-react';

const Homepage = () => {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="tag">Now offering custom craft roasts</div>
          <h1>
            Crafting moments,<br />
            one perfect cup at a<br />
            time.
          </h1>
          <p>Fresh coffee, tea and baked goods made for every kind of day.</p>
          <div className="hero-buttons">
            <a href="/menu">
              <button className="order-button">Order Now</button>
            </a>
            <a href="/menu">
              <button className="browse-button">Browse Menu</button>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero.jpg" alt="Latte" />
        </div>
      </section>

      <section className="featured" id="menu">
        <h2>Featured Barista Specialties</h2>
        <div className="product-grid">
          <div className="product-card">
            <div className="product-image">
              <img src="/images/coffee1.png" alt="Iced Caramel Latte" />
            </div>

            <div className="product-info">
              <h3>Iced Caramel Latte</h3>
              <span className="price">$5.75</span>
              <p>Espresso, milk, caramel and ice.</p>
              <a href="/menu">
                <button>View Menu</button>
              </a>
            </div>
          </div>


          <div className="product-card">
            <div className="product-image">
              <img src="/images/coffee2.png" alt="Vanilla Latte" />
            </div>

            <div className="product-info">
              <h3>Vanilla Latte</h3>
              <span className="price">$6.25</span>
              <p>Espresso with steamed milk and vanilla.</p>
              <a href="/menu">
                <button>View Menu</button>
              </a>
            </div>
          </div>


          <div className="product-card">
            <div className="product-image">
              <img src="/images/coffee1.png" alt="Iced Coffee" />
            </div>

            <div className="product-info">
              <h3>Iced Coffee</h3>
              <span className="price">$4.95</span>
              <p>Cold coffee served over ice.</p>
              <a href="/menu">
                <button>View item</button>
              </a>
            </div>
          </div>

        </div>
      </section>


      <section className="categories">
        <h2>Popular Menu Categories</h2>

        <div className="category-grid">

          <div className="category">
            <div className="category-image category-placeholder">
              <Link to="/menu" state={{ category: "Cold Drinks"}}>
              <img src="/images/cold.jpg" alt="Cold Drinks" />
              </Link>
            </div>
            <span>4 Choices</span>
            <p>Cold Drinks</p>
          </div>

          <div className="category">
            <div className="category-image category-placeholder">
              <Link to="/menu" state={{ category: "Cold Drinks"}}>
              <img src="/images/beans.jpg" alt="Coffee" />
              </Link>
            </div>
            <span>3 Choices</span>
            <p>Coffee</p>
          </div>

          <div className="category">
          <Link to="/menu" state={{ category: "Tea"}}>
            <div className="category-image category-placeholder">
              <img src="images/teabag.png" alt="Tea" />
            </div>
            <span>3 choices</span>
            <p>Tea</p>
            </Link>
          </div>

          <div className="category">
            <Link to="/menu" state={{ category: "Bakery"}}>
            <div className="category-image">
              <img src="/images/bakery.jpg" alt="Bakery" />
            </div>
            <span>2 choices</span>
            <p>Fresh Bakery</p>
            </Link>
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
              We use fresh ingredients in our drinks and food.
            </p>
          </div>


          <div className="difference-card">
            <div className="icon">
              <Truck size={22} />
            </div>

            <h3>Fast Delivery</h3>

            <p>
              Order online and get your order delivered.
            </p>
          </div>


          <div className="difference-card">
            <div className="icon">
              <Gift size={22} />
            </div>

            <h3>Rewards Program</h3>

            <p>
              Earn rewards when you order from BrewHaven.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Homepage;