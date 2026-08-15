import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";
import Menu from "./pages/menu";
import ProductDetails from "./pages/ProductDetails";

const RouteSwitch = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/menu' element={<Menu />} /> 
            <Route path='/productdetails' element={<ProductDetails />}/>
        </Routes>
    );
}

export default RouteSwitch;