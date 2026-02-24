import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import "./App.css";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/search" element={<Search />} />
         <Route path="/products/:prodId" element={<ProductDetail />} />
         <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}