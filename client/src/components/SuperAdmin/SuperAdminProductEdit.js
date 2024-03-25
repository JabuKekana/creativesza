import React, { useState } from "react";
import { toast } from "react-toastify";
import "../../styles/super-admin-edit.css";

const SuperAdminProductEdit = ({
  editableProductFields,
  handleProductInputChange,
  handleProductFormSubmit,
  handleDeleteProduct,
  products,
  shop_id,
}) => {
  const [isAddNewProductVisible, setAddNewProductVisible] = useState(false);

  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_description: "",
    productimg_1: "",
    productimg_2: "",
    productimg_3: "",
    price: "",
    is_on_sale: "f",
  });

  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: newProduct.product_name,
          product_description: newProduct.product_description,
          productimg_1: newProduct.productimg_1,
          productimg_2: newProduct.productimg_2,
          productimg_3: newProduct.productimg_3,
          price: newProduct.price,
          shop_id: shop_id,
          is_on_sale: newProduct.is_on_sale,
        }),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        console.log("Product added successfully:", addedProduct);

        setNewProduct({
          product_name: "",
          product_description: "",
          productimg_1: "",
          productimg_2: "",
          productimg_3: "",
          price: "",
          is_on_sale: false,
        });
        toast.success("Product added successfully!");
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <div className="super-admin-product-edit">
      <h2>EDIT SHOP PRODUCTS:</h2>
      <button
        type="button"
        onClick={() => setAddNewProductVisible(!isAddNewProductVisible)}
      >
        {" "}
        Add New Product
        {isAddNewProductVisible ? (
          <span dangerouslySetInnerHTML={{ __html: "&#11167;" }} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: "&#11166;" }} />
        )}{" "}
      </button>{" "}
      <br />
      <br />
      <br />
      <hr />
      {/* Add New Product section */}
      {isAddNewProductVisible && (
        <div>
          <h3>Add New Product</h3>
          <label>
            Product Name:
            <input
              type="text"
              name="product_name"
              value={newProduct.product_name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, product_name: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Product Description:
            <input
              type="text"
              name="product_description"
              value={newProduct.product_description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  product_description: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Product Image 1:
            <input
              type="text"
              name="productimg_1"
              value={newProduct.productimg_1}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productimg_1: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Product Image 2:
            <input
              type="text"
              name="productimg_2"
              value={newProduct.productimg_2}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productimg_2: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Product Image 3:
            <input
              type="text"
              name="productimg_3"
              value={newProduct.productimg_3}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productimg_3: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            <span>Is on Sale:</span>
            <select
              name="is_on_sale"
              value={newProduct.is_on_sale}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  is_on_sale: e.target.value,
                })
              }
            >
              <option value="t">Yes</option>
              <option value="f">No</option>
            </select>
          </label>
          <br />
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      )}

      {products.map((product) => (
        <details key={product.product_id}>
          <summary>
            <h3>{product.product_name}</h3>
            <div className="product-images">
              {[
                product.productimg_1,
                product.productimg_2,
                product.productimg_3,
              ].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="productImg"
                  alt={`Product ${index + 1} for ${product.product_name}`}
                />
              ))}
            </div>
            <hr className="line-after-product-img"/>
          </summary>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleProductFormSubmit(product.product_id);
            }}
          >
            <label>
              Product Name:
              <input
                type="text"
                name="product_name"
                value={
                  editableProductFields.find(
                    (field) => field.product_id === product.product_id
                  ).product_name
                }
                onChange={(e) =>
                  handleProductInputChange(e, product.product_id)
                }
              />
            </label>
            <br />
            <label>
              Product Description:
              <input
                type="text"
                name="product_description"
                value={
                  editableProductFields.find(
                    (field) => field.product_id === product.product_id
                  ).product_description
                }
                onChange={(e) =>
                  handleProductInputChange(e, product.product_id)
                }
              />
            </label>
            <br />
            <label>
              Product Image 1:
              <input
                type="text"
                name="productimg_1"
                value={
                  editableProductFields.find(
                    (field) => field.product_id === product.product_id
                  ).productimg_1
                }
                onChange={(e) =>
                  handleProductInputChange(e, product.product_id)
                }
              />
            </label>
            <br />
            <label>
              Product Image 2:
              <input
                type="text"
                name="productimg_2"
                value={
                  editableProductFields.find(
                    (field) => field.product_id === product.product_id
                  ).productimg_2
                }
                onChange={(e) =>
                  handleProductInputChange(e, product.product_id)
                }
              />
            </label>
            <br />
            <label>
              Product Image 3:
              <input
                type="text"
                name="productimg_3"
                value={
                  editableProductFields.find(
                    (field) => field.product_id === product.product_id
                  ).productimg_3
                }
                onChange={(e) =>
                  handleProductInputChange(e, product.product_id)
                }
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={
                  editableProductFields.find(
                    (field) => field.product_id === product.product_id
                  ).price
                }
                onChange={(e) =>
                  handleProductInputChange(e, product.product_id)
                }
              />
            </label>
            <br />
            <label>
              <span>
                {product.is_on_sale
                  ? "On Sale Tag is ON"
                  : "On Sale Tag is OFF"}
              </span>
              <br />
              Change:
              <select
                name="is_on_sale"
                value={
                  editableProductFields.find(
                    (field) => field.product_id === product.product_id
                  ).is_on_sale
                    ? "t"
                    : "f"
                }
                onChange={(e) =>
                  handleProductInputChange(e, product.product_id)
                }
              >
                <option value="t">Yes</option>
                <option value="f">No</option>
              </select>
            </label>

            <br />
            <button type="submit">Save Changes</button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => handleDeleteProduct(product.product_id)}
            >
              Delete Product
            </button>
          </form>

          <hr />
        </details>
      ))}
    </div>
  );
};

export default SuperAdminProductEdit;
