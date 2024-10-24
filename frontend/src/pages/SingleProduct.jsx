import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice.js";
import { NavLink } from "react-router-dom";
import Reviews from "../components/Reviews.jsx";
import { FaStar } from 'react-icons/fa'; // Importing star icon from react-icons
import { FaStarHalf, FaRegStar } from "react-icons/fa";
<FaStarHalf />
const SingleProduct = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const allProducts = useSelector((state) => state.cart.allProducts);
  const [relativeProducts, setRelativeProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productId, setProductId] = useState(null);
  const [searchParams] = useSearchParams();
  const encodedProductId = searchParams.get("productId");
  const dispatch = useDispatch();

  useEffect(() => {
    if (encodedProductId) {
      try {
        const decodedId = atob(encodedProductId); // Decode the product ID
        setProductId(decodedId); // Set the decoded productId to state
      } catch (error) {
        console.error("Invalid product ID");
      }
    }
  }, [encodedProductId]);

  const handlerAddToCart = () => {
    dispatch(addItemToCart({ quantity: 1, ...product }));
  };

  useEffect(() => {
    const existingProduct = allProducts.find(
      (p) => p.id === parseInt(productId)
    );
    if (existingProduct) {
      const relatedProducts = allProducts.filter(
        (p) => p.category === existingProduct.category
      );
      setRelativeProducts(
        relatedProducts.filter((p) => p.id !== existingProduct.id)
      );
    }
    if (existingProduct) {
      setProduct(existingProduct);
      setInterval(() => {
        setLoading(false);
      }, 2000);
    }
  }, [productId, allProducts]);

  const encodeProductId = (id) => {
    return btoa(id.toString()); // Base64 encode the product ID
  };

  const handlerShowImg = (img) => {
    setProduct({ ...product, thumbnail: [img] });
  };
  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      {product ? (
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 p-4 flex md:flex-row flex-col justify-center items-center">
            <div className="flex flex-row gap-2 items-center md:flex-col md:ml-20">
              {product.images &&
                product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={product.title}
                    className={`rounded-lg w-16 h-16 object-cover ${isDarkMode ? '' : 'glow-yellow'} cursor-pointer `}
                    onMouseEnter={() => handlerShowImg(img)}
                  />
                ))}
            </div>
            <div className="md:w-full flex justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className={`rounded-lg md:w-72 md:h-72 object-cover w-full   ${isDarkMode ? 'glow-aqua' : 'glow-yellow'}`}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-4">
            <h2 className={`text-3xl ${isDarkMode ? 'text-gray-300' : 'text-slate-700'} font-medium mb-4`}>{product.title}</h2>
            <div className="flex gap-2 items-center mb-3">
              <p className="bg-green-600 rounded-md text-white px-2 py-[1px] text-[12px] font-medium ">{product.rating}</p>
              <a href="#reviews"> <p className="text-gray-500 text-sm font-medium cursor-pointer"> {product.reviews.length} {" "}Reviews</p></a>
            </div>
            <p className="text-lg mb-6 ">{product.description}</p>
            <div className="flex items-center mb-1 gap-2">
              <span className="text-2xl font-bold text-green-600 ">
                {Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 2,
                }).format(product.price)}
              </span>
              <p className="mb-3">
                <span className="text-gray-500 text-sm">
                  {Math.floor(product.discountPercentage)}%{" "} <span className="text-red-500">off</span>
                </span>
              </p>
              <span>
                <span className="text-gray-400 text-sm">
                  (in stock: {product.stock})
                </span>
              </span>
            </div>
            <p className="text-sm mb-4 ">Category: {product.category}</p>
            <p className="text-sm mb-4 ">Brand: {product.brand}</p>
            <div className="flex items-center mb-4">

              {[...Array(5)].map((_, index) => {
                const fullStars = Math.floor(product.rating); // Number of full stars
                const hasHalfStar = product.rating % 1 !== 0; // Check if there's a half-star

                if (index < fullStars) {
                  return <FaStar key={index} size={16} color="yellow" />;
                } else if (index === fullStars && hasHalfStar) {
                  return <FaStarHalf key={index} size={16} color="yellow" />;
                } else {
                  return <FaRegStar key={index} size={16} color="gray" />; // Blank star for remaining
                }
              })}

            </div>
            <div className="flex space-x-4 mt-6">
              <button className={`w-full bg-yellow-500 hover:bg-yellow-600 ${isDarkMode ? '' : 'text-gray-800'} py-3 px-4 rounded-lg font-semibold transition duration-300 ease-in-out`}>
                Buy Now
              </button>
              <button
                onClick={handlerAddToCart}
                className="w-full bg-blue-500 hover:bg-blue-600 py-3 px-4 rounded-lg font-semibold transition duration-300 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Product not found</p>
      )}

      {/* Similar Products Section */}
      {relativeProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-6">
            {relativeProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg flex flex-col  justify-center overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-36 w-32 md:h-52 bg-gray-200 md:w-52 flex"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold ">
                    {product.title.slice(0, 15)}...
                  </h3>
                  <p className="text-lg font-bold ">₹{product.price}</p>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 mr-1">
                      ⭐ {product.rating}
                    </span>
                    <span className="text-left">
                      ({product.rating.count} ratings)
                    </span>
                  </div>
                  <NavLink
                    to={`/product/?productId=${encodeProductId(product.id)}`}
                  >
                    <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition duration-300 ease-in-out">
                      View Product
                    </button>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-12" id="reviews">
        <h1 className="mb-3 text-2xl ">product reviews</h1>
        {/* Add review form */}
        {product.reviews && product.reviews.length > 0 && (
          <div>
            {product.reviews.map((review, index) => (
              <Reviews key={index} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
