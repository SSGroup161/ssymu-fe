import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Bottombar from "../../components/Bottombar";
import CardProduct from "../../components/CardProduct";
import { Carousel } from "../../components/Carousel";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

let url = import.meta.env.VITE_REACT_APP_API_KEY;

const slideData = [
    {
        desc: "Very natural color dari warna warna earthone dimana juga lispstik, lip glossnya senada dan membuat kulit model lebih bercahaya tahan lama dan berkilau.",
        name: "Kiki Franky",
        src: "/SSYMU-Kiky.png",
        role: "Beauty Director",
    },
    {
        desc: "Dia punya tekstur makeup dan packagingnya sangat keren banget untuk aplikasinya itu gampang banget.",
        name: "Richardo Ricky",
        src: "/SSYMU-Richard.png",
        role: "Makeup Artist",
    },
    {
        desc: "Untuk tekstur enak untuk di blend juga untuk packagingnya keren banget cantik banget, jadi kalua misalnya kita mau bwa gitu ya untuk touch up di depan orang kayanya keren anget gtu.",
        name: "Mahmuda",
        src: "/SSYMU-Mahmuda.png",
        role: "Makeup Artist",
    },
];

const parseIngredients = (ingredientsString) => {
    const ingredientsArray = ingredientsString.split(". ").filter(Boolean);
    const parsedIngredients = {};

    ingredientsArray.slice(0, 3).forEach((ingredient, index) => {
        const [title, ...descParts] = ingredient.split(": ");
        if (title && descParts.length > 0) {
            parsedIngredients[`Ingredients_title${index + 1}`] = title.trim();
            parsedIngredients[`Ingredients_desc${index + 1}`] = descParts
                .join(": ")
                .trim();
        }
    });

    return parsedIngredients;
};

const parseHTU = (htuString) => {
    const htuArray = htuString.split(". ").filter(Boolean);
    const parsedHtu = {};

    htuArray.slice(0, 3).forEach((htu, index) => {
        const [title, ...descParts] = htu.split(": ");
        if (title && descParts.length > 0) {
            parsedHtu[`Htu_title${index + 1}`] = title.trim();
            parsedHtu[`Htu_desc${index + 1}`] = descParts.join(": ").trim();
        }
    });

    return parsedHtu;
};

const parseUSP = (uspString) => {
    const uspArray = uspString.split(". ").filter(Boolean);
    const parsedUsp = {};

    uspArray.slice(0, 4).forEach((usp, index) => {
        const [title, ...descParts] = usp.split(": ");
        if (title && descParts.length > 0) {
            parsedUsp[`Usp_title${index + 1}`] = title.trim();
            parsedUsp[`Usp_desc${index + 1}`] = descParts.join(": ").trim();
        }
    });

    return parsedUsp;
};

const ProductDetail = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [scale, setScale] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isNotFound, setIsNotFound] = useState(false);
    const searchParams = new URLSearchParams(location.search);
    const selectedVarianIndex = parseInt(searchParams.get("varian")) || 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getProductDetails = async (idProduct) => {
        try {
            const response = await axios.get(
                `${url}/api/v1/product/${idProduct}`
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                navigate("*");
                setIsNotFound(true);
            }
            throw error;
        }
    };

    const getAllProduct = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/product/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const { data, isLoading, isFetching, isError, error } = useQuery({
        queryKey: ["ProductDetail", id],
        queryFn: () => getProductDetails(id),
        enabled: !!id,
    });

    const {
        data: dataProduct,
        isLoading: loadingProduct,
        isFetching: fetchingProduct,
    } = useQuery({
        queryKey: ["AllProduct"],
        queryFn: () => getAllProduct(),
        enabled: !!url,
    });

    const title = `${
        data?.dataProduct && data?.dataProduct?.name_product
    } - SS Your Makeup©`;
    const description =
        data?.dataProduct && data?.dataProduct?.name_description;
    const canonicalUrl = `https://www.ssyourmakeup.id/catalog/product/${
        data?.dataProduct && data?.dataProduct?.id_title
    }`;

    useEffect(() => {
        document.title = title;

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
            metaDescription?.remove();
            linkCanonical?.remove();
            ogTitle?.remove();
            ogDescription?.remove();
            ogUrl?.remove();
            ogType?.remove();
        };
    }, [title, description, canonicalUrl]);

    const product = data?.dataProduct;
    const variants = [
        product?.varian1,
        product?.varian2,
        product?.varian3,
        product?.varian4,
        product?.varian5,
    ].filter((variant) => variant?.name && variant?.link);

    const selectedVariant = variants[selectedVarianIndex] || variants[0];

    useEffect(() => {
        if (isNotFound || (isError && error?.response?.status === 404)) {
            navigate("*");
        }
    }, [isNotFound, isError, error, navigate]);

    let resultIngredients;
    data
        ? (resultIngredients = parseIngredients(data?.dataProduct?.ingredients))
        : (resultIngredients = null);

    let resultHtu;
    data ? (resultHtu = parseHTU(data?.dataProduct?.htu)) : (resultHtu = null);

    let resultUsp;
    data ? (resultUsp = parseUSP(data?.dataProduct?.usp)) : (resultUsp = null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrollPosition(scrollY);

            let newTranslateX = 0;
            let stopThreshold = 2400;
            let elementId = "stop here laptop";

            if (window.innerWidth < 768) {
                // Mobile
                stopThreshold = 2400;
                elementId = "stop here mobile";
                if (scrollY < 250) {
                    newTranslateX = 0;
                } else if (scrollY >= 260 && scrollY < 1100) {
                    newTranslateX = -110;
                } else if (scrollY >= 1100 && scrollY < 2400) {
                    newTranslateX = 110;
                } else {
                    newTranslateX = 0;
                }
            } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                // Tablet
                stopThreshold = 2400;
                elementId = "stop here tab";
                if (scrollY < 250) {
                    newTranslateX = 0;
                } else if (scrollY >= 250 && scrollY < 1000) {
                    newTranslateX = -190;
                } else if (scrollY >= 1000 && scrollY < 2100) {
                    newTranslateX = 190;
                } else {
                    newTranslateX = 0;
                }
            } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
                // Laptop
                stopThreshold = 2400;
                elementId = "stop here laptop";
                if (scrollY < 250) {
                    newTranslateX = 0;
                } else if (scrollY >= 250 && scrollY < 1400) {
                    newTranslateX = -240;
                } else if (scrollY >= 1400 && scrollY < 2000) {
                    newTranslateX = 240;
                } else {
                    newTranslateX = 0;
                }
            } else {
                // XL / Desktop
                stopThreshold = 2600;
                elementId = "stop here";
                if (scrollY < 500) {
                    newTranslateX = 0;
                } else if (scrollY >= 400 && scrollY < 1300) {
                    newTranslateX = -380;
                } else if (scrollY >= 1400 && scrollY < 2400) {
                    newTranslateX = 380;
                } else {
                    newTranslateX = 0;
                }
            }

            setTranslateX(newTranslateX);

            const stopElement = document.getElementById(elementId);
            if (stopElement && scrollY >= stopThreshold) {
                setTranslateX(0);
                document.querySelectorAll("model-viewer").forEach((el) => {
                    el.style.position = "relative";
                });
            } else {
                document.querySelectorAll("model-viewer").forEach((el) => {
                    el.style.position = "fixed";
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrollPosition(scrollY);

            if (window.innerWidth < 1024) {
                // Mobile & Tablet
                setScale(Math.max(1 - scrollY * 0.0008, 0.5));
            } else {
                // Laptop & Desktop
                setScale(Math.max(1 - scrollY * 0.0008, 0.8));
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const rotateY = Math.min(scrollPosition * 0.2, 5);
    const rotateX = Math.max(scrollPosition * -0.05, -5);

    const recommendedProducts = dataProduct?.dataProduct.filter(
        (product) => product.id_title !== id
    );

    const dataTopProduct = recommendedProducts
        ? recommendedProducts.slice(0, 3)
        : [];

    return (
        <>
            <Navbar />
            <Sidebar />
            <Bottombar />
            {isLoading || isFetching ? (
                <section className="w-full h-screen flex flex-col items-center justify-center">
                    <div className="jelly-triangle">
                        <div className="jelly-triangle__dot"></div>
                        <div className="jelly-triangle__traveler"></div>
                    </div>
                    <svg width="0" height="0" className="jelly-maker">
                        <defs>
                            <filter id="uib-jelly-triangle-ooze">
                                <feGaussianBlur
                                    in="SourceGraphic"
                                    stdDeviation="7.3"
                                    result="blur"
                                ></feGaussianBlur>
                                <feColorMatrix
                                    in="blur"
                                    mode="matrix"
                                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                                    result="ooze"
                                ></feColorMatrix>
                                <feBlend
                                    in="SourceGraphic"
                                    in2="ooze"
                                ></feBlend>
                            </filter>
                        </defs>
                    </svg>
                </section>
            ) : (
                <div>
                    <section className="w-full flex items-center justify-center relative h-screen overflow-hidden">
                        <div className="w-full max-w-screen-lg md:max-w-screen-xl flex items-center justify-center">
                            <h1 className="font-playwrite text-[#DFC9AC] text-xl md:text-5xl xl:text-7xl 2xl:text-8xl -rotate-6 font-light">
                                {data?.dataProduct?.name_product}
                            </h1>
                        </div>
                    </section>

                    <section className="w-full h-[40rem] lg:h-[60rem] flex items-center justify-center overflow-hidden mb-32 md:mb-0">
                        <div className="grid grid-cols-2 w-full h-full max-w-screen-xl px-10">
                            <div className="col-span-1 w-full h-full"></div>
                            <div
                                className="col-span-1 w-full h-full flex items-center justify-center flex-col gap-4"
                                data-aos="fade-up"
                                data-aos-duration="3000"
                            >
                                <div className="w-full flex items-center justify-between">
                                    <h2 className="text-xl md:text-4xl font-medium font-montserrat">
                                        Description
                                    </h2>
                                    <hr className="h-0.5 w-3/5 bg-black" />
                                </div>
                                <p className="text-xs md:text-base font-montserrat">
                                    {data?.dataProduct?.description}
                                </p>
                                <div className="w-full flex flex-col items-start justify-center gap-4">
                                    <h2 className="font-montserrat font-medium">
                                        Ingredients:
                                    </h2>
                                    <ul className="flex flex-col gap-6 items-start justify-center">
                                        <li
                                            className={`flex items-center justify-center gap-4 ${
                                                resultIngredients?.Ingredients_title1
                                                    ? ""
                                                    : "hidden"
                                            }`}
                                        >
                                            <div className="p-2 md:p-4 rounded-full bg-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="28"
                                                    height="28"
                                                    viewBox="0 0 28 28"
                                                    fill="none"
                                                    className="hidden md:block"
                                                >
                                                    <path
                                                        d="M19.834 9.33333C9.33398 11.6667 6.88398 18.865 4.45732 24.8967L6.66232 25.6667L7.77065 22.9833C8.33065 23.1817 8.91398 23.3333 9.33398 23.3333C22.1673 23.3333 25.6673 3.5 25.6673 3.5C24.5007 5.83333 16.334 6.125 10.5007 7.29167C4.66732 8.45833 2.33398 13.4167 2.33398 15.75C2.33398 18.0833 4.37565 20.125 4.37565 20.125C8.16732 9.33333 19.834 9.33333 19.834 9.33333Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 28 28"
                                                    fill="none"
                                                    className="md:hidden"
                                                >
                                                    <path
                                                        d="M19.834 9.33333C9.33398 11.6667 6.88398 18.865 4.45732 24.8967L6.66232 25.6667L7.77065 22.9833C8.33065 23.1817 8.91398 23.3333 9.33398 23.3333C22.1673 23.3333 25.6673 3.5 25.6673 3.5C24.5007 5.83333 16.334 6.125 10.5007 7.29167C4.66732 8.45833 2.33398 13.4167 2.33398 15.75C2.33398 18.0833 4.37565 20.125 4.37565 20.125C8.16732 9.33333 19.834 9.33333 19.834 9.33333Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="font-montserrat">
                                                <p className="text-xs md:text-lg font-medium">
                                                    {
                                                        resultIngredients?.Ingredients_title1
                                                    }
                                                </p>
                                                <p className="text-xs md:text-base">
                                                    {
                                                        resultIngredients?.Ingredients_desc1
                                                    }
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            className={`flex items-center justify-center gap-4 ${
                                                resultIngredients?.Ingredients_title2
                                                    ? ""
                                                    : "hidden"
                                            }`}
                                        >
                                            <div className="p-2 md:p-4 rounded-full bg-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="28"
                                                    height="25"
                                                    viewBox="0 0 31 28"
                                                    fill="none"
                                                    className="hidden md:block"
                                                >
                                                    <g clipPath="url(#clip0_255_185653)">
                                                        <path
                                                            d="M2.22773 0.51416C2.90048 -0.169434 3.98763 -0.169434 4.66037 0.51416L9.04128 4.96025L11.8991 2.05635C13.4114 0.519629 15.8656 0.519629 17.3779 2.05635L25.5262 10.3415C27.0385 11.8782 27.0385 14.372 25.5262 15.9087L15.2789 26.3267C13.2607 28.3774 9.9885 28.3774 7.97027 26.3267L1.64648 19.9009C-0.371745 17.8501 -0.371745 14.5251 1.64648 12.4743L6.60326 7.4376L2.22773 2.98603C1.55499 2.30244 1.55499 1.19229 2.22773 0.508691V0.51416ZM11.7 12.6165L9.04128 9.91494L4.08451 14.9517C3.85846 15.1813 3.70777 15.4603 3.63242 15.7501H20.8116L23.0882 13.4368C23.255 13.2673 23.255 12.9884 23.0882 12.8188L14.9453 4.53369C14.7784 4.36416 14.5039 4.36416 14.3371 4.53369L11.4793 7.4376L14.138 10.1392C14.8107 10.8228 14.8107 11.9329 14.138 12.6165C13.4652 13.3001 12.3727 13.3001 11.7 12.6165ZM27.5552 28.0001C25.6553 28.0001 24.1107 26.4306 24.1107 24.5001C24.1107 23.122 25.8652 20.147 26.8663 18.5556C27.1892 18.0415 27.9158 18.0415 28.2387 18.5556C29.2451 20.147 30.9996 23.122 30.9996 24.5001C30.9996 26.4306 29.455 28.0001 27.5552 28.0001Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_255_185653">
                                                            <rect
                                                                width="31"
                                                                height="28"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="14"
                                                    viewBox="0 0 31 28"
                                                    fill="none"
                                                    className="md:hidden"
                                                >
                                                    <g clipPath="url(#clip0_255_185653)">
                                                        <path
                                                            d="M2.22773 0.51416C2.90048 -0.169434 3.98763 -0.169434 4.66037 0.51416L9.04128 4.96025L11.8991 2.05635C13.4114 0.519629 15.8656 0.519629 17.3779 2.05635L25.5262 10.3415C27.0385 11.8782 27.0385 14.372 25.5262 15.9087L15.2789 26.3267C13.2607 28.3774 9.9885 28.3774 7.97027 26.3267L1.64648 19.9009C-0.371745 17.8501 -0.371745 14.5251 1.64648 12.4743L6.60326 7.4376L2.22773 2.98603C1.55499 2.30244 1.55499 1.19229 2.22773 0.508691V0.51416ZM11.7 12.6165L9.04128 9.91494L4.08451 14.9517C3.85846 15.1813 3.70777 15.4603 3.63242 15.7501H20.8116L23.0882 13.4368C23.255 13.2673 23.255 12.9884 23.0882 12.8188L14.9453 4.53369C14.7784 4.36416 14.5039 4.36416 14.3371 4.53369L11.4793 7.4376L14.138 10.1392C14.8107 10.8228 14.8107 11.9329 14.138 12.6165C13.4652 13.3001 12.3727 13.3001 11.7 12.6165ZM27.5552 28.0001C25.6553 28.0001 24.1107 26.4306 24.1107 24.5001C24.1107 23.122 25.8652 20.147 26.8663 18.5556C27.1892 18.0415 27.9158 18.0415 28.2387 18.5556C29.2451 20.147 30.9996 23.122 30.9996 24.5001C30.9996 26.4306 29.455 28.0001 27.5552 28.0001Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_255_185653">
                                                            <rect
                                                                width="31"
                                                                height="28"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="font-montserrat">
                                                <p className="text-xs md:text-lg font-medium">
                                                    {
                                                        resultIngredients?.Ingredients_title2
                                                    }
                                                </p>
                                                <p className="text-xs md:text-base">
                                                    {
                                                        resultIngredients?.Ingredients_desc2
                                                    }
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            className={`flex items-center justify-center gap-4 ${
                                                resultIngredients?.Ingredients_title3
                                                    ? ""
                                                    : "hidden"
                                            }`}
                                        >
                                            <div className="p-2 md:p-4 rounded-full bg-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="33"
                                                    height="33"
                                                    viewBox="0 0 33 33"
                                                    fill="none"
                                                    className="hidden md:block"
                                                >
                                                    <path
                                                        d="M10.7529 7.24097C8.04523 9.72589 4.44843 12.0764 1.24414 12.7859C3.76406 13.7127 6.98279 13.9923 9.92707 13.3761C13.3601 15.3954 18.1832 15.4505 21.8429 13.3761C24.7427 14.362 28.0527 14.2256 31.4908 12.776C27.6517 12.1569 23.4339 9.451 21.4844 7.24103C17.9071 9.79466 14.3301 9.31294 10.753 7.24103L10.7529 7.24097ZM2.13424 14.5906C3.25121 16.4966 5.25809 19.6983 7.91891 23.038C9.67461 25.2416 12.8564 25.0421 16.2959 25.0421C19.4733 25.0421 22.8888 25.0876 24.5217 23.0381C26.9531 19.9863 28.9425 17.0992 30.2076 15.1748C22.1591 20.623 9.79056 21.1806 2.13424 14.5907V14.5906Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 33 33"
                                                    fill="none"
                                                    className="md:hidden"
                                                >
                                                    <path
                                                        d="M10.7529 7.24097C8.04523 9.72589 4.44843 12.0764 1.24414 12.7859C3.76406 13.7127 6.98279 13.9923 9.92707 13.3761C13.3601 15.3954 18.1832 15.4505 21.8429 13.3761C24.7427 14.362 28.0527 14.2256 31.4908 12.776C27.6517 12.1569 23.4339 9.451 21.4844 7.24103C17.9071 9.79466 14.3301 9.31294 10.753 7.24103L10.7529 7.24097ZM2.13424 14.5906C3.25121 16.4966 5.25809 19.6983 7.91891 23.038C9.67461 25.2416 12.8564 25.0421 16.2959 25.0421C19.4733 25.0421 22.8888 25.0876 24.5217 23.0381C26.9531 19.9863 28.9425 17.0992 30.2076 15.1748C22.1591 20.623 9.79056 21.1806 2.13424 14.5907V14.5906Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="font-montserrat">
                                                <p className="text-xs md:text-lg font-medium">
                                                    {
                                                        resultIngredients?.Ingredients_title3
                                                    }
                                                </p>
                                                <p className="text-xs md:text-base">
                                                    {
                                                        resultIngredients?.Ingredients_desc3
                                                    }
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section baru */}
                    <section className="w-full md:h-[60rem] flex items-center justify-center">
                        <div className="grid grid-cols-2 w-full h-full max-w-screen-xl px-10">
                            <div className="col-span-1 w-full h-full flex items-center justify-center">
                                <div
                                    className="flex flex-col items-start font-montserrat gap-4"
                                    data-aos="fade-up"
                                    data-aos-duration="3000"
                                >
                                    <div className="w-full flex items-center justify-between">
                                        <h2 className="text-xl md:text-4xl font-medium font-montserrat">
                                            How to Use?
                                        </h2>
                                        <hr className="h-0.5 w-3/5 bg-black" />
                                    </div>
                                    <p className="text-sm md:text-base font-montserrat">
                                        Achieve maximum results with a few
                                        simple steps. Let your beauty shine at
                                        its best, exuding confidence and
                                        elegance!
                                    </p>
                                    <ul className="w-full font-montserrat flex flex-col gap-4">
                                        <li className="w-full flex shadow-lg p-6 rounded-xl gap-4 items-start md:items-center justify-start">
                                            <div className="p-4 md:p-6 rounded-full bg-primary flex items-center justify-center text-white">
                                                <span className="w-2 h-2 flex items-center justify-center text-lg">
                                                    1
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-sm md:text-base font-medium">
                                                    {resultHtu?.Htu_title1}
                                                </h2>
                                                <p className="text-xs md:text-base">
                                                    {resultHtu?.Htu_desc1}
                                                </p>
                                            </div>
                                        </li>
                                        <li className="w-full flex shadow-lg p-6 rounded-xl gap-4 items-start md:items-center justify-start">
                                            <div className="p-4 md:p-6 rounded-full bg-primary flex items-center justify-center text-white">
                                                <span className="w-2 h-2 flex items-center justify-center text-lg">
                                                    2
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-sm md:text-base font-medium">
                                                    {resultHtu?.Htu_title2}
                                                </h2>
                                                <p className="text-xs md:text-base">
                                                    {resultHtu?.Htu_desc2}
                                                </p>
                                            </div>
                                        </li>
                                        <li className="w-full flex shadow-lg p-6 rounded-xl gap-4 items-start md:items-center justify-start">
                                            <div className="p-4 md:p-6 rounded-full bg-primary flex items-center justify-center text-white">
                                                <span className="w-2 h-2 flex items-center justify-center text-lg">
                                                    3
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-sm md:text-base font-medium">
                                                    {resultHtu?.Htu_title3}
                                                </h2>
                                                <p className="text-xs md:text-base">
                                                    {resultHtu?.Htu_desc3}
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-span-1 w-full h-full"></div>
                        </div>
                    </section>

                    <section className="w-full flex items-center justify-center">
                        <div className="flex flex-col w-full h-full max-w-screen-xl px-10 pb-20 md:pb-0">
                            <div
                                className="w-full h-[50vh] xl:block hidden"
                                id="stop here"
                            >
                                <model-viewer
                                    src={
                                        selectedVariant?.asset ||
                                        data?.dataProduct?.varian1?.asset
                                    }
                                    alt="SSYMU - AsetProduct"
                                    auto-rotate
                                    poster={
                                        selectedVariant?.poster ||
                                        data?.dataProduct?.poster
                                    }
                                    rotation-per-second="30deg"
                                    shadow-intensity="1"
                                    interaction-prompt="none"
                                    style={{
                                        width: "500px",
                                        height: "500px",
                                        position: "fixed",
                                        top: "50%",
                                        left: "50%",
                                        transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                                        transition: "transform 0.5s ease-out",
                                        zIndex: 10,
                                        "--poster-width": "70%",
                                        "--poster-height": "70%",
                                    }}
                                ></model-viewer>
                            </div>
                            <div
                                className="w-full h-[50vh] md:hidden"
                                id="stop here mobile"
                            >
                                <model-viewer
                                    src={
                                        selectedVariant?.asset ||
                                        data?.dataProduct?.varian1?.asset
                                    }
                                    alt="SSYMU - AsetProduct"
                                    auto-rotate
                                    poster={
                                        selectedVariant?.poster ||
                                        data?.dataProduct?.poster
                                    }
                                    rotation-per-second="30deg"
                                    shadow-intensity="1"
                                    interaction-prompt="none"
                                    style={{
                                        width: "400px",
                                        height: "400px",
                                        position: "fixed",
                                        top: "50%",
                                        left: "50%",
                                        transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                                        transition: "transform 0.5s ease-out",
                                        zIndex: 10,
                                        "--poster-width": "70%",
                                        "--poster-height": "70%",
                                    }}
                                ></model-viewer>
                            </div>
                            <div
                                className="w-full h-[50vh] hidden md:block lg:hidden"
                                id="stop here tab"
                            >
                                <model-viewer
                                    src={
                                        selectedVariant?.asset ||
                                        data?.dataProduct?.varian1?.asset
                                    }
                                    alt="SSYMU - AsetProduct"
                                    auto-rotate
                                    poster={
                                        selectedVariant?.poster ||
                                        data?.dataProduct?.poster
                                    }
                                    rotation-per-second="30deg"
                                    shadow-intensity="1"
                                    interaction-prompt="none"
                                    style={{
                                        width: "600px",
                                        height: "600px",
                                        position: "fixed",
                                        top: "50%",
                                        left: "50%",
                                        transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                                        transition: "transform 0.5s ease-out",
                                        zIndex: 10,
                                        "--poster-width": "70%",
                                        "--poster-height": "70%",
                                    }}
                                ></model-viewer>
                            </div>
                            <div
                                className="w-full h-[50vh] hidden lg:block xl:hidden"
                                id="stop here laptop"
                            >
                                <model-viewer
                                    src={
                                        selectedVariant?.asset ||
                                        data?.dataProduct?.varian1?.asset
                                    }
                                    alt="SSYMU - AsetProduct"
                                    auto-rotate
                                    poster={
                                        selectedVariant?.poster ||
                                        data?.dataProduct?.poster
                                    }
                                    rotation-per-second="30deg"
                                    shadow-intensity="1"
                                    interaction-prompt="none"
                                    style={{
                                        width: "350px",
                                        height: "350px",
                                        position: "fixed",
                                        top: "50%",
                                        left: "50%",
                                        transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                                        transition: "transform 0.5s ease-out",
                                        zIndex: 10,
                                        "--poster-width": "70%",
                                        "--poster-height": "70%",
                                    }}
                                ></model-viewer>
                            </div>
                            <div className="w-full h-full">
                                <div
                                    className="w-full flex items-center justify-between"
                                    data-aos="fade-up"
                                    data-aos-duration="3000"
                                >
                                    <div className="font-montserrat flex flex-col items-start justify-center gap-2">
                                        <h2 className="text-xl md:text-4xl font-medium">
                                            Product USP (Unique Selling
                                            Proposition)
                                        </h2>
                                        <p className="text-sm md:text-base">
                                            Here’s why{" "}
                                            <span className="text-primary">
                                                {
                                                    data?.dataProduct
                                                        ?.name_product
                                                }
                                            </span>{" "}
                                            is the ultimate beauty essential you
                                            won’t want to be without.
                                        </p>
                                    </div>
                                    <hr className="h-0.5 w-3/5 bg-black" />
                                </div>
                            </div>
                            <div className="w-full font-montserrat py-16 md:py-24">
                                <div
                                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                                    data-aos="fade-up"
                                    data-aos-duration="3000"
                                >
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="50"
                                            height="50"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                        >
                                            <path
                                                d="M10.1797 50.7499C11.5303 51.8829 13.2369 52.5038 14.9997 52.5038C16.7626 52.5038 18.4691 51.8829 19.8197 50.7499C21.1705 49.6166 22.0788 48.0437 22.3851 46.3072C22.6915 44.5708 22.3762 42.782 21.4947 41.2549L16.2572 33.1874C16.1209 32.9785 15.9347 32.8069 15.7153 32.6881C15.496 32.5693 15.2504 32.5071 15.001 32.5071C14.7515 32.5071 14.506 32.5693 14.2867 32.6881C14.0673 32.8069 13.8811 32.9785 13.7447 33.1874L8.49974 41.2549C7.61856 42.7823 7.30371 44.5713 7.61049 46.3077C7.91727 48.0441 8.82855 49.617 10.1797 50.7499ZM40.1797 50.7499C41.5304 51.8829 43.2369 52.5038 44.9997 52.5038C46.7626 52.5038 48.4691 51.8829 49.8197 50.7499C51.1705 49.6166 52.0788 48.0437 52.3851 46.3072C52.6915 44.5708 52.3762 42.782 51.4947 41.2549L46.2572 33.1874C46.1209 32.9785 45.9347 32.8069 45.7153 32.6881C45.496 32.5693 45.2504 32.5071 45.001 32.5071C44.7515 32.5071 44.506 32.5693 44.2867 32.6881C44.0673 32.8069 43.881 32.9785 43.7447 33.1874L38.4997 41.2549C37.6186 42.7823 37.3037 44.5713 37.6105 46.3077C37.9173 48.0441 38.8261 49.617 40.1772 50.7499H40.1797ZM25.1797 25.7499C26.5303 26.8829 28.2369 27.5038 29.9997 27.5038C31.7626 27.5038 33.4691 26.8829 34.8197 25.7499C36.1705 24.6166 37.0788 23.0437 37.3851 21.3072C37.6915 19.5708 37.3762 17.782 36.4947 16.2549L31.2572 8.18742C31.1209 7.97851 30.9347 7.80688 30.7153 7.68809C30.496 7.56929 30.2504 7.50708 30.001 7.50708C29.7515 7.50708 29.506 7.56929 29.2867 7.68809C29.0673 7.80688 28.8811 7.97851 28.7447 8.18742L23.4997 16.2549C22.6186 17.7823 22.3037 19.5713 22.6105 21.3077C22.9173 23.0441 23.8286 24.617 25.1797 25.7499Z"
                                                stroke="black"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <h2 className="text-primary font-medium text-center text-sm md:text-base">
                                            {resultUsp?.Usp_title1}
                                        </h2>
                                        <p className="text-center text-sm md:text-base">
                                            {resultUsp?.Usp_desc1}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="50"
                                            height="50"
                                            viewBox="0 0 56 55"
                                            fill="none"
                                        >
                                            <path
                                                d="M18.8327 45.8333H37.166V38.9583C37.166 36.4374 36.2684 34.2794 34.4733 32.4843C32.6782 30.6892 30.5202 29.7916 27.9993 29.7916C25.4785 29.7916 23.3205 30.6892 21.5254 32.4843C19.7303 34.2794 18.8327 36.4374 18.8327 38.9583V45.8333ZM27.9993 25.2083C30.5202 25.2083 32.6782 24.3107 34.4733 22.5155C36.2684 20.7204 37.166 18.5624 37.166 16.0416V9.16659H18.8327V16.0416C18.8327 18.5624 19.7303 20.7204 21.5254 22.5155C23.3205 24.3107 25.4785 25.2083 27.9993 25.2083ZM9.66602 50.4166V45.8333H14.2493V38.9583C14.2493 36.6284 14.794 34.4414 15.8833 32.3972C16.9726 30.353 18.4905 28.7206 20.4368 27.4999C18.4889 26.2777 16.9711 24.6453 15.8833 22.6026C14.7955 20.56 14.2509 18.373 14.2493 16.0416V9.16659H9.66602V4.58325H46.3327V9.16659H41.7493V16.0416C41.7493 18.3714 41.2055 20.5585 40.1177 22.6026C39.0299 24.6468 37.5113 26.2792 35.5618 27.4999C37.5098 28.7221 39.0284 30.3553 40.1177 32.3995C41.207 34.4437 41.7509 36.6299 41.7493 38.9583V45.8333H46.3327V50.4166H9.66602Z"
                                                fill="black"
                                            />
                                        </svg>
                                        <h2 className="text-primary font-medium text-center text-sm md:text-base">
                                            {resultUsp?.Usp_title2}
                                        </h2>
                                        <p className="text-center text-sm md:text-base">
                                            {resultUsp?.Usp_desc2}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="50"
                                            height="50"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                        >
                                            <path
                                                d="M17.5 52.5C17.5 52.5 18.75 41.25 27.5 31.25"
                                                stroke="black"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M47.8245 10.6049L49.3095 26.0424C50.2445 35.7574 42.9595 44.4074 33.247 45.3424C23.7145 46.2599 15.0795 39.2924 14.162 29.7599C13.7211 25.1823 15.1167 20.617 18.0418 17.0684C20.9669 13.5197 25.1818 11.2784 29.7595 10.8374L46.187 9.25745C46.3831 9.23848 46.5811 9.25837 46.7696 9.31596C46.9581 9.37355 47.1334 9.46773 47.2855 9.5931C47.4375 9.71848 47.5634 9.87259 47.6559 10.0466C47.7484 10.2207 47.8057 10.4088 47.8245 10.6049Z"
                                                stroke="black"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <h2 className="text-primary font-medium text-center text-sm md:text-base">
                                            {resultUsp?.Usp_title3}
                                        </h2>
                                        <p className="text-center text-sm md:text-base">
                                            {resultUsp?.Usp_desc3}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="50"
                                            height="50"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                        >
                                            <path
                                                d="M37.5 15L45 22.5M15 52.5L52.5 15L45 7.5L7.5 45L15 52.5ZM22.5 7.5C22.5 8.82608 23.0268 10.0979 23.9645 11.0355C24.9021 11.9732 26.1739 12.5 27.5 12.5C26.1739 12.5 24.9021 13.0268 23.9645 13.9645C23.0268 14.9021 22.5 16.1739 22.5 17.5C22.5 16.1739 21.9732 14.9021 21.0355 13.9645C20.0979 13.0268 18.8261 12.5 17.5 12.5C18.8261 12.5 20.0979 11.9732 21.0355 11.0355C21.9732 10.0979 22.5 8.82608 22.5 7.5ZM47.5 32.5C47.5 33.8261 48.0268 35.0979 48.9645 36.0355C49.9021 36.9732 51.1739 37.5 52.5 37.5C51.1739 37.5 49.9021 38.0268 48.9645 38.9645C48.0268 39.9021 47.5 41.1739 47.5 42.5C47.5 41.1739 46.9732 39.9021 46.0355 38.9645C45.0979 38.0268 43.8261 37.5 42.5 37.5C43.8261 37.5 45.0979 36.9732 46.0355 36.0355C46.9732 35.0979 47.5 33.8261 47.5 32.5Z"
                                                stroke="#030202"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <h2 className="text-primary font-medium text-center text-sm md:text-base">
                                            {resultUsp?.Usp_title4}
                                        </h2>
                                        <p className="text-center text-sm md:text-base">
                                            {resultUsp?.Usp_desc4}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="w-full flex items-center justify-center">
                        <div className="flex flex-col w-full h-full max-w-screen-xl px-10 md:py-0 py-20">
                            <div
                                className="w-full h-full"
                                data-aos="fade-up"
                                data-aos-duration="3000"
                            >
                                <div className="w-full flex items-center justify-between">
                                    <div className="font-montserrat flex flex-col items-start justify-center gap-2">
                                        <h2 className="text-xl md:text-4xl font-medium">
                                            Trusted by Experts
                                        </h2>
                                        <p className="text-sm md:text-base max-w-[30rem]">
                                            Beauty experts love SS Your Makeup
                                            for its premium quality, easy use,
                                            and flawless results.
                                        </p>
                                    </div>
                                    <hr className="h-0.5 w-3/5 bg-black" />
                                </div>
                            </div>
                            <div
                                className="relative w-full h-full py-10 md:py-20 overflow-x-hidden"
                                data-aos="fade-up"
                                data-aos-duration="3000"
                            >
                                <Carousel slides={slideData} />
                            </div>
                        </div>
                    </section>

                    <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 bg-white mt-24">
                        <div
                            className="max-w-screen-xl m-auto flex flex-col items-center"
                            data-aos="fade-up"
                            data-aos-duration="3000"
                        >
                            <div className="w-full flex items-center justify-between">
                                <div className="font-montserrat flex flex-col items-start justify-center gap-2">
                                    <h2 className="text-xl md:text-4xl font-medium">
                                        Top Recomendation
                                    </h2>
                                    <p className="text-sm md:text-base">
                                        Explore beauty essentials tailored to
                                        enhance your unique look
                                    </p>
                                </div>
                                <hr className="h-0.5 w-3/5 bg-black" />
                            </div>
                            <div className="py-10 grid grid-cols-2 md:grid-cols-3">
                                {dataTopProduct &&
                                    dataTopProduct.map((product, index) => (
                                        <CardProduct
                                            key={index}
                                            data={product}
                                        />
                                    ))}
                            </div>
                        </div>
                    </section>
                </div>
            )}
            {/* Footer */}
            <Footer />
        </>
    );
};

export default ProductDetail;
