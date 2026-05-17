import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({ darkMode, loginUser }) => {

    // 🌌 DIFFERENT TRANQUIL BACKGROUND
    const tranquilBg =
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1974&auto=format&fit=crop";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const theme = darkMode
        ? {
            glass: "rgba(15,23,42,0.45)",
            border: "rgba(255,255,255,0.15)",
            text: "#f8fafc",
            input: "rgba(255,255,255,0.08)"
        }
        : {
            glass: "rgba(255,255,255,0.18)",
            border: "rgba(255,255,255,0.25)",
            text: "#ffffff",
            input: "rgba(255,255,255,0.12)"
        };

    const submit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading("Signing you in...");
        setError("");

        try {
            const data = new FormData();
            data.append("username", username);
            data.append("password", password);

            const response = await axios.post(
                "https://malombeswala.alwaysdata.net/api/signin",
                data
            );

            setLoading("");

            if (response.data.user) {

                // ✅ GLOBAL LOGIN
                loginUser(response.data.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );

                navigate("/");
            } else {
                setError(response.data.message || "Login failed");
            }

        } catch (err) {
            setLoading("");
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div
            style={{
                ...styles.page,
                backgroundImage: `url(${tranquilBg})`
            }}
        >

            {/* 🌫️ OVERLAY */}
            <div style={styles.overlay}></div>

            {/* ✨ GLASS CARD */}
            <div
                style={{
                    ...styles.card,
                    background: theme.glass,
                    border: `1px solid ${theme.border}`
                }}
            >
                <h2 style={{ color: theme.text, textAlign: "center" }}>
                    Welcome Back
                </h2>

                {loading && (
                    <p style={{ color: "#60a5fa", textAlign: "center" }}>
                        {loading}
                    </p>
                )}

                {error && (
                    <p style={{ color: "#ef4444", textAlign: "center" }}>
                        {error}
                    </p>
                )}

                <form onSubmit={submit}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            ...styles.input,
                            background: theme.input,
                            color: theme.text,
                            border: `1px solid ${theme.border}`
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            ...styles.input,
                            background: theme.input,
                            color: theme.text,
                            border: `1px solid ${theme.border}`
                        }}
                    />

                    <button
                        style={styles.button}
                        disabled={loading !== ""}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <p style={{ textAlign: "center", color: theme.text }}>
                    Don’t have an account?
                </p>

                <Link to="/signup" style={styles.link}>
                    Create Account
                </Link>

            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    },

    overlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(2px)"
    },

    card: {
        width: "370px",
        padding: "28px",
        borderRadius: "28px",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        position: "relative",
        zIndex: 2
    },

    input: {
        width: "100%",
        padding: "14px",
        margin: "10px 0",
        borderRadius: "16px",
        outline: "none",
        fontSize: "15px",
        transition: "0.3s ease"
    },

    button: {
        width: "100%",
        padding: "14px",
        marginTop: "12px",
        borderRadius: "16px",
        border: "none",
        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "600",
        boxShadow: "0 10px 25px rgba(59,130,246,0.35)"
    },

    link: {
        display: "block",
        textAlign: "center",
        marginTop: "12px",
        color: "#93c5fd",
        textDecoration: "none",
        fontWeight: "500"
    }
};

export default SignIn;