import RouteSwitch from "./RouteSwitch";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

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