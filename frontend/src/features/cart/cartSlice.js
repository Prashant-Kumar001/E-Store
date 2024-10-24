import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk('cart/fetchAllProducts', async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response?.data?.products;
});

// Utility function to calculate the total price of cart items
const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.totalPrice, 0);
};

// Utility function to calculate tax (assuming per item)
const calculateTax = (cartItems, taxRate) => {
  return cartItems.reduce((taxTotal, item) => taxTotal + (item.quantity * taxRate), 0);
};

// Utility function to calculate discount (for example, 10% off if total > 300)
const calculateDiscount = (totalPrice) => {
  const discountThreshold = 300; // Threshold for applying discount
  const discountRate = 0.10; // 10% discount
  return totalPrice > discountThreshold ? totalPrice * discountRate : 0;
};

// Utility function to calculate shipping (free shipping if total price > 500)
const calculateShipping = (totalPrice, shippingCost) => {
  const freeShippingThreshold = 500;
  return totalPrice > freeShippingThreshold ? 0 : shippingCost;
};

// Utility function to calculate the final price
const calculateFinalPrice = (state) => {
  const totalPrice = calculateTotalPrice(state.cartItems);
  const tax = calculateTax(state.cartItems, state.tax);
  const discount = calculateDiscount(totalPrice);
  const shipping = calculateShipping(totalPrice, state.shipping);

  // Update the state values for discount and shipping if needed
  if (shipping === 0) {
    state.shipping = 0;
  }
  if (discount) {
    state.discount = discount;
  }

  return totalPrice + tax - discount + shipping;
};

// Initial state
const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  totalQuantity: localStorage.getItem('TotalCartLength') ? JSON.parse(localStorage.getItem('TotalCartLength')) : 0,
  productQuantity: localStorage.getItem('cartLength') ? JSON.parse(localStorage.getItem('cartLength')) : 0,
  totalPrice: 0,
  finalPrice: 0,  // Final price after discount, tax, and shipping
  user: null,
  tax: 10,  // Tax per product
  shipping: 50,  // Shipping cost per product
  discount: 0,  // Discount on the total cart
  allProducts: [],
  status: 'idle',
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
        state.productQuantity += 1
        localStorage.setItem('cartLength', JSON.stringify(state.productQuantity));
      }
      state.totalQuantity += 1;
      localStorage.setItem('TotalCartLength', JSON.stringify(state.totalQuantity));

      // Recalculate total price and final price
      state.totalPrice = calculateTotalPrice(state.cartItems);
      state.finalPrice = calculateFinalPrice(state);

      // Save cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== id);
        state.totalQuantity -= existingItem.quantity
        state.productQuantity -= 1
        state.totalPrice = calculateTotalPrice(state.cartItems);
      }
      localStorage.setItem('cartLength', JSON.stringify(state.productQuantity));
      localStorage.setItem('TotalCartLength', JSON.stringify(state.totalQuantity));

      // Recalculate final price when an item is removed
      state.finalPrice = calculateFinalPrice(state);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        state.totalQuantity += 1;
        state.totalPrice = calculateTotalPrice(state.cartItems);
      }
      localStorage.setItem('cartLength', JSON.stringify(state.productQuantity));
      localStorage.setItem('TotalCartLength', JSON.stringify(state.totalQuantity));

      // Recalculate final price when quantity increases
      state.finalPrice = calculateFinalPrice(state);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        state.totalQuantity -= 1;
        state.totalPrice = calculateTotalPrice(state.cartItems);
      }
      localStorage.setItem('cartLength', JSON.stringify(state.productQuantity));
      localStorage.setItem('TotalCartLength', JSON.stringify(state.totalQuantity));

      // Recalculate final price when quantity decreases
      state.finalPrice = calculateFinalPrice(state);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.finalPrice = 0;
      state.discount = 0;
      state.user = null;

    },
    setUser: (state, action) => {
      state.user = action.payload;  // Set the authenticated user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart, setUser } = cartSlice.actions;

export default cartSlice.reducer;
