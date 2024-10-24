import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCube, FaHeart, FaChartBar, FaCircle, FaCubes, FaRobot } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [features, setFeatures] = useState([]);
    const allProducts = useSelector((state) => state.cart.allProducts); // Access products from the Redux store
    const cartStatus = useSelector((state) => state.cart.status);
    const cartError = useSelector((state) => state.cart.error);

    useEffect(() => {
        // Only filter features when allProducts has been populated
        if (allProducts.length > 0) {
            // Filter products based on rating and count
            const featuresProducts = allProducts.filter(
                (product) => product.rating >= 4.5
            );
            setFeatures(featuresProducts.splice(0, 4));
        }
    }, [allProducts]); // Effect depends on the allProducts state

    const companies = [
        { id: 1, name: 'ZEINA', icon: <FaCube size={40} className="text-gray-600" /> },
        { id: 2, name: 'CIRCLE', icon: <FaCircle size={40} className="text-gray-600" /> },
        { id: 3, name: 'LOGIC+', icon: <FaCubes size={40} className="text-gray-600" /> },
        { id: 4, name: 'HEART', icon: <FaHeart size={40} className="text-gray-600" /> },
        { id: 5, name: 'CHARTZ', icon: <FaChartBar size={40} className="text-gray-600" /> },
        { id: 6, name: 'ROBOCO', icon: <FaRobot size={40} className="text-gray-600" /> },
    ];

    const encodeProductId = (id) => {
        return btoa(id.toString()); // Base64 encode the product ID
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 ">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-4 "
                    >
                        Welcome to Our Store
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-xl mb-6 "
                    >
                        Discover the best products at unbeatable prices.
                    </motion.p>
                    <motion.a
                        href="#products"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                        Shop Now
                    </motion.a>
                </div>
            </section>

            {/* Product Showcase */}
            <section id="products" className="py-16">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Products</h2>
                    <div className={`${cartStatus === 'succeeded' ? 'grid grid-cols-1 md:grid-cols-4 gap-8' : ''} w-full max-w-7xl mx-auto`}>
                        {allProducts.length === 0 ? ( // Check if products are still loading
                            <p className="text-lg text-red-300 w-full"> {cartError}</p>
                        ) : features.length > 0 ? ( // If products are loaded, check for features
                            features.map((product) => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ scale: 1.05 }}
                                    className=" p-3 rounded-lg shadow-lg flex flex-col items-center"
                                >
                                    <NavLink to={`/relative/?productId=${encodeProductId(product.id)}`}>
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-40 h-40  rounded-lg mb-4"
                                        />
                                    </NavLink>
                                    <h3 className="text-xl font-bold">{product.title.slice(0, 15)}...</h3>
                                    <p className="mb-2 h-6 overflow-hidden">{product.description.slice(0, 30)}...</p>
                                    <p className="text-lg font-bold text-blue-600">
                                        {Intl.NumberFormat("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                            maximumFractionDigits: 2,
                                        }).format(product.price)}  {/* You need to pass a number here */}
                                    </p>
                                </motion.div>
                            ))
                        ) : ( // No featured products found
                            <p className="text-lg">No featured products available at the moment.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Call-to-Action */}
            <section className="py-16 ">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get the Best Deals Now!</h2>
                    <p className="text-lg md:text-xl mb-6">
                        Sign up today and get exclusive offers directly to your inbox.
                    </p>
                    <motion.a
                        href="#signup"
                        whileHover={{ scale: 1.1 }}
                        className="inline-block bg-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up Now
                    </motion.a>
                </div>
            </section>

            {/* Company Section */}
            <section className="py-8">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold">Trusted By 1000+ Companies</h2>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-6xl mx-auto p-4 rounded-full border-2 border-gray-400 flex items-center justify-around flex-wrap"
                >
                    {companies.map((company) => (
                        <div key={company.id} className="flex flex-col items-center">
                            {company.icon}
                            <span className="mt-2 text-sm font-semibold">{company.name}</span>
                        </div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
