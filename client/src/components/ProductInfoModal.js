import React from "react";
import Modal from "react-modal";
import "../styles/productinfo-modal.css";

const ProductInfoModal = ({ isOpen, closeModal, product }) => {
  const handleClose = () => {
    console.log("Closing modal...");
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Product Information"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          maxWidth: "600px",
          margin: "auto",
        },
      }}
    >
      <div className="modal-view">
        <img src={product.productimg_1} />
        <h2>{product.product_name}</h2>
        <p><span><i className="ri-information-line"></i></span> {product.product_description}</p>
        <p>Price: R{product.price}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ProductInfoModal;
