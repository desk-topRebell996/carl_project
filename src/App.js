import React, { useState, useEffect } from "react";
import "./App.css";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddProduct from "./components/AddProduct";
import MpesaPayment from "./components/MpesaPayment";
import NavBar from "./components/NavBar";
import GetProduct from "./components/GetProduct";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Profile from "./components/Profile";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import banner from "./assets/wheel.jpeg";
import spin from "./assets/spin.jpeg";

/* 🔥 APP CONTENT */
const AppContent = () => {

    const location = useLocation();

    /* 🌙 PERSISTENT DARK MODE */
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(
            localStorage.getItem("darkMode")
        ) || false;
    });

    useEffect(() => {
        localStorage.setItem(
            "darkMode",
            JSON.stringify(darkMode)
        );
    }, [darkMode]);

    /* 👤 AUTH */
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("user")
            ) || null;
        } catch (err) {
            return null;
        }
    });

    const loginUser = (userData) => {

        setUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );
    };

    const logoutUser = () => {

        setUser(null);

        localStorage.removeItem("user");
    };

    return (
        <div
            className={
                darkMode
                    ? "App bg-dark text-light min-vh-100"
                    : "App min-vh-100"
            }
            style={{
                background: darkMode
                    ? "#0f172a"
                    : "#f8fafc",
                transition: "0.3s ease"
            }}
        >

            {/* ✅ NAVBAR */}
            <NavBar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                user={user}
                logoutUser={logoutUser}
            />

            {/* ✅ HERO ONLY HOME PAGE */}
            {location.pathname === "/" && (

                <header className="hero-header">

                    <img
                        src={banner}
                        alt="Carl Automotive"
                        className="hero-image"
                    />

                    <img
                        src={spin}
                        alt="spinning wheel"
                        className="hero-wheel"
                    />

                    <div className="hero-overlay">

                        <h1>
                            Carl Automotive
                        </h1>

                        <p>
                            Your Trusted Car & Spare Parts Dealer
                        </p>

                    </div>

                </header>
            )}

            {/* ✅ ROUTES */}
            <Routes>

                {/* 🏠 HOME */}
                <Route
                    path="/"
                    element={
                        <GetProduct
                            darkMode={darkMode}
                            user={user}
                        />
                    }
                />

                {/* 🔐 SIGN UP */}
                <Route
                    path="/signup"
                    element={
                        <SignUp
                            loginUser={loginUser}
                            darkMode={darkMode}
                        />
                    }
                />

                {/* 🔑 SIGN IN */}
                <Route
                    path="/signin"
                    element={
                        <SignIn
                            loginUser={loginUser}
                            darkMode={darkMode}
                        />
                    }
                />

                {/* ➕ ADD PRODUCT */}
                <Route
                    path="/addproduct"
                    element={
                        <AddProduct
                            user={user}
                            darkMode={darkMode}
                        />
                    }
                />

                {/* 💳 PAYMENT PAGE */}
                <Route
                    path="/mpesapayment"
                    element={
                        <MpesaPayment
                            darkMode={darkMode}
                        />
                    }
                />

                {/* 🛒 CART */}
                <Route
                    path="/cart"
                    element={
                        <Cart
                            darkMode={darkMode}
                        />
                    }
                />

                {/* ❤️ WISHLIST */}
                <Route
                    path="/wishlist"
                    element={
                        <Wishlist
                            darkMode={darkMode}
                        />
                    }
                />

                {/* 👤 PROFILE */}
                <Route
                    path="/profile"
                    element={
                        <Profile
                            darkMode={darkMode}
                        />
                    }
                />

            </Routes>

        </div>
    );
};

/* ✅ MAIN APP */
function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;