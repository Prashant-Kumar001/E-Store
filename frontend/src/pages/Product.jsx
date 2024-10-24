import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiStar } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import { NavLink } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa"; // Importing star icon from react-icons
import Loading from "../components/ILoading";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/Sighup.jsx";
import { useNavigate } from 'react-router-dom';
const ProductPage = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const allProducts = useSelector((state) => state.cart.allProducts);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartError = useSelector((state) => state.cart.error);
  const { isAuthenticated } = useAuth0();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("none");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callLogin = () => {
    alert("Please login first");
  }; 
   const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setMinRating(0);
    setSortOrder("none");
    setSearch("");
    setSelectedCategory("all");
    setFilteredProducts(allProducts);
   }
  useEffect(() => {
    const uniqueCategories = [
      "all",
      ...new Set(allProducts.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
    setFilteredProducts(allProducts);
  }, [allProducts]);

  useEffect(() => {
    let filtered = allProducts;
    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    filtered = filtered.filter((product) => product.rating >= minRating);

    if (sortOrder === "low-to-high") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, minPrice, maxPrice, minRating, sortOrder, search]);

  const addToCart = (product) => {
    dispatch(addItemToCart({ quantity: 1, ...product }));
    toast.success("Product added to cart!");
  };
  const encodeProductId = (id) => {
    return btoa(id.toString()); // Base64 encode the product ID
  };

  if (cartStatus === "failed")
    return (
      <p className="text-center text-red-300">
        Error loading products: {cartError}
      </p>
    );

  return (
    <div
      className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-800"
        }`}
    >
      {/* Header */}

      <div className="flex flex-col md:flex-row px-2 md:px-4 py-4 flex-grow">
        {/* Sidebar with filters */}
        <aside
          className={`w-full md:w-1/4 md:sticky md:top-20 md:max-h-[97vh]  ${isDarkMode ? "bg-gradient-to-r from-gray-900 to-black" : ""
            } shadow-md rounded-md p-4 mb-4 md:mb-0 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Filters</h2>

          {/* Search Filter */}
          <div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search product..."
              className={`w-full p-2  rounded ${isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-800"
                }`}
            />
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Category</h3>
            <select
              className={`w-full mt-2 p-2  rounded ${isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-800"
                }`}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">
              Price Range: ₹{minPrice} - ₹{maxPrice}
            </h3>
            <div className="flex justify-between">
              <input
                type="number"
                min="0"
                className={`w-1/2 p-2  rounded ${isDarkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-800"
                  }`}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <input
                type="number"
                max="1000"
                className={`w-1/2 p-2  rounded ${isDarkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-800"
                  }`}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">
              Minimum Rating: {minRating} / 5
            </h3>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className={`w-full mt-2 ${isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-800"
                }`}
            />
          </div>

          {/* Sort by Price */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Sort by Price</h3>
            <select
              className={`w-full mt-2 p-2  rounded ${isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-800"
                }`}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">None</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
          <div>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={clearFilters}>clear filter</button>
          </div>
        </aside>

        {/* Product Grid */}
        <div
          className={`w-full md:w-3/4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start  ${isDarkMode ? "bg-gradient-to-r from-gray-900 to-black" : ""
            }  gap-4`}
        >
          {filteredProducts.length === 0 ? (
            <p className="text-center col-span-full">No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className={`rounded-md shadow-lg p-4 flex flex-col  justify-between transition-transform duration-300 hover:shadow-xl ${isDarkMode ? " -gray-700" : " -gray-200"
                  }`}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <NavLink
                  to={`/product/?productId=${encodeProductId(product.id)}`}
                  className="flex flex-col items-center"
                >
                  <motion.img
                    src={product.thumbnail}
                    alt={product.title}
                    className="rounded-md mb-2 h-40 object-contain cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  />
                </NavLink>
                <h2 className="text-lg font-semibold text-center h-6 overflow-hidden mb-3">
                  {product.title}
                </h2>
                <p className="text-lg text-blue-600 mt-1">
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2,
                  }).format(product.price)}
                </p>
                <p className="text-sm mt-1 truncate">{product.description}</p>
                <p className="text-sm mt-1">Category: {product.category}</p>
                <div className="flex justify-start mt-2">
                  {[...Array(5)].map((_, index) => {
                    const fullStars = Math.floor(product.rating); // Number of full stars
                    const hasHalfStar = product.rating % 1 !== 0; // Check if there's a half-star

                    if (index < fullStars) {
                      return <FaStar key={index} size={16} color="yellow" />;
                    } else if (index === fullStars && hasHalfStar) {
                      return (
                        <FaStarHalf key={index} size={16} color="yellow" />
                      );
                    } else {
                      return <FaRegStar key={index} size={16} color="gray" />; // Blank star for remaining
                    }
                  })}
                </div>
                <motion.button
                  onClick={
                    isAuthenticated ? () => addToCart(product) : callLogin
                  }
                  className="mt-4 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition duration-300"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductPage;
