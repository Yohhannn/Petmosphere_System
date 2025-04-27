// ScrollToTopButton.jsx
import React, { useEffect, useState } from 'react';
import 'animate.css';

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        showButton && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-[#F69332] text-white p-3 rounded-full shadow-lg hover:bg-orange-500 transition-all animate__animated animate__fadeInUp z-50"
                aria-label="Scroll to top"
            >
                ↑
            </button>
        )
    );
};

export default ScrollToTopButton;
