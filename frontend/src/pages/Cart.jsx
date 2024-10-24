import React from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    clearCart,
} from "../features/cart/cartSlice.js";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const CartPage = () => {
    const { isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.cartItems);
    const total = useSelector((state) => state.cart.totalPrice);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const shapingCost = useSelector((state) => state.cart.shipping);
    const takCost = useSelector((state) => state.cart.tax);
    const finalPrice = useSelector((state) => state.cart.finalPrice);
    const discount = useSelector((state) => state.cart.discount);

    const handleIncrement = (id) => {
        dispatch(increaseQuantity(id));
    };
    const handleDecrement = (id) => {
        dispatch(decreaseQuantity(id));
    };
    const handleRemove = (id) => {
        dispatch(removeItemFromCart(id));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    
    const handlerPlaceOrder = (invoice, cartProducts) => {
        console.log("Invoice:", invoice);
        console.log("Cart Products:", [...cartProducts, invoice]);
        console.log("Place Order");
    };
    const handlerCheckout = () => {
        let checkOutProducts = [];
        if (totalQuantity <= 0) {
            alert("Please place order first!");
            return;
        } else {
            let minimumOrderNotMet = false;
            // Iterate over each item in the cart to check minimum order quantity
            cartProducts.forEach((item) => {
                console.log("Checking product:", item.title.slice(0, 20));
                console.log("Minimum order quantity:", item.minimumOrderQuantity);
                console.log("Order quantity:", item.quantity);
                checkOutProducts.push({
                    productId: item.id,
                    productName: {
                        name: item.title.slice(0, 20),
                        description: item.description.slice(0, 50),
                    },
                    quantity: {
                        costumerQuantity: item.quantity,
                        maxQuantity: item.minimumOrderQuantity
                    },
                    stock: {
                        isStock: item.stock > 1 ? true : false,
                        quantity: item.stock,
                    },
                    productId: {
                        id: item.id,
                    },
                    price: {
                        originalPrice: item.price,
                    }
                });

                // Check if the minimum order quantity is met for each item
                if (item.quantity <= 0) {
                    minimumOrderNotMet = true;
                    alert(
                        `Minimum order quantity not reached for ${item.title.slice(0, 20)}!`
                    );
                }
            });

            // If any item fails the minimum order quantity check, stop further execution
            if (minimumOrderNotMet) {
                return;
            }

            // Assuming you already have the total data calculated elsewhere:
            // Place the order if all checks pass
            alert("Order placed successfully!");
            handlerPlaceOrder(
                {
                    total: total.toFixed(2),
                    discount: discount.toFixed(2),
                    tax: takCost.toFixed(2),
                    shipping: shapingCost.toFixed(2),
                    finalPrice: finalPrice.toFixed(2),
                    totalQuantity: totalQuantity,
                },
                checkOutProducts
            );
        }
        checkOutProducts = [];
    };

    const encodeProductId = (id) => {
        return btoa(id.toString()); // Base64 encode the product ID
    }

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col  min-h-screen">
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3">
                            <div className=" rounded-lg shadow-lg p-4 max-h-[70vh] overflow-scroll hide-scrollbar">
                                <p>Please login to place order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col  min-h-screen">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className=" rounded-lg shadow-lg p-4 max-h-[70vh] overflow-scroll hide-scrollbar">
                            {cartProducts.length > 0 ? (
                                cartProducts.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center p-4 rounded-lg shadow transition"
                                    >
                                        <NavLink
                                            to={`/product/?productId=${encodeProductId(item.id)}`}
                                        >
                                            <img
                                                src={item.thumbnail}
                                                alt={item.name}
                                                className="w-24 h-24 rounded-lg"
                                            />
                                        </NavLink>
                                        <div className="flex-grow pl-4">
                                            <h2 className="text-xl font-semibold">{item.name}</h2>
                                            <p className="">Price: ${item.price}</p>
                                            <p className="text-blue-600 font-bold">
                                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    onClick={() => handleDecrement(item.id)}
                                                    className="p-2 rounded-lg   transition"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <span className="mx-2 font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncrement(item.id)}
                                                    className="p-2 rounded-lg  hover:bg-gray-300 transition"
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="bg-red-500  p-2 ml-4 rounded-lg hover:bg-red-600 transition"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-center items-center h-48">
                                    <p className="text-xl">No items in the cart.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <aside className="min-h-[70vh] p-6  rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Shipping:</span>
                            <span className="font-bold">{shapingCost}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Discount:</span>
                            <span className="font-bold">{discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-6">
                            <span>Tax:</span>
                            <span className="font-bold">{takCost}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal:</span>
                            <span className="font-bold">{total.toFixed(2)}</span>
                        </div>
                        <hr className="mb-4" />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>{parseFloat(finalPrice).toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handlerCheckout}
                            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full transition"
                        >
                            Proceed to Checkout
                        </button>
                        <div className="mt-4 w-full  border border-red-200 rounded p-2">
                            <p className="text-center text-red-600 font-semibold">
                                Danger Zone
                            </p>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full transition"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
