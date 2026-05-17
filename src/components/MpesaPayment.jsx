import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";

const MpesaPayment = ({ darkMode }) => {

    const MPESA_LIMIT = 150000;

    const tranquilBg =
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1974&auto=format&fit=crop";

    const navigate = useNavigate();
    const { cart } = useLocation().state || {};

    const [phone, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState("mpesa");

    const img_url =
        "https://carlkiboko.alwaysdata.net/static/images/";

    const theme = darkMode
        ? {
              glass: "rgba(15,23,42,0.45)",
              text: "#f8fafc",
              border: "rgba(255,255,255,0.12)",
              input: "rgba(255,255,255,0.08)"
          }
        : {
              glass: "rgba(255,255,255,0.18)",
              text: "#ffffff",
              border: "rgba(255,255,255,0.22)",
              input: "rgba(255,255,255,0.12)"
          };

    // ===============================
    // ✅ COMPUTATIONS + HOOKS FIRST
    // ===============================

    const totalAmount = cart?.reduce(
        (sum, item) => sum + Number(item.product_cost),
        0
    );

    const mpesaAvailable = totalAmount <= MPESA_LIMIT;

    useEffect(() => {
        if (!mpesaAvailable && paymentMethod === "mpesa") {
            setPaymentMethod("card");
        }
    }, [mpesaAvailable, paymentMethod]);

    // ===============================
    // ❌ EARLY RETURN (AFTER HOOKS)
    // ===============================

    if (!cart || cart.length === 0) {
        return (
            <div style={{ ...styles.page, backgroundImage: `url(${tranquilBg})` }}>
                <div style={styles.overlay}></div>

                <div style={{ ...styles.emptyCard, background: theme.glass, border: `1px solid ${theme.border}` }}>
                    <h4 style={{ color: theme.text }}>
                        No cart items found 🛒
                    </h4>

                    <button
                        style={styles.shopBtn}
                        onClick={() => navigate("/")}
                    >
                        Go Back Shopping
                    </button>
                </div>
            </div>
        );
    }

    // ===============================
    // PAY FUNCTION
    // ===============================

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const data = new FormData();
            data.append("phone", phone);
            data.append("amount", totalAmount);

            await axios.post(
                "http://carlkiboko.alwaysdata.net/api/mpesa_payment",
                data
            );

            setMessage("📱 STK Push sent! Check your phone.");
            setLoading(false);

        } catch (error) {
            setMessage("❌ Payment failed. Try again.");
            setLoading(false);
        }
    };

    // ===============================
    // UI
    // ===============================

    return (
        <div style={{ ...styles.page, backgroundImage: `url(${tranquilBg})` }}>
            <div style={styles.overlay}></div>

            <div
                style={{
                    ...styles.card,
                    background: theme.glass,
                    border: `1px solid ${theme.border}`
                }}
            >

                <h2 style={{ textAlign: "center", color: theme.text, marginBottom: "20px" }}>
                    Secure Checkout 💎
                </h2>

                {/* MESSAGE */}
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                    {mpesaAvailable ? (
                        <p style={{ color: theme.text, fontSize: "14px" }}>
                            Choose your preferred payment method
                        </p>
                    ) : (
                        <p style={{ color: "#f87171", fontSize: "14px", fontWeight: "600" }}>
                            ⚠ M-PESA unavailable for orders above KES {MPESA_LIMIT.toLocaleString()}
                        </p>
                    )}
                </div>

                {/* PAYMENT TABS */}
                <div style={styles.paymentTabs}>

                    {mpesaAvailable && (
                        <button
                            onClick={() => setPaymentMethod("mpesa")}
                            style={{
                                ...styles.tabButton,
                                background:
                                    paymentMethod === "mpesa"
                                        ? "linear-gradient(135deg,#22c55e,#16a34a)"
                                        : "rgba(255,255,255,0.1)"
                            }}
                        >
                            M-PESA 📱
                        </button>
                    )}

                    <button
                        onClick={() => setPaymentMethod("card")}
                        style={{
                            ...styles.tabButton,
                            background:
                                paymentMethod === "card"
                                    ? "linear-gradient(135deg,#3b82f6,#8b5cf6)"
                                    : "rgba(255,255,255,0.1)"
                        }}
                    >
                        Card 💳
                    </button>

                </div>

                {/* CART */}
                {cart.map((product) => (
                    <div key={product.product_id} style={{ ...styles.productRow, borderBottom: `1px solid ${theme.border}` }}>
                        <img
                            src={img_url + product.product_photo}
                            style={styles.productImage}
                            alt=""
                        />

                        <div style={{ flex: 1, marginLeft: "12px" }}>
                            <h5 style={{ color: theme.text, margin: 0 }}>
                                {product.product_name}
                            </h5>
                            <small style={{ color: darkMode ? "#cbd5e1" : "#f8fafc" }}>
                                {product.product_description}
                            </small>
                        </div>

                        <b style={{ color: theme.text }}>
                            {product.product_cost} KES
                        </b>
                    </div>
                ))}

                {/* TOTAL */}
                <div style={styles.totalBox}>
                    <h3 style={{ color: theme.text }}>
                        Total: {totalAmount} KES
                    </h3>
                </div>

                {/* PAYMENT AREA */}
                {paymentMethod === "mpesa" ? (
                    <form onSubmit={submit}>
                        <input
                            type="tel"
                            placeholder="Enter Phone Number (2547...)"
                            value={phone}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{
                                ...styles.input,
                                background: theme.input,
                                border: `1px solid ${theme.border}`,
                                color: theme.text
                            }}
                        />

                        <button type="submit" disabled={loading} style={styles.payBtn}>
                            {loading ? "Processing..." : "Pay Now 📱"}
                        </button>
                    </form>
                ) : (
                    <Card />
                )}

                {message && (
                    <p style={{ textAlign: "center", marginTop: "15px", color: theme.text }}>
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
};

// ===============================
// STYLES
// ===============================

const styles = {

    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px"
    },

    overlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(2px)"
    },

    card: {
        width: "100%",
        maxWidth: "720px",
        borderRadius: "30px",
        padding: "28px",
        backdropFilter: "blur(24px)",
        position: "relative",
        zIndex: 2
    },

    paymentTabs: {
        display: "flex",
        gap: "12px",
        marginBottom: "24px"
    },

    tabButton: {
        flex: 1,
        padding: "14px",
        borderRadius: "16px",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "600"
    },

    productRow: {
        display: "flex",
        alignItems: "center",
        padding: "14px 0"
    },

    productImage: {
        width: "90px",
        height: "90px",
        objectFit: "cover",
        borderRadius: "18px"
    },

    totalBox: {
        textAlign: "right",
        margin: "18px 0"
    },

    input: {
        width: "100%",
        padding: "15px",
        borderRadius: "16px",
        outline: "none"
    },

    payBtn: {
        width: "100%",
        marginTop: "16px",
        padding: "15px",
        borderRadius: "16px",
        border: "none",
        background: "linear-gradient(135deg,#22c55e,#16a34a)",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer"
    },

    emptyCard: {
        padding: "35px",
        borderRadius: "28px",
        textAlign: "center"
    },

    shopBtn: {
        marginTop: "16px",
        padding: "14px 20px",
        borderRadius: "16px",
        border: "none",
        background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
        color: "#fff",
        cursor: "pointer"
    }
};

export default MpesaPayment;