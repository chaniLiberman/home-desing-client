import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { SetStateAction, useState } from 'react';
import About from './components/About';
import Favorites from './components/Favorites';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import ProductDetails from './components/ProductDetails';
import { ToastContainer } from 'react-toastify';
import Purchase from './components/Purchase';
import Product from './interfaces/Product';
import Accessories from './components/Accessories';
import Furnitures from './components/Furnitures';
import GardenFurniture from './components/GardenFurniture';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import SearchBar from './components/SearchBar';

export interface UserInfo {
  _id? :string,
  email: string | false,
  isAdmin: false | true,
  favorites: string[] | Product[]
}

function App() {
  let [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const jsonString = sessionStorage.getItem("userInfo");
    if (jsonString === null) {return { email : false}; }
    return JSON.parse(jsonString);
  })

  let [products, setProducts] = useState<Product[]>([]);
  let [productsChange, setProductsChange] = useState<boolean>(false);

  return (
    <div className="App">
      <div dir="rtl">
        <ToastContainer/>
      <Router>
         <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />
        <Routes>
          <Route path="/" element={<Products userInfo={userInfo} products={products} setProducts={setProducts} productsChange={productsChange} setUserInfo={setUserInfo} setProductsChange={setProductsChange}  />} />
          <Route path="/products" element={<Products userInfo={userInfo} products={products} setProducts={setProducts} productsChange={productsChange} setUserInfo={setUserInfo} setProductsChange={setProductsChange}/>}/>
          
<Route path="/products/category/אקססוריז" element={<Accessories category="אקססוריז" products={products} setProducts={setProducts} productsChange={productsChange} setProductsChange={setProductsChange} userInfo={userInfo} />} />
<Route path="/products/category/רהיטים" element={<Furnitures category="רהיטים" products={products} setProducts={setProducts} productsChange={productsChange} setProductsChange={setProductsChange} userInfo={userInfo} />} />
<Route path="/products/category/ריהוט-גן" element={<GardenFurniture category="ריהוט-גן" products={products} setProducts={setProducts} productsChange={productsChange} setProductsChange={setProductsChange} userInfo={userInfo} />} />

          <Route path="/login" element={<Login setUserInfo={setUserInfo}/>} />
          <Route path="/register" element={<Register setUserInfo={setUserInfo}/>} />
          <Route path="/about" element={<About userInfo={userInfo}/>} />          
          <Route path="/products/update/:id" element={<UpdateProduct/>} />
          <Route path="/products/details/:id" element={<ProductDetails userInfo={userInfo}/>} />
          <Route path="/products/new" element={<AddProduct productsChanged={false} setProductsChanged={Function}/>} />
          <Route path="/favorites" element={<Favorites userInfo={userInfo}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
        <Footer userInfo={userInfo} setUserInfo={setUserInfo}/>
      </Router>
      </div>
    </div>
  );
}

export default App;

