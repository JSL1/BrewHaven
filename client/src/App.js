import RouteSwitch from './RouteSwitch';
import { Router } from 'react-router';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router';
function App() {
  
  return (
    <>  
    <BrowserRouter>
        <Header />
          <RouteSwitch />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;