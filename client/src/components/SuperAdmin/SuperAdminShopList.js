import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/superadmin-shop-list.css";

const SuperAdminShopList = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);

  const [newShopData, setNewShopData] = useState({
    shop_name: "",
    shop_about: "",
    shop_description: "",
    owner_name: "",
    owner_email: "",
    owner_phone: "",
    shop_address: "",
    shop_image: "",
    shop_background: "",
  });

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://192.168.7.141:5000/shops");
        const data = await response.json();
        setShops(data);
      } catch (err) {
        console.error(err.message);
        setError("Error fetching shops. Please try again later.");
      }
    };

    fetchShops();
  }, []);

  const handleAddShop = async () => {
    try {
      const response = await fetch("http://192.168.7.141:5000/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShopData),
      });

      if (response.ok) {
        const newShop = await response.json();
        setShops((prevShops) => [...prevShops, newShop]);
        setNewShopData({
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
        toast.success("Shop added successfully!");
      } else {
        setError("Failed to add shop. Please check your input and try again.");
      }
    } catch (err) {
      console.error(err.message);
      setError("Failed to add shop. Please try again later.");
    }
  };

  const handleDeleteShop = async (shopId) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this shop?");
  
    if (!isConfirmed) {
      // If not confirmed, do nothing
      return;
    }
  
    try {
      const response = await fetch(`http://192.168.7.141:5000/shops/${shopId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setShops((prevShops) =>
          prevShops.filter((shop) => shop.shop_id !== shopId)
        );
        toast.success("Shop deleted successfully!");
      } else {
        setError("Failed to delete shop. Please try again later.");
      }
    } catch (err) {
      console.error(err.message);
      setError("Failed to delete shop. Please try again later.");
    }
  };

  return (
    <div className="superadmin-shop-list">
      <h1>Super Admin Shop List</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Shop ID</th>
                <th>Shop Name</th>
                <th>Shop Owner</th>
                <th>Shop Number</th>
                <th>Shop Email</th>
                <th>Shop Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop.shop_id}>
                  <td>{shop.shop_id}</td>
                  <td>{shop.shop_name}</td>
                  <td>{shop.owner_name}</td>
                  <td>{shop.owner_phone}</td>
                  <td>{shop.owner_email}</td>
                  <td>{shop.shop_address}</td>
                  <td>
                    <Link
                      to={`/superadmin/shops/${shop.shop_id}`}
                      className="button-link"
                    >
                      View Details
                    </Link>{" "}
                    <button onClick={() => handleDeleteShop(shop.shop_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="add-shop-section">
            <h2>Add New Shop</h2>
            <label>Shop Name:</label>
            <input
              type="text"
              value={newShopData.shop_name}
              onChange={(e) =>
                setNewShopData({ ...newShopData, shop_name: e.target.value })
              }
            />

            <label>About Shop:</label>
            <textarea
              value={newShopData.shop_about}
              onChange={(e) =>
                setNewShopData({ ...newShopData, shop_about: e.target.value })
              }
            />

            <label>Shop Description:</label>
            <textarea
              value={newShopData.shop_description}
              onChange={(e) =>
                setNewShopData({
                  ...newShopData,
                  shop_description: e.target.value,
                })
              }
            />

            <label>Owner Name:</label>
            <input
              type="text"
              value={newShopData.owner_name}
              onChange={(e) =>
                setNewShopData({ ...newShopData, owner_name: e.target.value })
              }
            />

            <label>Owner Email:</label>
            <input
              type="email"
              value={newShopData.owner_email}
              onChange={(e) =>
                setNewShopData({ ...newShopData, owner_email: e.target.value })
              }
            />

            <label>Owner Phone:</label>
            <input
              type="tel"
              value={newShopData.owner_phone}
              onChange={(e) =>
                setNewShopData({ ...newShopData, owner_phone: e.target.value })
              }
            />

            <label>Shop Address:</label>
            <input
              type="text"
              value={newShopData.shop_address}
              onChange={(e) =>
                setNewShopData({ ...newShopData, shop_address: e.target.value })
              }
            />

            <label>Shop Image:</label>
            <input
              type="text"
              value={newShopData.shop_image}
              onChange={(e) =>
                setNewShopData({ ...newShopData, shop_image: e.target.value })
              }
            />

            <label>Shop Background:</label>
            <input
              type="text"
              value={newShopData.shop_background}
              onChange={(e) =>
                setNewShopData({
                  ...newShopData,
                  shop_background: e.target.value,
                })
              }
            />

            <button className="add-shop-btn" onClick={handleAddShop}>Add Shop</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SuperAdminShopList;
