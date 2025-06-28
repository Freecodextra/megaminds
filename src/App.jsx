import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Navbar from "./components/navbar/Navbar"
import {Routes, Route} from "react-router-dom"
import Products from "./components/all-products/Products"
import Cart from "./components/cart/Cart"
import About from "./components/about/About"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Checkout from "./components/checkout/Checkout"
import ScrollToTop from "./components/scrollToTop"
import AppContextProvider from "./contexts/AppContext"
import ProductDetails from "./components/products/ProductDetails"; 
import { Toaster } from "react-hot-toast"
import Profile from "./components/profile/Profile"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AppContextProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/all-products" element={<Products />} />
          <Route path="/accessories" element={<Products category="accessories" />} />
          <Route path="/men" element={<Products category="men" />} />
          <Route path="/women" element={<Products category="women" />} />
          <Route path="/shoes" element={<Products category="shoes" />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
        <ScrollToTop />
      </AppContextProvider>
    </>
  )
}

export default App
