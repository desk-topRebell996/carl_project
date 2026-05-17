import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const SignUp = ({ darkMode, loginUser }) => {

    // 🌄 TRANQUIL AUTOMOTIVE BACKGROUND
    const tranquilBg =
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1974&auto=format&fit=crop";

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Password Strength
    const getPasswordStrength = (pass) => {
        if (pass.length < 6) return "Weak";
        if (pass.match(/^(?=.*[A-Z])(?=.*\d).{6,}$/)) return "Strong";
        return "Medium";
    };

    const passwordStrength = getPasswordStrength(password);

    // 🌗 THEME
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

        if (passwordStrength === "Weak") {
            setError("Password too weak. Add uppercase + number.");
            return;
        }

        setLoading("Creating account...");
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("password", password);
            data.append("phone", phone);

            const response = await axios.post(
                "http://carlkiboko.alwaysdata.net/api/signup",
                data
            );

            setLoading("");

            // ✅ AUTO LOGIN
            if (response.data.user) {
                loginUser?.(response.data.user);
                navigate("/");
                return;
            }

            setSuccess(response.data.success || "Account created successfully");

            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");

        } catch (err) {
            setLoading("");
            setError("Signup failed. Try again.");
        }
    };

    return (
        <div
            style={{
                ...styles.page,
                backgroundImage: `url(${tranquilBg})`
            }}
        >

            {/* 🌫️ DARK OVERLAY */}
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
                    Create Account
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

                {success ? (
                    <div style={{ textAlign: "center", color: theme.text }}>
                        <h3 style={{ color: "#22c55e" }}>🎉 {success}</h3>

                        <Link to="/signin" style={styles.button}>
                            Go to Sign In
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={submit}>

                        <input
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
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                ...styles.input,
                                background: theme.input,
                                color: theme.text,
                                border: `1px solid ${theme.border}`
                            }}
                        />

                        {/* PASSWORD */}
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
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

                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.eye}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </span>
                        </div>

                        {/* PASSWORD STRENGTH */}
                        {password && (
                            <p
                                style={{
                                    textAlign: "center",
                                    color:
                                        passwordStrength === "Weak"
                                            ? "#ef4444"
                                            : passwordStrength === "Medium"
                                            ? "#facc15"
                                            : "#22c55e"
                                }}
                            >
                                {passwordStrength} Password
                            </p>
                        )}

                        <input
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                                ...styles.input,
                                background: theme.input,
                                color: theme.text,
                                border: `1px solid ${theme.border}`
                            }}
                        />

                        <button style={styles.button}>
                            Sign Up
                        </button>

                    </form>
                )}

                <p style={{ textAlign: "center", color: theme.text }}>
                    Already have an account?
                </p>

                <Link to="/signin" style={styles.link}>
                    Sign In
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
        width: "380px",
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
        textAlign: "center",
        display: "block",
        textDecoration: "none",
        fontWeight: "600",
        boxShadow: "0 10px 25px rgba(59,130,246,0.35)"
    },

    link: {
        display: "block",
        textAlign: "center",
        marginTop: "10px",
        color: "#93c5fd",
        textDecoration: "none",
        fontWeight: "500"
    },

    eye: {
        position: "absolute",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        fontSize: "18px"
    }
};

export default SignUp;