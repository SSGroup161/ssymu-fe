import React, { useState, useEffect } from "react";

const Sidebar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setIsAtTop(currentScrollY === 0);

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`fixed top-1/2 left-0 transform -translate-y-1/2 z-50 transition-all rounded-r-xl duration-500 ease-in-out delay-150 ${
                isVisible ? "translate-x-0" : "-translate-x-full"
            } ${
                isAtTop
                    ? "bg-transparent"
                    : "bg-white/60 backdrop-blur-lg shadow-md"
            }`}
        >
            <div className="flex flex-col items-center gap-6 px-2 md:px-3 py-4 md:py-4 border border-gray-300 rounded-r-xl">
                <a href="https://www.tiktok.com/@ssyourmakeup" target="blank">
                    <img
                        src="/tiktokStroke.png"
                        alt="TikTok Logo"
                        loading="lazy"
                        className={`cursor-pointer w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ease-in-out ${
                            isVisible
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                        }`}
                    />
                </a>
                <a href="https://wa.me/6285121106283" target="blank">
                    <img
                        src="/wa.png"
                        alt="Whatsapp Logo"
                        loading="lazy"
                        className={`cursor-pointer h-4 w-4 md:w-5 md:h-5 transition-all duration-500 ease-in-out ${
                            isVisible
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                        }`}
                    />
                </a>
                <a
                    href="https://www.instagram.com/ssyourmakeup/"
                    target="blank"
                >
                    <img
                        src="/igStroke.png"
                        alt="Instagram Logo"
                        loading="lazy"
                        className={`cursor-pointer w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ease-in-out ${
                            isVisible
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                        }`}
                    />
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
