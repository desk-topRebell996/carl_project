import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    const img_url =
        "https://carlkiboko.alwaysdata.net/static/images/";

    useEffect(() => {
        const loadCart = () => {
            setCart(JSON.parse(localStorage.getItem("cart")) || []);
        };

        loadCart();

        window.addEventListener("cartUpdated", loadCart);
        return () =>
            window.removeEventListener("cartUpdated", loadCart);
    }, []);

    if (!cart || cart.length === 0) {
        return (
            <div className="text-center mt-5">
                <h4>Your cart is empty 🛒</h4>
                <button
                    className="btn btn-dark mt-3"
                    onClick={() => navigate("/")}
                >
                    Go Shopping
                </button>
            </div>
        );
    }

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.product_cost) * (item.quantity || 1),
        0
    );

    const increaseQty = (id) => {
        const updated = cart.map((item) =>
            item.product_id === id
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
        );

        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const decreaseQty = (id) => {
        const updated = cart
            .map((item) =>
                item.product_id === id
                    ? { ...item, quantity: (item.quantity || 1) - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);

        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">🛒 Your Cart</h2>

            {cart.map((item) => (
                <div
                    key={item.product_id}
                    className="d-flex align-items-center border-bottom p-3"
                >
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

                    <div style={{ flex: 1, marginLeft: "12px" }}>
                        <h6>{item.product_name}</h6>
                        <p className="text-muted mb-0">
                            {item.product_description}
                        </p>

                        <div className="mt-2">
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => decreaseQty(item.product_id)}
                            >
                                -
                            </button>

                            <span className="mx-2">
                                {item.quantity || 1}
                            </span>

                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => increaseQty(item.product_id)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <b>
                        {Number(item.product_cost) *
                            (item.quantity || 1)}{" "}
                        KES
                    </b>
                </div>
            ))}

            <div className="text-end mt-4">
                <h4>Total: {total} KES</h4>
            </div>

            <button
                className="btn btn-success w-100 mt-3"
                onClick={() =>
                    navigate("/mpesapayment", {
                        state: { cart },
                    })
                }
            >
                Proceed to Payment 💳
            </button>
        </div>
    );
};

export default Cart;