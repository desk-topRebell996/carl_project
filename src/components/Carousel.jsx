import React, { useState, useEffect } from "react";

const Carousel = () => {

    const slides = [
        { id: 1, url: "/img/store.jpeg", title: "Slide 1" },
        { id: 2, url: "/img/store2.jpeg", title: "Slide 2" },
        { id: 3, url: "/img/store3.jpeg", title: "Slide 3" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex(
            (prev) => (prev + 1) % slides.length
        );
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) =>
                (prev - 1 + slides.length) %
                slides.length
        );
    };

    // AUTO SLIDE (FIXED FOR VERCEL BUILD)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(
                (prev) => (prev + 1) % slides.length
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div style={carouselContainer}>
            <button style={prevButton} onClick={prevSlide}>
                ‹
            </button>

            <img
                src={slides[currentIndex].url}
                alt={slides[currentIndex].title}
                style={slideImage}
            />

            <button style={nextButton} onClick={nextSlide}>
                ›
            </button>

            <div style={indicatorsContainer}>
                {slides.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            ...indicator,
                            ...(index === currentIndex
                                ? activeIndicator
                                : {}),
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

/* ✅ STYLES */
const carouselContainer = {
    position: "relative",
    width: "100%",
    maxWidth: "1000px",
    margin: "10px auto",
    overflow: "hidden",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const slideImage = {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    display: "block",
    borderRadius: "14px",
};

const buttonBase = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.45)",
    color: "white",
    border: "none",
    fontSize: "1.8rem",
    cursor: "pointer",
    padding: "2px 10px",
    zIndex: 2,
    borderRadius: "8px",
};

const prevButton = {
    ...buttonBase,
    left: "10px",
};

const nextButton = {
    ...buttonBase,
    right: "10px",
};

const indicatorsContainer = {
    textAlign: "center",
    marginTop: "6px",
};

const indicator = {
    display: "inline-block",
    width: "8px",
    height: "8px",
    margin: "0 4px",
    background: "#aaa",
    borderRadius: "50%",
    cursor: "pointer",
};

const activeIndicator = {
    background: "#111",
};

export default Carousel;