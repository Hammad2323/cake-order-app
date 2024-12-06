import React, { useState } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import OrderForm from "./components/OrderForm";
import Receipt from "./components/Receipt";
import "./App.css";

function App() {
  const cakes = [
    { id: 1, name: "Chocolate Cake", basePrice: 10, image: "/images/chocolate.jpg" },
    { id: 2, name: "Almond Cake", basePrice: 9, image: "/images/Almond.jpg" },
    { id: 3, name: "Red Velvet Cake", basePrice: 12, image: "/images/redvelvet.jpg" },
    { id: 4, name: "Coffee Cake", basePrice: 11, image: "/images/coffee.jpg" },
  ];

  const pastries = [
    { id: 1, name: "Strawberry Pastry", price: 5, image: "/images/st.jpg" },
    { id: 2, name: "Chocolate Pastry", price: 6, image: "/images/vanilachocolate.jpg" },
    { id: 3, name: "Red Velvet Pastry", price: 5, image: "/images/red.jpg" },
    { id: 4, name: "Tarts Pastry", price: 8, image: "/images/tarts.jpg" },
  ];

  const [cart, setCart] = useState([]);
  const [selectedPound, setSelectedPound] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const addToCart = (item, itemType) => {
    const isCake = itemType === "cake";
    const itemPrice = isCake ? item.basePrice * selectedPound : item.price;
    const itemTotalPrice = itemPrice * selectedQuantity;

    const updatedItem = {
      ...item,
      type: itemType, 
      pound: isCake ? selectedPound : 1,
      quantity: selectedQuantity,
      totalPrice: itemTotalPrice,
    };

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === updatedItem.id &&
          cartItem.type === updatedItem.type && 
          cartItem.pound === updatedItem.pound 
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += updatedItem.quantity;
        updatedCart[existingItemIndex].totalPrice += itemTotalPrice;
        return updatedCart;
      } else {
        return [...prevCart, updatedItem];
      }
    });

    setTotalPrice((prevTotal) => prevTotal + itemTotalPrice);
    setSelectedPound(1); 
    setSelectedQuantity(1); 
  };

  const handleRemoveItem = (itemIndex) => {
    const removedItem = cart[itemIndex];
    setCart(cart.filter((_, index) => index !== itemIndex));
    setTotalPrice((prevTotal) => prevTotal - removedItem.totalPrice);
  };

  const handleIncreaseQuantity = (itemIndex) => {
    const updatedCart = [...cart];
    updatedCart[itemIndex].quantity += 1;
    updatedCart[itemIndex].totalPrice =
      (updatedCart[itemIndex].basePrice || updatedCart[itemIndex].price) *
      updatedCart[itemIndex].pound *
      updatedCart[itemIndex].quantity;
    setCart(updatedCart);
    setTotalPrice((prevTotal) => prevTotal + (updatedCart[itemIndex].basePrice || updatedCart[itemIndex].price));
  };

  const handleDecreaseQuantity = (itemIndex) => {
    const updatedCart = [...cart];
    if (updatedCart[itemIndex].quantity > 1) {
      updatedCart[itemIndex].quantity -= 1;
      updatedCart[itemIndex].totalPrice =
        (updatedCart[itemIndex].basePrice || updatedCart[itemIndex].price) *
        updatedCart[itemIndex].pound *
        updatedCart[itemIndex].quantity;
      setCart(updatedCart);
      setTotalPrice((prevTotal) => prevTotal - (updatedCart[itemIndex].basePrice || updatedCart[itemIndex].price));
    }
  };

  const placeOrder = (details) => {
    setOrderDetails({ ...details, cart: [...cart], totalPrice });
    setOrderPlaced(true);

    // Reset cart after placing the order
    setCart([]);
    setTotalPrice(0);
  };

  return (
    <div className="app">
      {!orderPlaced ? (
        <>
          <h1 className="title">Halal Cake & Pastry Shop</h1>

          <h2 className="category-heading">Select Your Cake</h2>
          <div className="product-list cakes-list">
            {cakes.map((cake) => (
              <div key={cake.id} className="product-item cake-item">
                <img src={cake.image} alt={cake.name} className="product-image" />
                <div className="product-info">
                  <h3>{cake.name}</h3>
                  <p className="price">${cake.basePrice} - per Pound</p>
                  <div className="selection-container">
                    <select
                      value={selectedPound}
                      onChange={(e) => setSelectedPound(Number(e.target.value))}
                      className="selection-input"
                    >
                      {[1, 2, 3, 4, 5].map((pound) => (
                        <option key={pound} value={pound}>
                          {pound} lb - ${cake.basePrice * pound}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                      className="selection-input"
                    >
                      {[1, 2, 3, 4, 5].map((quantity) => (
                        <option key={quantity} value={quantity}>
                          {quantity} {quantity > 1 ? "Items" : "Item"}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => addToCart(cake, "cake")}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="category-heading">Select Your Pastries</h2>
          <div className="product-list pastries-list">
            {pastries.map((pastry) => (
              <div key={pastry.id} className="product-item pastry-item">
                <img src={pastry.image} alt={pastry.name} className="product-image" />
                <div className="product-info">
                  <h3>{pastry.name}</h3>
                  <p className="price">${pastry.price}</p>
                  <div className="selection-container">
                    <select
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                      className="selection-input"
                    >
                      {[1, 2, 3, 4, 5].map((quantity) => (
                        <option key={quantity} value={quantity}>
                          {quantity} {quantity > 1 ? "Items" : "Item"}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => addToCart(pastry, "pastry")}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div className="cart-item" key={index}>
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.totalPrice}</p>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => handleDecreaseQuantity(index)}>
                      <FaMinus className="cart-icon" />
                    </button>
                    <button onClick={() => handleIncreaseQuantity(index)}>
                      <FaPlus className="cart-icon" />
                    </button>
                    <button onClick={() => handleRemoveItem(index)}>
                      <FaTrash className="cart-icon" />
                    </button>
                  </div>
                </div>
              ))
            )}
            <div className="cart-total">
              <h3>Total: ${totalPrice}</h3>
            </div>
          </div>

          <OrderForm placeOrder={placeOrder} />
        </>
        ) : (
          <Receipt orderDetails={orderDetails} />
        )}
      </div>
    );
  }
  
  export default App;