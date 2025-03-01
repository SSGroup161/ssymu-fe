import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

let url = import.meta.env.VITE_REACT_APP_API_KEY;

const Bottombar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const getProductDetails = async (idProduct) => {
        const response = await axios.get(`${url}/api/v1/product/${idProduct}`);
        return response.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["ProductDetail", id],
        queryFn: () => getProductDetails(id),
        enabled: !!id,
    });

    const product = data?.dataProduct;

    const variants = [
        product?.varian1,
        product?.varian2,
        product?.varian3,
        product?.varian4,
        product?.varian5,
    ].filter((variant) => variant?.name && variant?.link);

    const searchParams = new URLSearchParams(location.search);
    const selectedVarianIndex = parseInt(searchParams.get("varian")) || 0;

    const [selectedVariant, setSelectedVariant] = useState(
        variants.length > 0
            ? variants[selectedVarianIndex]
            : {
                  name: product?.name_product,
                  link: product?.varian1?.link,
                  color: "#ddd",
              }
    );

    useEffect(() => {
        if (variants.length > 0) {
            setSelectedVariant(variants[selectedVarianIndex] || variants[0]);
        } else {
            setSelectedVariant({
                name: product?.name_product,
                link: product?.varian1?.link,
                color: "#ddd",
            });
        }
    }, [data, selectedVarianIndex]);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setIsAtBottom(currentScrollY + windowHeight >= documentHeight - 10);

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleVariantChange = (index) => {
        setSelectedVariant(variants[index]);
        navigate(`?varian=${index}`);
    };

    return (
        <section
            className={`fixed bottom-0 left-0 w-full z-50 transition-all duration-500 ease-in-out transform ${
                isVisible ? "translate-y-0" : "translate-y-full"
            } ${
                isAtBottom
                    ? "bg-transparent"
                    : "bg-white/60 backdrop-blur-lg shadow-md"
            }`}
        >
            <div className="w-full py-4 flex items-center justify-center border-t-[1px] border-gray-300">
                <div className="w-full flex items-center justify-between px-10 md:px-20 lg:px-40">
                    <div className="flex items-center gap-2 md:gap-4">
                        {variants.length > 0 ? (
                            variants.map((variant, index) => (
                                <div
                                    key={index}
                                    className={`w-8 h-8 md:w-12 md:h-12 rounded-full cursor-pointer transition-all duration-300 ease-in-out`}
                                    style={{
                                        backgroundColor:
                                            variant.color || "#ddd",
                                        border:
                                            selectedVariant.name ===
                                            variant.name
                                                ? "2px solid gray"
                                                : "2px solid transparent",
                                        transform:
                                            selectedVariant.name ===
                                            variant.name
                                                ? "scale(1.1)"
                                                : "scale(0.9)",
                                    }}
                                    onClick={() => handleVariantChange(index)}
                                ></div>
                            ))
                        ) : (
                            <div
                                className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-300 border border-gray-500"
                                title="No Variants Available"
                            ></div>
                        )}
                    </div>
                    <h1 className="font-montserrat text-xl hidden md:block">
                        {selectedVariant.name || product?.name_product}
                    </h1>
                    <div>
                        <div>
                            <div>
                                <a
                                    href={
                                        selectedVariant?.link ||
                                        product?.varian1?.link ||
                                        "#"
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        if (
                                            !selectedVariant?.link &&
                                            !product?.varian1?.link
                                        ) {
                                            e.preventDefault();
                                            alert(
                                                "No valid link available for this product."
                                            );
                                        }
                                    }}
                                >
                                    <button
                                        className={`button-shop ${
                                            !selectedVariant?.link &&
                                            !product?.varian1?.link
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        disabled={
                                            !selectedVariant?.link &&
                                            !product?.varian1?.link
                                        }
                                    >
                                        <div className="default-btn font-montserrat">
                                            <span>Rp.</span>
                                            <span>
                                                {product?.price || "N/A"}
                                            </span>
                                        </div>
                                        <div className="hover-btn font-montserrat">
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="20"
                                                height="20"
                                                stroke="#ffffff"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="cart-icon"
                                            >
                                                <circle
                                                    cx="9"
                                                    cy="21"
                                                    r="1"
                                                ></circle>
                                                <circle
                                                    cx="20"
                                                    cy="21"
                                                    r="1"
                                                ></circle>
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                            <span>Shop Now</span>
                                        </div>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Bottombar;
