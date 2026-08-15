import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";
import Menu from "./pages/menu";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

const RouteSwitch = () => {
    const [cart, setCart] = useState([]);
    
    return (
        <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />}/>
            <Route path='/menu' element={<Menu cart={cart} setCart={setCart} />}/> 
            <Route path='/productdetails' element={<ProductDetails />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/orders' element={<Orders />}/>
        </Routes>
    );
}

export default RouteSwitch;