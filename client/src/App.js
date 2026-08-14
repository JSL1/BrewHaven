import './App.css';
import { useState } from 'react';
import Menu from './pages/menu';
import ProductDetails from './pages/ProductDetails';


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

function App() {
  const [page, setPage] = useState(
    window.location.hash === '#menu' ? 'menu' : 'home'
  );

  if (page === 'menu') {
    return <Menu />;
  }

  if (page === 'product-details') {
    return <ProductDetails />;
  }

  return (
    <div className="App">

      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">
            <Coffee size={20} />
          </span>
          BrewHaven
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu" onClick={() => setPage('menu')}>Menu</a>
          <a href="#product" onClick={() => setPage('product-details')}>Product</a>
          <a href="#rewards">Rewards</a>
          <a href="#orders">Orders</a>
          <a href="#profile">Profile</a>
          <button className="cart">Cart (2)</button>
        </div>
      </nav>

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

    </div>
  );
}

export default App;