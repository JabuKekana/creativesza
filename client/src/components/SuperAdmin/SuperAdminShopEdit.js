import React from "react";
import "../../styles/super-admin-edit.css";

const SuperAdminShopEdit = ({
  editableFields,
  handleInputChange,
  handleFormSubmit,
}) => {
  return (
    <div className="super-admin-shop-edit">
      <form onSubmit={handleFormSubmit}>
        <label>
          Shop Name:
          <input
            type="text"
            name="shop_name"
            value={editableFields.shop_name}
            onChange={(e) => handleInputChange(e, "shop_name")}
          />
        </label>
        <br />
        <label>
          Shop Description:
          <input
            type="text"
            name="shop_description"
            value={editableFields.shop_description}
            onChange={(e) => handleInputChange(e, "shop_description")}
          />
        </label>
        <br />
        <label>
          Shop About:
          <input
            type="text"
            name="shop_about"
            value={editableFields.shop_about}
            onChange={(e) => handleInputChange(e, "shop_about")}
          />
        </label>
        <br />
        <label>
          Owner Name:
          <input
            type="text"
            name="owner_name"
            value={editableFields.owner_name}
            onChange={(e) => handleInputChange(e, "owner_name")}
          />
        </label>
        <br />
        <label>
          Owner Email:
          <input
            type="text"
            name="owner_email"
            value={editableFields.owner_email}
            onChange={(e) => handleInputChange(e, "owner_email")}
          />
        </label>
        <br />
        <label>
          Shop Address:
          <input
            type="text"
            name="shop_address"
            value={editableFields.shop_address}
            onChange={(e) => handleInputChange(e, "shop_address")}
          />
        </label>
        <br />
        <label>
          Owner Phone:
          <input
            type="text"
            name="owner_phone"
            value={editableFields.owner_phone}
            onChange={(e) => handleInputChange(e, "owner_phone")}
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>

      <div className="superadmin-shop-images">
        <div className="image-container">
          <div className="image-wrapper">
            <p className="image-title">Shop Cover/Logo Image:</p>
            <img
              src={editableFields.shop_image}
              alt={`Shop Image for ${editableFields.shop_name}`}
            />
            <label>
              Image URL:
              <input
                type="text"
                name="Shop Image"
                value={editableFields.shop_image}
                onChange={(e) => handleInputChange(e, "shop_image")}
              />
            </label>
          </div>

          <div className="image-wrapper">
            <p className="image-title">Shop Background Image:</p>
            <img
              src={editableFields.shop_background}
              alt={`Shop Background Image for ${editableFields.shop_name}`}
            />
            <label>
              Image URL:
              <input
                type="text"
                name="shop_background"
                value={editableFields.shop_background}
                onChange={(e) => handleInputChange(e, "shop_background")}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminShopEdit;
