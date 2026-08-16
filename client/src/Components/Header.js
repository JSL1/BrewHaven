import { Link } from "react-router-dom";
import '../App.css';
import { Coffee } from 'lucide-react';

const Header = () => {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <span className="logo-icon">
          <Coffee size={20} />
        </span>
        BrewHaven
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/productdetails">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>

    </nav>
  );
};

export default Header;