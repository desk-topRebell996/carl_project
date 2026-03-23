import React, { useState } from 'react';

const Carousel = () => {
    const slides = [
        { id: 1, url: '/img/store.jpeg', title: 'Slide 1' },
        { id: 2, url: '/img/store2.jpeg', title: 'Slide 2' },
        { id: 3, url: '/img/store3.jpeg', title: 'Slide 3' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div style={carouselContainer}>
            <button style={prevButton} onClick={prevSlide}>‹</button>
            <img
                src={slides[currentIndex].url}
                alt={slides[currentIndex].title}
                style={slideImage}
            />
            <button style={nextButton} onClick={nextSlide}>›</button>
            <div style={indicatorsContainer}>
                {slides.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            ...indicator,
                            ...(index === currentIndex ? activeIndicator : {})
                        }}
                    ></span>
                ))}
            </div>
        </div>
    );
};
const carouselContainer = {
    position: 'relative',
    width: '1100px',
    margin: 'auto',
    overflow: 'hidden',
    borderRadius: '10px',
};

const slideImage = {
    width: '100%',
    height: '400px',
    display: 'block',
    borderRadius: '10px',
    objectFit: 'Conver',
};

const buttonBase = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    padding: '0 10px',
    zIndex: 2,
};

const prevButton = {
    ...buttonBase,
    left: '10px',
};

const nextButton = {
    ...buttonBase,
    right: '10px',
};

const indicatorsContainer = {
    textAlign: 'center',
    marginTop: '10px',
};

const indicator = {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    margin: '0 5px',
    background: 'gray',
    borderRadius: '50%',
    cursor: 'pointer',
};

const activeIndicator = {
    background: 'black',
};

export default Carousel;
