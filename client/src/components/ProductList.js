import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ShopReviews from "./ShopReviews";
import { useCart } from "./CartContext";
import { Helmet } from 'react-helmet-async';
import { toast } from "react-toastify";
import "../styles/productlist.css";

function ProductList() {
  const { shop_id } = useParams();
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [shopBackground, setShopBackground] = useState("");
  const [shopAbout, setShopAbout] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [shopEmail, setShopEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { cart, addToCart, totalQuantity } = useCart();

  const getShopAndProducts = async () => {
    try {
      // Fetch shop details
      const shopResponse = await fetch(
        `http://localhost:5000/shops/${shop_id}`
      );
      if (!shopResponse.ok) {
        throw new Error(`HTTP error! Status: ${shopResponse.status}`);
      }
      const shopData = await shopResponse.json();
      setShopName(shopData.shop_name);
      setShopDescription(shopData.shop_description);
      setShopImage(shopData.shop_image);
      setShopBackground(shopData.shop_background);
      setShopAbout(shopData.shop_about);
      setShopAddress(shopData.shop_address);
      setShopPhone(shopData.owner_phone);
      setShopEmail(shopData.owner_email);

      // Fetch products
      const productsResponse = await fetch(
        `http://localhost:5000/products/${shop_id}`
      );
      if (!productsResponse.ok) {
        throw new Error(`HTTP error! Status: ${productsResponse.status}`);
      }
      const productsData = await productsResponse.json();
      setProducts(productsData);

      // Fetch reviews
      const reviewsResponse = await fetch(
        `http://localhost:5000/reviews/${shop_id}`
      );
      if (!reviewsResponse.ok) {
        throw new Error(`HTTP error! Status: ${reviewsResponse.status}`);
      }
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getShopAndProducts();
  }, [shop_id]);

  const handleAddReview = async (newReviewData) => {
    try {
      const response = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shop_id,
          ...newReviewData,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const addedReview = responseData;
        setReviews([...reviews, addedReview]);
        toast.success("Review added successfully!");
      } else {
        console.error("Failed to add review", responseData);
      }
    } catch (error) {
      console.error("Error adding review", error);
    }
  };

  return (
    <div
      className="product-list-section"
      style={{
        backgroundImage: `url(${shopBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <Helmet>
        <title>Creatives SA - {shopName}</title>
      </Helmet>
      {/* -------- SHOP NAV BAR STARTS -------- */}

      <nav className="shop-navbar">
        <a href="#" className="logo">
          {shopName}
        </a>
        <ul className="shop-menu">
          <li>
            <a href="#shop-footer">Contact</a>
          </li>
          <li>
            <Link to="/cart" className="cart-icon">
              <i className="ri-shopping-cart-fill"></i>
              <span className="badge">{totalQuantity}</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* -------- SHOP NAV BAR ENDS -------- */}

      {/* -------- SHOP HEADER ENDS -------- */}

      <div className="shop-header" id="home">
        <div className="shop-header-content">
          <h1>{shopName}</h1>
          <p>{shopDescription}</p>
        </div>

        <div className="shop-header-image">
          <img src={shopImage} alt={`Header Image for ${shopName}`} />
        </div>
      </div>

      {/* -------- SHOP HEADER ENDS -------- */}

      <h2 className="products-title">Products from {shopName}</h2>
      {error ? (
        <p>Error fetching Products: {error}</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
              addToCart={addToCart}
              cart={cart}
            />
          ))}
        </div>
      )}

      {/* -------- REVIEWS SECTION STARTS -------- */}
      <div className="reviews" id="reviews">
        <ShopReviews onAddReview={handleAddReview} reviews={reviews} />
      </div>
      {/* -------- REVIEWS SECTION STARTS -------- */}

      {/* -------- FOOTER SECTION STARTS -------- */}

      <div className="content1"></div>
      <footer className="shop-footer" id="shop-footer">
        <div className="main-content">
          <div className="left box">
            <h2>About us</h2>
            <div className="content">
              <p>{shopAbout}</p>
            </div>
          </div>

          <div className="center box">
            <h2>CONTACT DETAILS</h2>
            <div className="content">
              <div className="place">
                <span className="fas fa-map-marker-alt"></span>
                <span className="text">{shopAddress}</span>
              </div>
              <div className="phone">
                <span className="fas fa-phone-alt"></span>
                <span className="text">{shopPhone}</span>
              </div>
              <div className="email">
                <span className="fas fa-envelope"></span>
                <span className="text">{shopEmail}</span>
              </div>
            </div>
          </div>

          <div className="right box">
            <h2>LINKS</h2>
            <div className="content">
              <form action="#">
                <div className="LinkButton1">
                  <p>
                    <Link to="/cart" className="LinkButton">
                      <i className="ri-shopping-cart-fill"></i> Cart
                    </Link>
                  </p>
                </div>
                <div className="LinkButton2">
                  <p>
                    <Link to="/" className="LinkButton">
                      <i className="ri-truck-line"></i> Track Your Order(s)
                    </Link>
                  </p>
                </div>
                <div className="LinkButton3">
                  <p>
                    <Link to="/" className="LinkButton">
                      <i className="ri-home-3-line"></i> Home
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bottom">
          <center>
            <span className="credit">Creatives SA</span>
            <span>
              <i className="ri-copyright-line"></i>
            </span>
            <span> | 2023 All rights reserved.</span>
          </center>
        </div>
      </footer>

      {/* -------- FOOTER SECTION ENDS -------- */}
    </div>
  );
}

export default ProductList;
