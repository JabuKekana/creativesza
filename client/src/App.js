import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from "./components/Navbar";
import { CartProvider } from './components/CartContext';
import { Helmet } from 'react-helmet-async';
import { HelmetProvider } from 'react-helmet-async';
import "./App.css";

import ProductList from './components/ProductList';
import Cart from './components/Cart';


// HOME PAGE IMPORTS:
import ShopList from './components/ShopList';
import { Header } from './components/Header';
import { CTA } from './components/CTA';
import { Article } from './components/Article';
import { Footer } from './components/Footer';
import Featured  from './components/Featured';
import CreativesHub  from './components/CreativesHub';
import SignUpForm from './components/SignUpForm';


// NEW SUPER ADMIN COMPONENTS:
import SuperAdminShopList from './components/SuperAdmin/SuperAdminShopList';
import SuperAdminShopDetails from './components/SuperAdmin/SuperAdminShopDetails';
import SuperAdminBlog from './components/SuperAdmin/SuperAdminBlog';


import CreativesHubProducts from './components/CreativesHubProducts';



function Home() {
  return (
    <>
    <Helmet>
        <title>Creatives SA - Home</title>
      </Helmet>
      <Header />
      <Featured />
      <ShopList />
      <CreativesHub/>
      <CTA />
      <Article />
      <Footer /> 
    </>
  );
}

function App() {
  return (
    <Router>
      <HelmetProvider>
        <CartProvider>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop/:shop_id" element={<ProductList />} />
              <Route path="/creatives-hub-products" element={<CreativesHubProducts />} />
              <Route path="/superadmin/shops" element={<SuperAdminShopList />} />
              <Route path="/superadmin/shops/:shop_id" element={<SuperAdminShopDetails />} />
              <Route path="/superadmin/blogs" element={<SuperAdminBlog />} />
            </Routes>
          </div>
        </CartProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
