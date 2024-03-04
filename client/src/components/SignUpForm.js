// SignUpForm.js
import React, { useState } from "react";
import SignUpFormOptions from "./SignUpFormOptions";
import "../styles/signup-form.css";

const SignUpForm = ({ onClose }) => {
  const [showOptions, setShowOptions] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    shopName: "",
    shopDescription: "",
    shopPhoneNumber: "",
    shopEmailAddress: "",
    shopAddress: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    productSize: "",
    productOwner: "",
    productOwnerEmailAddress: "",
    productOwnerPhoneNumber: "",
    productOwnerAddress: "",
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const handleBackToOptions = () => {
    setShowOptions(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmission = () => {
    // Handle the form submission logic here
    // You can use formData to send the data to your backend or perform other actions
    onClose(); // Close the form after submission if needed
  };

  return (
    <div className="signup-form">
      {showOptions ? (
        <SignUpFormOptions onSelectOption={handleOptionSelect} />
      ) : (
        <>
          <h2>{selectedOption === "shop" ? "Rent a Shop" : "Sell a Product"}</h2>

          {selectedOption === "shop" ? (
            <>
              <label>Shop Name:</label>
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
              />

              <label>Shop Description:</label>
              <textarea
                name="shopDescription"
                value={formData.shopDescription}
                onChange={handleInputChange}
              ></textarea>

              <label>Shop Phone Number:</label>
              <input
                type="text"
                name="shopPhoneNumber"
                value={formData.shopPhoneNumber}
                onChange={handleInputChange}
              />

              <label>Shop Email Address:</label>
              <input
                type="text"
                name="shopEmailAddress"
                value={formData.shopEmailAddress}
                onChange={handleInputChange}
              />

              <label>Shop Address:</label>
              <input
                type="text"
                name="shopAddress"
                value={formData.shopAddress}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <label>Product Name:</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
              />

              <label>Product Description:</label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
              ></textarea>

              <label>Product Price:</label>
              <input
                type="text"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleInputChange}
              />

              <label>Product Size:</label>
              <input
                type="text"
                name="productSize"
                value={formData.productSize}
                onChange={handleInputChange}
              />

              <label>Product Owner:</label>
              <input
                type="text"
                name="productOwner"
                value={formData.productOwner}
                onChange={handleInputChange}
              />

              <label>Product Owner Email Address:</label>
              <input
                type="text"
                name="productOwnerEmailAddress"
                value={formData.productOwnerEmailAddress}
                onChange={handleInputChange}
              />

              <label>Product Owner Phone Number:</label>
              <input
                type="text"
                name="productOwnerPhoneNumber"
                value={formData.productOwnerPhoneNumber}
                onChange={handleInputChange}
              />

              <label>Product Owner Address:</label>
              <input
                type="text"
                name="productOwnerAddress"
                value={formData.productOwnerAddress}
                onChange={handleInputChange}
              />
            </>
          )}

          <button type="button" onClick={handleFormSubmission}>
            Submit
          </button>
          <button type="button" onClick={handleBackToOptions}>
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default SignUpForm;