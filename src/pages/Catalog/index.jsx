import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import CardProduct from "../../components/CardProduct";
import { Carousel } from "../../components/CarouselCatalog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";

let url = import.meta.env.VITE_REACT_APP_API_KEY;

const Catalog = () => {
    const slideData = [
        {
            title: "Eye",
            button: "See more",
            src: "/SSYMU-Eyeshadow-Pallete.png",
            desc: "Define and blend for mesmerizing eyes.",
        },
        {
            title: "Face",
            button: "See more",
            src: "/SSYMU-Aura-Baked-Blush.png",
            desc: "Flawless glow that lasts all day.",
        },
        {
            title: "Lips",
            button: "See more",
            src: "/SSYMU-Tinted-Lip-Balm.png",
            desc: "Bold and smooth for irresistible lips.",
        },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getAllProduct = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/product/`);
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
        queryKey: ["AllProduct"],
        queryFn: () => getAllProduct(),
        enabled: !!url,
    });

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>Our Catalog - SS Your Makeup©</title>
                <meta
                    name="description"
                    content="SS Your Makeup is your destination for luxurious and glamorous beauty products. Explore our exclusive makeup collection designed to enhance your natural beauty with elegance and perfection."
                />
                <meta
                    name="keywords"
                    content="SS Your Makeup, beauty catalog, makeup collection, luxury beauty, glamorous cosmetics, elegant makeup, natural beauty, premium beauty products"
                />
                <meta name="author" content="SS Your Makeup" />
                <link
                    rel="canonical"
                    href="https://www.ssyourmakeup.id/catalog"
                />

                {/* Open Graph / Facebook Meta Tags (For Link Previews in Facebook & WhatsApp) */}
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Our Catalog SS Your Makeup©"
                />
                <meta
                    property="og:description"
                    content="SS Your Makeup is your destination for luxurious and glamorous beauty products. Explore our exclusive makeup collection designed to enhance your natural beauty with elegance and perfection."
                />
                <meta
                    property="og:url"
                    content="https://www.ssyourmakeup.id/catalog"
                />
                <meta
                    property="og:image"
                    content="https://www.ssyourmakeup.id/SSYMU-Eyeshadow-Pallete.png"
                />
                <meta property="og:site_name" content="SS Your Makeup" />
                <meta property="og:locale" content="en_US" />

                {/* WhatsApp Specific Meta Tags */}
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/jpeg" />

                {/* Twitter Card Meta Tags (For Twitter Previews) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Our Catalog SS Your Makeup©"
                />
                <meta
                    name="twitter:description"
                    content="SS Your Makeup is your destination for luxurious and glamorous beauty products. Explore our exclusive makeup collection designed to enhance your natural beauty with elegance and perfection."
                />
                <meta
                    name="twitter:image"
                    content="https://www.ssyourmakeup.id/SSYMU-Eyeshadow-Pallete.png"
                />
                <meta name="twitter:site" content="@SSYourMakeup" />

                {/* Meta Tags for WhatsApp & Messenger (FB) */}
                <meta
                    property="og:updated_time"
                    content="2024-03-05T12:00:00+00:00"
                />
                <meta
                    property="og:image:alt"
                    content="SS Your Makeup - Luxury Beauty Catalog"
                />
                <meta
                    property="og:image:secure_url"
                    content="https://www.ssyourmakeup.id/SSYMU-Eyeshadow-Pallete.png"
                />

                {/* Robots Meta Tags (For Search Engine Crawling) */}
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />

                {/* Schema.org Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: "Our Catalog - SS Your Makeup",
                        url: "https://www.ssyourmakeup.id/catalog",
                        description:
                            "SS Your Makeup is your destination for luxurious and glamorous beauty products. Explore our exclusive makeup collection designed to enhance your natural beauty with elegance and perfection.",
                        publisher: {
                            "@type": "Organization",
                            name: "SS Your Makeup",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://www.ssyourmakeup.id/LogoSSYMU.png",
                            },
                        },
                        image: "https://www.ssyourmakeup.id/SSYMU-Eyeshadow-Pallete.png",
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": "https://www.ssyourmakeup.id/catalog",
                        },
                        sameAs: [
                            "https://www.facebook.com/ssyourmakeup",
                            "https://www.instagram.com/ssyourmakeup/",
                            "https://twitter.com/ssyourmakeup",
                            "https://wa.me/6285121106283",
                        ],
                    })}
                </script>
            </Helmet>

            <Navbar />
            <Sidebar />
            <section
                className="w-full py-20 lg:py-12 flex items-center justify-center px-10 lg:px-36 bg-white overflow-hidden"
                data-aos="fade-up"
                data-aos-duration="3000"
            >
                <div className="flex flex-col items-start justify-center max-w-screen-xl m-auto pt-16 md:pt-32 ps-[31rem] md:ps-80 lg:ps-40 xl:ps-20 xl:px-20 lg:pb-10">
                    <Carousel slides={slideData} />
                </div>
            </section>

            <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 bg-white">
                <div
                    className="max-w-screen-xl m-auto flex flex-col items-center"
                    data-aos="fade-up"
                    data-aos-duration="3000"
                >
                    <div className="w-full flex items-center justify-between">
                        <div className="font-montserrat flex flex-col items-start justify-center gap-2">
                            <h1 className="text-xl md:text-4xl font-medium">
                                Discover Our Makeup Catalog
                            </h1>
                            <p className="text-sm md:text-base">
                                Explore beauty essentials tailored to enhance
                                your unique look.
                            </p>
                        </div>
                        <hr className="h-0.5 w-3/5 bg-black" />
                    </div>
                    {loadingProduct || fetchingProduct ? (
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
                        <div className="py-10 grid grid-cols-2 md:grid-cols-3">
                            {dataProduct?.dataProduct &&
                                dataProduct?.dataProduct.map(
                                    (product, index) => (
                                        <CardProduct
                                            key={index}
                                            data={product}
                                        />
                                    )
                                )}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Catalog;
