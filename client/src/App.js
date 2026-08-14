import RouteSwitch from './RouteSwitch';
import { Router } from 'react-router';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './css/Main.css';

function App() {
  return (
    <>
        <Header />
          <RouteSwitch />
        <Footer />
    </>
  );
}

export default App;
