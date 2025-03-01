import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Navbar from "./components/navbar/Navbar"
import {Routes, Route} from "react-router-dom"
import Shoes from "./components/shoes/Shoes"
import Men from "./components/men/Men"
import Women from "./components/women/Women"
import Cart from "./components/cart/Cart"
import About from "./components/about/About"
import CartContextProvider from "./contexts/CartContext"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Checkout from "./components/checkout/Checkout"
import ScrollToTop from "./components/scrollToTop"

function App() {
  return (
    <>
    <CartContextProvider>
      <Navbar />
      <Routes>
      <Route index element={<Home />} />
      <Route path="/shoes" element={<Shoes />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
      <ScrollToTop />
      </CartContextProvider>
    </>
  )
}

export default App
