import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ darkMode, setDarkMode, user, logoutUser }) => {

    const linkClass = ({ isActive }) =>
        isActive ? "nav-link active-link" : "nav-link custom-link";

    return (
        <nav
            style={{
                ...styles.navbar,
                background: darkMode
                    ? "rgba(17, 24, 39, 0.75)"
                    : "rgba(255,255,255,0.18)",
                border: darkMode
                    ? "1px solid rgba(245, 158, 11, 0.15)"
                    : "1px solid rgba(255,255,255,0.25)"
            }}
            className="navbar navbar-expand-lg sticky-top"
        >
            <div className="container">

                {/* LOGO */}
                <NavLink
                    to="/"
                    className="navbar-brand"
                    style={{
                        ...styles.logo,
                        color: darkMode ? "#f8fafc" : "#0f172a"
                    }}
                >
                    🚘 Carl Automotive
                </NavLink>

                {/* TOGGLER */}
                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#nav"
                    style={{
                        border: darkMode
                            ? "1px solid rgba(245,158,11,0.3)"
                            : "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "12px",
                        padding: "6px 10px"
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="nav">

                    <ul className="navbar-nav ms-auto align-items-center gap-3">

                        {/* HOME */}
                        <li>
                            <NavLink
                                to="/"
                                className={linkClass}
                                style={({ isActive }) => ({
                                    ...styles.link,
                                    ...(isActive ? styles.activeLink : {}),
                                    color: darkMode ? "#f8fafc" : "#0f172a"
                                })}
                            >
                                Home
                            </NavLink>
                        </li>

                        {/* ADD PRODUCT */}
                        {user && (
                            <li>
                                <NavLink
                                    to="/addproduct"
                                    className={linkClass}
                                    style={({ isActive }) => ({
                                        ...styles.link,
                                        ...(isActive ? styles.activeLink : {}),
                                        color: darkMode ? "#f8fafc" : "#0f172a"
                                    })}
                                >
                                    Add Product
                                </NavLink>
                            </li>
                        )}

                        {/* AUTH */}
                        {!user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/signup"
                                        style={({ isActive }) => ({
                                            ...styles.link,
                                            ...(isActive ? styles.activeLink : {}),
                                            color: darkMode ? "#f8fafc" : "#0f172a"
                                        })}
                                    >
                                        Sign Up
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/signin"
                                        style={({ isActive }) => ({
                                            ...styles.link,
                                            ...(isActive ? styles.activeLink : {}),
                                            color: darkMode ? "#f8fafc" : "#0f172a"
                                        })}
                                    >
                                        Sign In
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* PROFILE */}
                                <li>
                                    <div style={{
                                        ...styles.profile,
                                        background: darkMode
                                            ? "rgba(245,158,11,0.12)"
                                            : "rgba(255,255,255,0.28)",
                                        color: darkMode ? "#f8fafc" : "#0f172a"
                                    }}>
                                        👤 {user?.username || user?.name || "Profile"}
                                    </div>
                                </li>

                                {/* LOGOUT */}
                                <li>
                                    <button
                                        onClick={logoutUser}
                                        style={styles.logoutBtn}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                        {/* DARK MODE TOGGLE */}
                        <li>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                style={styles.themeBtn}
                            >
                                {darkMode ? "☀️" : "🌙"}
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

/* 🎨 STYLES */
const styles = {

    navbar: {
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        padding: "12px 0",
        transition: "0.3s ease"
    },

    logo: {
        fontWeight: "700",
        fontSize: "22px",
        letterSpacing: "0.5px",
        textDecoration: "none"
    },

    link: {
        padding: "10px 18px",
        borderRadius: "14px",
        textDecoration: "none",
        fontWeight: "500",
        transition: "0.3s ease",
        backdropFilter: "blur(10px)"
    },

    activeLink: {
        background: "linear-gradient(135deg, #f59e0b, #ef4444)",
        color: "#0b1220",
        fontWeight: "700",
        boxShadow: "0 10px 25px rgba(245,158,11,0.25)"
    },

    profile: {
        padding: "10px 16px",
        borderRadius: "16px",
        fontWeight: "600",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(245,158,11,0.15)"
    },

    logoutBtn: {
        border: "none",
        padding: "10px 18px",
        borderRadius: "14px",
        background: "linear-gradient(135deg,#ef4444,#7f1d1d)",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(239,68,68,0.25)"
    },

    themeBtn: {
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "1px solid rgba(245,158,11,0.3)",
        cursor: "pointer",
        fontSize: "18px",
        background: "rgba(245,158,11,0.15)",
        color: "#fbbf24",
        transition: "0.3s ease"
    }
};

export default NavBar;