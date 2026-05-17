import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    });

    const img_url =
        "https://carlkiboko.alwaysdata.net/static/images/";

    // 🧠 EMPTY STATE
    if (wishlist.length === 0) {
        return (
            <div className="text-center mt-5">
                <h4>No wishlist items ❤️</h4>
                <button
                    className="btn btn-dark mt-3"
                    onClick={() => navigate("/")}
                >
                    Go Shopping
                </button>
            </div>
        );
    }

    // ❌ REMOVE ITEM (SYNCED + REACTIVE)
    const removeItem = (id) => {
        const updated = wishlist.filter(
            (item) => item.product_id !== id
        );

        setWishlist(updated);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updated)
        );

        window.dispatchEvent(new Event("wishlistUpdated"));
    };

    // 🛒 ADD TO CART (FULLY CONNECTED WITH CART SYSTEM)
    const addToCart = (product) => {
        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existsIndex = cart.findIndex(
            (item) => item.product_id === product.product_id
        );

        let updatedCart;

        if (existsIndex !== -1) {
            updatedCart = cart.map((item, index) =>
                index === existsIndex
                    ? {
                          ...item,
                          quantity: (item.quantity || 1) + 1,
                      }
                    : item
            );
        } else {
            updatedCart = [
                ...cart,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(new Event("cartUpdated"));

        alert("Added to cart 🛒");
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">❤️ Wishlist</h2>

            {wishlist.map((item) => (
                <div
                    key={item.product_id}
                    className="d-flex align-items-center border-bottom p-3"
                >
                    {/* IMAGE */}
                    <img
                        src={img_url + item.product_photo}
                        alt=""
                        style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px",
                        }}
                    />

                    {/* DETAILS */}
                    <div style={{ flex: 1, marginLeft: "10px" }}>
                        <h6>{item.product_name}</h6>
                        <p className="text-muted mb-0">
                            {item.product_description}
                        </p>
                    </div>

                    {/* PRICE */}
                    <b>{item.product_cost} KES</b>

                    {/* ACTIONS */}
                    <button
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => addToCart(item)}
                    >
                        Add to Cart
                    </button>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(item.product_id)}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Wishlist;