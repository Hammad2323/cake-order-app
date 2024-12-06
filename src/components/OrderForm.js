import React, { useState } from "react";

function OrderForm({ placeOrder }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("Pickup");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder({ name, address, contact, deliveryOption, deliveryDate });
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h3>Place Your Order</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />
      <select
        value={deliveryOption}
        onChange={(e) => setDeliveryOption(e.target.value)}
      >
        <option value="Pickup">Pickup</option>
        <option value="Delivery">Delivery</option>
      </select>
      
      <button type="submit">Place Order</button>
    </form>
  );
}

export default OrderForm;