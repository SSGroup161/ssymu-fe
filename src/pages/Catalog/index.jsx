import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import CardProduct from "../../components/CardProduct";
import { Carousel } from "../../components/CarouselCatalog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

let url = import.meta.env.VITE_REACT_APP_API_KEY;

const Catalog = () => {
    const slideData = [
        {
            title: "Eye",
            button: "See more",
            src: "/assetCatalog1.png",
            desc: "Define and blend for mesmerizing eyes.",
        },
        {
            title: "Face",
            button: "See more",
            src: "/assetCatalog2.png",
            desc: "Flawless glow that lasts all day.",
        },
        {
            title: "Lips",
            button: "See more",
            src: "/assetCatalog3.png",
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

    const title = "Our Catalog SS Your Makeup©";
    const description =
        "SS Your Makeup is your destination for luxurious and glamorous beauty products. Explore our exclusive makeup collection designed to enhance your natural beauty with elegance and perfection.";
    const canonicalUrl = `https://www.ssyourmakeup.id/catalog`;

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

export default Catalog;
