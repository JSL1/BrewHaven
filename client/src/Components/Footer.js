import '../App.css';
import {
  Coffee,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

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
            <span>
              <Coffee size={20} />
            </span>
            BrewHaven
          </div>

          <p>
            Fresh coffee, tea and baked goods made for every kind of day.
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
          <p>Espresso</p>
          <p>Cold Drinks</p>
          <p>Tea</p>
          <p>Fresh Bakery</p>
        </div>


        <div>
          <h4>Company</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Rewards</p>
          <p>Contact Us</p>
        </div>


        <div>
          <h4>Get in Touch</h4>

          <p>
            <MapPin size={16} />
            111 Cafe Street, Ontario
          </p>

          <p>
            <Phone size={16} />
            (123) 456-7891
          </p>

          <p>
            <Mail size={16} />
            info@brewhaven.com
          </p>
        </div>

      </div>


      <div className="footer-bottom">
        <span>
          © 2026 BrewHaven Inc.
        </span>

        <div>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;