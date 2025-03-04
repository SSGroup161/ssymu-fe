import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import CardProduct from "../../components/CardProduct";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

let url = import.meta.env.VITE_REACT_APP_API_KEY;

const categoryData = {
    eye: {
        type: "Eyes",
        title_id: "Accentuate your eyes with depth and style.",
        desc_id:
            "From eyeshadows to mascaras, eyeliners, and brow products, our eye makeup range offers bold and subtle shades for every occasion, allowing you to define and dramatize your look.",
        image1: "/SSYMU-Eye1.png",
        image2: "/SSYMU-Eye2.png",
    },
    lips: {
        type: "Lips",
        title_id: "Enhance your lips with vibrant colors.",
        desc_id:
            "Discover our collection of lipsticks, glosses, and balms designed to provide long-lasting color and hydration while complementing your unique beauty.",
        image1: "/SSYMU-Lips1.png",
        image2: "/SSYMU-Lips2.png",
    },
    face: {
        type: "Face",
        title_id: "Flawless base for a perfect look.",
        desc_id:
            "Explore our face makeup collection featuring foundations, blushes, and powders to create a smooth and radiant complexion.",
        image1: "/SSYMU-Face1.png",
        image2: "/SSYMU-Face2.png",
    },
};

const ProductCategory = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const categoryInfo = categoryData[category];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!categoryInfo) {
            navigate("*");
        }
    }, [category, categoryInfo, navigate]);

    if (!categoryInfo) {
        return null;
    }

    const getProductbyCategory = async (id) => {
        try {
            const response = await axios.get(
                `${url}/api/v1/product/category/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const {
        data: dataProduct,
        isLoading: loadingProduct,
        isFetching: fetchingProduct,
    } = useQuery({
        queryKey: ["ProductbyCategory", category],
        queryFn: () => getProductbyCategory(category),
        enabled: !!category,
    });

    const categoryConfig = {
        eye: {
            title: "Eye - SS Your Makeup",
            description:
                "Discover luxurious eye makeup from SS Your Makeup. Explore glamorous eyeshadows, eyeliners, and mascaras for a stunning and captivating look.",
        },
        lips: {
            title: "Lips - SS Your Makeup",
            description:
                "Enhance your lips with SS Your Makeup’s premium collection. From bold lipsticks to hydrating glosses, find the perfect shade for a glamorous touch.",
        },
        face: {
            title: "Face - SS Your Makeup",
            description:
                "Achieve a flawless complexion with SS Your Makeup. Explore our luxury foundations, blushes, and highlighters for a radiant, elegant glow.",
        },
    };

    const defaultConfig = {
        title: "SS Your Makeup©",
        description:
            "SS Your Makeup is the official website of a luxurious beauty brand that embodies glamour and elegance. Discover our premium makeup collections for a flawless, radiant look.",
    };

    const { title, description } = categoryConfig[category] || defaultConfig;
    const canonicalUrl = `https://www.ssyourmakeup.id/category/${
        category || ""
    }`;

    useEffect(() => {
        // Set page title
        document.title = title;

        // Meta description
        let metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.setAttribute("name", "description");
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", description);

        // Canonical link
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement("link");
            linkCanonical.setAttribute("rel", "canonical");
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute("href", canonicalUrl);

        // Open Graph tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement("meta");
            ogTitle.setAttribute("property", "og:title");
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute("content", title);

        let ogDescription = document.querySelector(
            'meta[property="og:description"]'
        );
        if (!ogDescription) {
            ogDescription = document.createElement("meta");
            ogDescription.setAttribute("property", "og:description");
            document.head.appendChild(ogDescription);
        }
        ogDescription.setAttribute("content", description);

        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (!ogUrl) {
            ogUrl = document.createElement("meta");
            ogUrl.setAttribute("property", "og:url");
            document.head.appendChild(ogUrl);
        }
        ogUrl.setAttribute("content", canonicalUrl);

        let ogType = document.querySelector('meta[property="og:type"]');
        if (!ogType) {
            ogType = document.createElement("meta");
            ogType.setAttribute("property", "og:type");
            document.head.appendChild(ogType);
        }
        ogType.setAttribute("content", "website");

        return () => {
            // Cleanup meta tags
            metaDescription?.remove();
            linkCanonical?.remove();
            ogTitle?.remove();
            ogDescription?.remove();
            ogUrl?.remove();
            ogType?.remove();
        };
    }, [title, description, canonicalUrl]);

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="w-full flex items-center justify-center">
                <div className="w-full h-full max-w-screen-lg md:max-w-screen-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 font-montserrat py-32 md:py-44 px-10 xl:ps-20 2xl:ps-0 items-center justify-center gap-20">
                    <div className="flex flex-col gap-4 relative order-2 lg:order-1">
                        <h2 className="font-medium text-xl md:text-2xl">
                            {categoryInfo.type}
                        </h2>
                        <h1 className="font-semibold text-3xl md:text-4xl text-primary">
                            {categoryInfo.title_id}
                        </h1>
                        <p className="text-sm md:text-base">
                            {categoryInfo.desc_id}
                        </p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="63"
                            height="55"
                            viewBox="0 0 63 55"
                            fill="none"
                            className="absolute -top-6 md:-top-10 lg:-top-32 right-0 md:right-20 lg:right-52"
                        >
                            <path
                                d="M31.5 0.0131836C32.5694 14.7122 46.0656 26.427 63 27.3552C46.0656 28.2835 32.5694 39.9982 31.5 54.6973C30.4306 39.9982 16.9343 28.2835 0 27.3552C16.9343 26.427 30.4306 14.7122 31.5 0.0131836Z"
                                fill="#CEAE83"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="47"
                            height="41"
                            viewBox="0 0 63 55"
                            fill="none"
                            className="absolute -top-16 md:-top-16 lg:-top-44 right-8 md:right-32 lg:right-64"
                        >
                            <path
                                d="M31.5 0.0131836C32.5694 14.7122 46.0656 26.427 63 27.3552C46.0656 28.2835 32.5694 39.9982 31.5 54.6973C30.4306 39.9982 16.9343 28.2835 0 27.3552C16.9343 26.427 30.4306 14.7122 31.5 0.0131836Z"
                                fill="#CEAE83"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="104"
                            height="90"
                            viewBox="0 0 63 55"
                            fill="none"
                            className="absolute -bottom-32 lg:-bottom-44 right-96 hidden md:block"
                        >
                            <path
                                d="M31.5 0.0131836C32.5694 14.7122 46.0656 26.427 63 27.3552C46.0656 28.2835 32.5694 39.9982 31.5 54.6973C30.4306 39.9982 16.9343 28.2835 0 27.3552C16.9343 26.427 30.4306 14.7122 31.5 0.0131836Z"
                                fill="#CEAE83"
                            />
                        </svg>
                    </div>
                    <div className="flex items-center justify-center relative order-1 lg:order-2">
                        <img
                            src={categoryInfo.image1}
                            alt={`SS Your Make Up - ${categoryInfo.type}`}
                            loading="lazy"
                            className="w-[30rem] rounded-xl"
                        />
                        <img
                            src={categoryInfo.image2}
                            alt={`SS Your Make Up - ${categoryInfo.type}`}
                            loading="lazy"
                            className="w-40 md:w-60 lg:w-80 rounded-xl absolute -bottom-10 md:-bottom-12 lg:-bottom-16 -left-6 md:-left-0 lg:-left-12"
                        />
                    </div>
                </div>
            </section>
            <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20">
                <div
                    className="max-w-screen-lg md:max-w-screen-xl overflow-hidden m-auto flex flex-col items-center"
                    data-aos="fade-up"
                    data-aos-duration="3000"
                >
                    <div className="w-full flex items-center justify-between">
                        <div className="font-montserrat flex flex-col items-start justify-center gap-2">
                            <h2 className="text-xl md:text-4xl font-medium">
                                Discover Our Makeup Catalog
                            </h2>
                            <p className="text-sm md:text-base">
                                Explore beauty essentials tailored to enhance
                                your unique look.
                            </p>
                        </div>
                        <hr className="h-0.5 w-3/5 bg-black" />
                    </div>
                    <div className="py-10 grid grid-cols-2 md:grid-cols-3">
                        {dataProduct?.dataProduct &&
                            dataProduct?.dataProduct.map((product, index) => (
                                <CardProduct key={index} data={product} />
                            ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ProductCategory;
