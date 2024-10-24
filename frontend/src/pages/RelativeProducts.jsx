import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, NavLink } from 'react-router-dom';
import { CiStar } from "react-icons/ci";
import { motion } from 'framer-motion';
import { addItemToCart } from '../features/cart/cartSlice.js';

const RelativeProducts = () => {
    const allProducts = useSelector((state) => state.cart.allProducts);
    const cartStatus = useSelector((state) => state.cart.status);
    const cartError = useSelector((state) => state.cart.error);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productId, setProductId] = useState(null);  // Add state for productId
    const [searchParams] = useSearchParams();
    const encodedProductId = searchParams.get('productId');
    const dispatch = useDispatch();

    const addToCart = (item) => {
        dispatch(addItemToCart(item));
    };

    useEffect(() => {
        if (encodedProductId) {
            try {
                const decodedId = atob(encodedProductId);  // Decode the product ID
                setProductId(decodedId);  // Set the decoded productId to state
            } catch (error) {
                console.error('Invalid product ID');
            }
        }
    }, [encodedProductId]);

    useEffect(() => {
        if (productId && allProducts.length > 0) {
            const existingProduct = allProducts.find((p) => p.id === parseInt(productId));
            if (existingProduct) {
                const relatedProducts = allProducts.filter(
                    (p) => p.category === existingProduct.category && p.id !== existingProduct.id
                );
                setFilteredProducts(relatedProducts);
            }
        }
    }, [productId, allProducts]);

    // Handle loading and error states
    if (cartStatus === 'loading') {
        return <p className="text-center">Loading related products...</p>;
    }
    if (cartStatus === 'failed') {
        return <p className="text-center text-red-300">Error loading products: {cartError}</p>;
    }

    const encodeProductId = (id) => {
        return btoa(id.toString()); // Base64 encode the product ID
    };


    return (
        <div className="my-6">
            <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
            {filteredProducts.length === 0 ? (
                <p>No related products found.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-center justify-center">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            className="rounded-md shadow-lg p-4 flex flex-col justify-between"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <NavLink to={`/product/?productId=${encodeProductId(product.id)}`} className="flex flex-col items-center">
                                <motion.img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="mb-2 h-40 object-contain cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                />
                            </NavLink>
                            <h3 className="text-lg font-semibold text-center h-6 overflow-hidden mb-3">{product.title}</h3>
                            <p className="text-lg text-blue-600 mt-1">₹{product.price}</p>
                            <p className="text-sm mt-1 truncate">{product.description}</p>
                            <div className="flex justify-start mt-2">
                                {[...Array(5)].map((_, index) => (
                                    <CiStar
                                        key={index}
                                        className={`text-yellow-600 ${index < Math.floor(product.rating.rate) ? '' : 'opacity-20'}`}
                                    />
                                ))}
                            </div>
                            <motion.button
                                onClick={() => addToCart(product)}
                                className="mt-4 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition duration-300"
                            >
                                Add to Cart
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RelativeProducts;
