import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '../data/products';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default to luxury white theme as requested
  const [cartItems, setCartItems] = useState([
    {
      id: 'aura-edp',
      name: 'AURA Eau de Parfum',
      size: '100ml',
      price: 245,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSound = () => {
    const active = soundManager.toggleOceanAtmosphere();
    setIsSoundActive(active);
  };

  const addToCart = (product, size = '100ml') => {
    soundManager.playChime();
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      const price = product.pricePerSize ? product.pricePerSize[size] || product.price : product.price;
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          size,
          price,
          quantity: 1,
          image: product.image
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id && item.size === size) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalCount,
        subtotal,
        isSoundActive,
        toggleSound,
        theme,
        toggleTheme
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
