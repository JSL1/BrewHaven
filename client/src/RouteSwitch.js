import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";

const RouteSwitch = () => {
    <Routes>
        <Route path='/' element={<Homepage />}/>
    </Routes>
}

export default RouteSwitch;