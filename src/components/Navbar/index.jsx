import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
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
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out delay-150 transform ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            } ${
                isAtTop
                    ? "bg-transparent"
                    : "bg-white/60 backdrop-blur-lg shadow-md"
            }`}
        >
            <div className="w-full py-4 flex items-center justify-center border-b-[1px] border-gray-300">
                <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
                    <img
                        src="/LogoSSYMU.png"
                        alt="SS Your Make up"
                        loading="lazy"
                        className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-500 ease-in-ou cursor-pointer ${
                            isVisible
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                        }`}
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                    <ul
                        className={`flex items-center justify-center gap-6 font-montserrat font-light text-xs md:text-base transition-all duration-500 ease-in-out ${
                            isVisible
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                        }`}
                    >
                        <li
                            className={`cursor-pointer hover:text-primary ${
                                location.pathname === "/"
                                    ? "text-primary font-semibold"
                                    : ""
                            }`}
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Main
                        </li>
                        <li
                            className={`cursor-pointer hover:text-primary ${
                                location.pathname.startsWith("/about")
                                    ? "text-primary font-semibold"
                                    : ""
                            }`}
                            onClick={() => {
                                navigate("/about");
                            }}
                        >
                            About Us
                        </li>
                        <li
                            className={`cursor-pointer hover:text-primary ${
                                location.pathname.startsWith("/catalog")
                                    ? "text-primary font-semibold"
                                    : ""
                            }`}
                            onClick={() => {
                                navigate("/catalog");
                            }}
                        >
                            Our Catalog
                        </li>
                        <li
                            className={`cursor-pointer hover:text-primary ${
                                location.pathname.startsWith("/blogs")
                                    ? "text-primary font-semibold"
                                    : ""
                            }`}
                            onClick={() => {
                                navigate("/blogs");
                            }}
                        >
                            Blogs
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
