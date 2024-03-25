import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SuperAdminShopEdit from "./SuperAdminShopEdit";
import SuperAdminProductEdit from "./SuperAdminProductEdit";
import SuperAdminShopReviews from "./SuperAdminShopReviews";
import "../../styles/superadmin.css";

const SuperAdminShopDetails = () => {
  const { shop_id } = useParams();
  const [shopDetails, setShopDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const [editableFields, setEditableFields] = useState({
    shop_name: "",
    shop_description: "",
    shop_about: "",
    owner_name: "",
    owner_email: "",
    shop_address: "",
    owner_phone: "",
    shop_image: "",
    shop_background: "",
  });

  const [editableProductFields, setEditableProductFields] = useState([]);

  const fetchShopDetails = async () => {
    try {
      const shopResponse = await fetch(
        `http://localhost:5000/shops/${shop_id}`
      );
      const shopData = await shopResponse.json();
      setShopDetails(shopData);

      setEditableFields({
        shop_name: shopData.shop_name,
        shop_description: shopData.shop_description,
        shop_about: shopData.shop_about,
        owner_name: shopData.owner_name,
        owner_email: shopData.owner_email,
        shop_address: shopData.shop_address,
        owner_phone: shopData.owner_phone,
        shop_image: shopData.shop_image,
        shop_background: shopData.shop_background,
      });

      const productsResponse = await fetch(
        `http://localhost:5000/products/${shop_id}`
      );
      const productsData = await productsResponse.json();
      setProducts(productsData);

      const initialProductsFields = productsData.map((product) => ({
        product_id: product.product_id,
        product_name: product.product_name,
        product_description: product.product_description,
        productimg_1: product.productimg_1,
        productimg_2: product.productimg_2,
        productimg_3: product.productimg_3,
        price: product.price,
      }));
      setEditableProductFields(initialProductsFields);
    } catch (err) {
      console.error(err.message);
      setError("Error fetching shop details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchShopDetails();
  }, [shop_id]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/shops/${shop_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableFields),
      });

      if (response.ok) {
        console.log("Shop details updated successfully!");
        toast.success("Shop updated successfully!");
      } else {
        console.error("Failed to update shop details");
      }
    } catch (error) {
      console.error("Error updating shop details", error);
    }
  };

  const handleProductInputChange = (e, productId) => {
  const { name, value } = e.target;

  // Convert "t" or "f" string to boolean for is_on_sale
  const isOnSale = name === "is_on_sale" ? value === "t" : value;

  setEditableProductFields((prevFields) =>
    prevFields.map((field) =>
      field.product_id === productId ? { ...field, [name]: isOnSale } : field
    )
  );
};

  
  const handleProductFormSubmit = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            editableProductFields.find(
              (field) => field.product_id === productId
            )
          ),
        }
      );

      if (response.ok) {
        console.log("Product details updated successfully!");
        toast.success("Product updated successfully!");
      } else {
        console.error("Failed to update product details");
      }
    } catch (error) {
      console.error("Error updating product details", error);
      toast.success("Error updating product details");
    }
  };

  const handleDeleteProduct = async (productId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${productId}`,
          {
            method: "DELETE",
          }
        );
  
        if (response.ok) {
          toast.success("Product deleted successfully!");
          await fetchShopDetails();
        } else {
          toast.success("Failed to delete product");
        }
      } catch (error) {
        console.error(`Error deleting product ${productId}`, error);
      }
    }
  };
  

  return (
    <div className="superadmin-shop-details">
      <h1>EDIT SHOP DETAILS</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <br />
          <SuperAdminShopEdit
            editableFields={editableFields}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
          <SuperAdminProductEdit
            editableProductFields={editableProductFields}
            handleProductInputChange={handleProductInputChange}
            handleProductFormSubmit={handleProductFormSubmit}
            handleDeleteProduct={handleDeleteProduct}
            products={products}
            shop_id={shop_id}
          />
          <SuperAdminShopReviews shop_id={shop_id} />
        </div>
      )}
    </div>
  );
};

export default SuperAdminShopDetails;
