import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

const GetProduct = ({ darkMode }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [showFilter, setShowFilter] = useState(false);

    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [showChat, setShowChat] = useState(false);

    const navigate = useNavigate();

    /* 🌄 BACKGROUND IMAGES */
    const BG_LIGHT =
        "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80";

    const BG_DARK =
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80";

    const BACKGROUND_IMAGE =
        darkMode ? BG_DARK : BG_LIGHT;

    /* 🖼️ PRODUCT IMAGES */
    const IMAGES_URL =
        "https://carlkiboko.alwaysdata.net/static/images/";

    /* 📦 FETCH PRODUCTS */
    const getproduct = async () => {

        setLoading("Fetching products please wait...");

        try {

            const response = await axios.get(
                "https://carlkiboko.alwaysdata.net/api/get_product_details"
            );

            setProducts(response.data);

            setLoading("");

        } catch (error) {

            setLoading("");

            setError("Something went wrong");
        }
    };

    useEffect(() => {
        getproduct();
    }, []);

    /* ❤️ LOCAL STORAGE */
    useEffect(() => {

        setWishlist(
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || []
        );

        setCart(
            JSON.parse(
                localStorage.getItem("cart")
            ) || []
        );

    }, []);

    useEffect(() => {

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

    }, [wishlist]);

    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }, [cart]);

    /* ❤️ WISHLIST */
    const toggleWishlist = (product) => {

        const exists = wishlist.find(
            (item) =>
                item.product_id === product.product_id
        );

        if (exists) {

            setWishlist(
                wishlist.filter(
                    (item) =>
                        item.product_id !== product.product_id
                )
            );

        } else {

            setWishlist([
                ...wishlist,
                product
            ]);
        }
    };

    /* 🛒 CART */
    const addToCart = (product) => {

        const exists = cart.find(
            (item) =>
                item.product_id === product.product_id
        );

        if (!exists) {

            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ]);
        }
    };

    /* 🔍 FILTER PRODUCTS */
    const filteredProducts = products
        .filter((p) =>
            (p.product_name || "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            (p.product_description || "")
                .toLowerCase()
                .includes(search.toLowerCase())
        )

        .filter((p) => {

            if (filter === "cheap") {
                return p.product_cost < 1000;
            }

            if (filter === "expensive") {
                return p.product_cost >= 1000;
            }

            return true;
        });

    return (

        <div
            className="container-fluid"
            style={{

                minHeight: "100vh",

                backgroundImage: `
                    linear-gradient(
                        rgba(0,0,0,0.55),
                        rgba(0,0,0,0.55)
                    ),
                    url(${BACKGROUND_IMAGE})
                `,

                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",

                transition: "0.3s ease",
            }}
        >

            {/* 🎠 CAROUSEL */}
            <Carousel />

            {/* 🔥 TOP BAR */}
            <div style={styles.topBar}>

                {/* SEARCH */}
                <div style={styles.searchWrapper}>

                    <input
                        type="text"
                        placeholder="Search products, brands, parts..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        style={{
                            ...styles.searchInput,

                            ...(darkMode
                                ? styles.searchDark
                                : styles.searchLight),
                        }}
                    />

                    {/* FILTER BUTTON */}
                    <span
                        onClick={() =>
                            setShowFilter(!showFilter)
                        }
                        style={styles.filterInside}
                    >
                        🔽
                    </span>

                    {/* FILTER DROPDOWN */}
                    {showFilter && (

                        <div style={styles.dropdown}>

                            <p
                                onClick={() =>
                                    setFilter("all")
                                }
                            >
                                All
                            </p>

                            <p
                                onClick={() =>
                                    setFilter("cheap")
                                }
                            >
                                Cheap
                            </p>

                            <p
                                onClick={() =>
                                    setFilter("expensive")
                                }
                            >
                                Expensive
                            </p>

                        </div>
                    )}

                </div>

                {/* ICONS */}
                <div style={styles.iconGroup}>

                    <span
                        onClick={() =>
                            navigate("/wishlist", {
                                state: { wishlist },
                            })
                        }
                        style={styles.wishlistIcon}
                    >
                        🖤 {wishlist.length}
                    </span>

                    <span
                        onClick={() =>
                            navigate("/cart", {
                                state: { cart },
                            })
                        }
                        style={styles.cartIcon}
                    >
                        🛒 {cart.length}
                    </span>

                </div>

            </div>

            {/* 🧠 TITLE */}
            <h2 style={styles.pageTitle}>
                Explore Premium Auto Products
            </h2>

            {/* ⏳ LOADING */}
            {loading && (
                <div style={styles.loading}>
                    {loading}
                </div>
            )}

            {/* ❌ ERROR */}
            {error && (
                <p className="text-danger text-center">
                    {error}
                </p>
            )}

            {/* 📦 PRODUCTS */}
            <div className="row">

                {filteredProducts.map((product) => {

                    const isLiked = wishlist.find(
                        (item) =>
                            item.product_id === product.product_id
                    );

                    const inCart = cart.find(
                        (item) =>
                            item.product_id === product.product_id
                    );

                    return (

                        <div
                            key={product.product_id}
                            className="col-md-3 mb-4"
                        >

                            <div style={styles.card}>

                                {/* IMAGE */}
                                <div style={styles.imageWrapper}>

                                    <img
                                        src={
                                            IMAGES_URL +
                                            product.product_photo
                                        }
                                        alt={product.product_name}
                                        style={styles.image}
                                        onError={(e) => {
                                            e.target.src =
                                                "https://via.placeholder.com/400x300?text=No+Image";
                                        }}
                                    />

                                </div>

                                {/* BODY */}
                                <div style={styles.cardBody}>

                                    <h5 style={styles.title}>
                                        {product.product_name}
                                    </h5>

                                    <p style={styles.desc}>
                                        {product.product_description}
                                    </p>

                                    <b style={styles.price}>
                                        {product.product_cost} KES
                                    </b>

                                    {/* 💳 BUY NOW */}
                                    <button
                                        className="btn btn-dark w-100 mt-3"
                                        onClick={() =>
                                            navigate(
                                                "/mpesapayment",
                                                {
                                                    state: {
                                                        cart: [
                                                            {
                                                                ...product,
                                                                quantity: 1,
                                                            },
                                                        ],
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        Buy Now
                                    </button>

                                    {/* ❤️ SAVE */}
                                    <button
                                        onClick={() =>
                                            toggleWishlist(product)
                                        }
                                        style={{
                                            ...styles.wishBtn,

                                            background: isLiked
                                                ? "linear-gradient(135deg,#ef4444,#be123c)"
                                                : "rgba(255,255,255,0.15)",
                                        }}
                                    >
                                        {isLiked
                                            ? "Saved ❤️"
                                            : "Save 🤍"}
                                    </button>

                                    {/* 🛒 ADD TO CART */}
                                    <button
                                        className="btn btn-primary w-100 mt-2"
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                        disabled={inCart}
                                    >
                                        {inCart
                                            ? "Added ✓"
                                            : "Add to Cart 🛒"}
                                    </button>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* 💬 CHATBOT */}
            {showChat && (

                <Chatbot
                    products={products}
                    onClose={() =>
                        setShowChat(false)
                    }
                />

            )}

            {/* 💬 CHAT BUTTON */}
            <button
                onClick={() =>
                    setShowChat(!showChat)
                }
                style={styles.chatButton}
            >
                {showChat ? "✖" : "💬"}
            </button>

            <Footer />

        </div>
    );
};

/* 🎨 STYLES */
const styles = {

    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        padding: "14px",

        position: "sticky",
        top: 0,

        zIndex: 1000,

        backdropFilter: "blur(28px)",

        background: "rgba(0,0,0,0.25)",

        borderBottom:
            "1px solid rgba(255,255,255,0.12)",
    },

    searchWrapper: {
        position: "relative",
        width: "75%",
    },

    searchInput: {

        width: "100%",

        padding: "16px 50px 16px 22px",

        borderRadius: "40px",

        border:
            "1px solid rgba(255,255,255,0.35)",

        backdropFilter: "blur(30px)",

        WebkitBackdropFilter: "blur(30px)",

        fontSize: "15px",

        outline: "none",

        transition: "0.3s ease",
    },

    searchLight: {
        background: "rgba(255,255,255,0.32)",
        color: "#111",
    },

    searchDark: {
        background: "rgba(15,23,42,0.65)",
        color: "#fff",
    },

    filterInside: {

        position: "absolute",

        right: "16px",
        top: "50%",

        transform: "translateY(-50%)",

        cursor: "pointer",

        color: "#fff",

        fontSize: "18px",
    },

    dropdown: {

        position: "absolute",

        top: "60px",
        left: 0,

        width: "180px",

        padding: "10px",

        borderRadius: "18px",

        background: "rgba(15,23,42,0.88)",

        backdropFilter: "blur(20px)",

        color: "#fff",

        zIndex: 999,
    },

    iconGroup: {
        display: "flex",
        gap: "10px",
    },

    wishlistIcon: {

        background:
            "linear-gradient(135deg,#ef4444,#be123c)",

        color: "#fff",

        padding: "10px",

        borderRadius: "50%",

        cursor: "pointer",

        fontWeight: "bold",
    },

    cartIcon: {

        background:
            "linear-gradient(135deg,#111827,#1e293b)",

        color: "#fff",

        padding: "10px",

        borderRadius: "50%",

        cursor: "pointer",

        fontWeight: "bold",
    },

    pageTitle: {

        textAlign: "center",

        color: "#fff",

        fontWeight: "800",

        marginTop: "20px",
        marginBottom: "25px",
    },

    card: {

        borderRadius: "22px",

        overflow: "hidden",

        background: "rgba(255,255,255,0.08)",

        backdropFilter: "blur(18px)",

        border:
            "1px solid rgba(255,255,255,0.08)",

        transition: "0.3s ease",
    },

    imageWrapper: {
        height: "250px",
        overflow: "hidden",
    },

    image: {

        width: "100%",
        height: "100%",

        objectFit: "cover",
    },

    cardBody: {
        padding: "14px",
        color: "#fff",
    },

    title: {
        textAlign: "center",
        fontWeight: "700",
    },

    desc: {

        textAlign: "center",

        fontSize: "14px",

        minHeight: "45px",
    },

    price: {

        display: "block",

        textAlign: "center",

        marginTop: "5px",

        fontSize: "18px",

        color: "#38bdf8",
    },

    wishBtn: {

        width: "100%",

        marginTop: "10px",

        padding: "10px",

        border: "none",

        borderRadius: "12px",

        color: "#fff",

        fontWeight: "600",

        cursor: "pointer",

        backdropFilter: "blur(12px)",
    },

    loading: {

        textAlign: "center",

        margin: "15px auto",

        padding: "14px 18px",

        width: "fit-content",

        borderRadius: "16px",

        background: "rgba(255,255,255,0.12)",

        backdropFilter: "blur(16px)",

        color: "#fff",
    },

    chatButton: {

        position: "fixed",

        bottom: "20px",
        right: "20px",

        width: "60px",
        height: "60px",

        borderRadius: "50%",

        border: "none",

        background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",

        color: "#fff",

        fontSize: "24px",

        cursor: "pointer",

        zIndex: 9999,
    },
};

export default GetProduct;