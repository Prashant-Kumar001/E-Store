import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/toggle/themeSlice.js';
import cartReducer  from '../features/cart/cartSlice.js';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        cart: cartReducer,
    },
});

export default store;
