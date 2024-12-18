import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const CartContext = createContext();

// Crear el proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verificar si el producto ya existe en el carrito
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      
      if (existingProductIndex > -1) {
        // Si el producto ya existe, incrementamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // Si no existe, lo agregamos con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      return updatedCart;
    });
  };
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,decreaseQuantity, getTotalItems,getTotalPrice,clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
