import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import About from "./pages/About"
import Recipes from "./pages/Recipes"
import { CartProvider } from "./context/CartContext"
import Home from "./pages/Home" 
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
          <Footer /> 
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
