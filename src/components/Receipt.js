import React, { useRef } from "react";
import { toPng } from "html-to-image";

function Receipt({ orderDetails }) {
  const receiptRef = useRef(null);

  // Get the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  
  const saveAsImage = () => {
    if (receiptRef.current === null) {
      return;
    }

    toPng(receiptRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "receipt.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Could not save receipt as image", err);
      });
  };

  return (
    <div>
      <div ref={receiptRef} className="receipt">
        <h2>Receipt</h2>
        <p><strong>Order Placed Successfully!</strong></p>
        <p>Your order will be ready in 2 hours.</p>

        {/* Display date and time */}
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Time:</strong> {formattedTime}</p>

        <h3>Order Details:</h3>
        <div className="order-details">
          <h4>Cart Details:</h4>
          {orderDetails.cart.map((item, index) => (
            <div key={index} className="order-item">
              <p>
                {item.name} - {item.quantity} x ${item.basePrice || item.price} = ${item.totalPrice}
              </p>
            </div>
          ))}
          <div className="order-total">
            <h4>Total: ${orderDetails.totalPrice}</h4>
          </div>
        </div>

        <div className="order-info">
          <h4>Customer Details:</h4>
          <p><strong>Name:</strong> {orderDetails.name}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>
          <p><strong>Phone:</strong> {orderDetails.contact}</p>
        </div>
      </div>

      <button onClick={saveAsImage} className="save-receipt-button">
        Save Receipt as Image
      </button>
    </div>
  );
}

export default Receipt;