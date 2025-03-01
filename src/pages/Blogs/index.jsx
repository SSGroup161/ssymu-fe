import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { WobbleCard } from "../../components/WoobleCards";
import CardArticle from "../../components/CardArticle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

let url = import.meta.env.VITE_REACT_APP_API_KEY;

const Blogs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getAllArticle = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/article/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const { data, isLoading, isFetching, isError, error } = useQuery({
        queryKey: ["AllArticle"],
        queryFn: () => getAllArticle(),
        enabled: !!url,
    });

    const title = "News and Tips SS Your Makeup©";
    const description =
        "SS Your Makeup is your go-to source for beauty tips, makeup trends, and expert insights. Explore our blog for the latest updates on glamour, luxury, and flawless beauty looks.";
    const canonicalUrl = `https://www.ssyourmakeup.id/blogs`;

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

        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement("link");
            linkCanonical.setAttribute("rel", "canonical");
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute("href", canonicalUrl);

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

    const dataTopArticle = data?.data ? data.data.slice(0, 3) : [];
    const dataSisa = data?.data ? data.data.slice(3) : [];

    return (
        <>
            <Navbar />
            <Sidebar />
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
                    <section className="pt-20 md:pt-36 2xl:pt-44 px-10 md:px-12 bg-white">
                        <div className="w-full max-w-screen-2xl m-auto marker:flex items-start justify-center md:pt-8 flex-col-reverse md:flex-row py-20">
                            <div
                                className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full"
                                data-aos="fade-up"
                                data-aos-duration="3000"
                            >
                                <WobbleCard
                                    containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px] cursor-pointer"
                                    backgroundImage={
                                        dataTopArticle[0]?.link_img
                                    }
                                    link={dataTopArticle[0]?.id_title}
                                >
                                    <div className="max-w-lg p-4 rounded-lg">
                                        <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                            {dataTopArticle[0]?.title ||
                                                "No title available"}
                                        </h2>
                                        <p className="mt-4 text-left text-base/6 text-neutral-200">
                                            {dataTopArticle[0]?.pre_desc
                                                ? dataTopArticle[0].pre_desc +
                                                  "..."
                                                : ""}
                                        </p>
                                    </div>
                                </WobbleCard>

                                {dataTopArticle.length > 1 && (
                                    <WobbleCard
                                        containerClassName="col-span-1 min-h-[300px] bg-indigo-800 cursor-pointer"
                                        backgroundImage={
                                            dataTopArticle[1]?.link_img
                                        }
                                        link={dataTopArticle[1]?.id_title}
                                    >
                                        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                            {dataTopArticle[1]?.title
                                                ? dataTopArticle[1].title
                                                      .length > 50
                                                    ? `${dataTopArticle[1].title.slice(
                                                          0,
                                                          50
                                                      )}...`
                                                    : dataTopArticle[1].title
                                                : "No title available"}
                                        </h2>
                                        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                                            {dataTopArticle[1]?.pre_desc
                                                ? dataTopArticle[1].pre_desc +
                                                  "..."
                                                : ""}
                                        </p>
                                    </WobbleCard>
                                )}

                                {dataTopArticle.length > 2 && (
                                    <WobbleCard
                                        containerClassName="col-span-1 lg:col-span-3 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] cursor-pointer"
                                        backgroundImage={
                                            dataTopArticle[2]?.link_img
                                        }
                                        link={dataTopArticle[2]?.id_title}
                                    >
                                        <div className="max-w-xl p-4 rounded-lg">
                                            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                                {dataTopArticle[2]?.title ||
                                                    "No title available"}
                                            </h2>
                                            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                                                {dataTopArticle[2]?.pre_desc
                                                    ? dataTopArticle[2]
                                                          .pre_desc + "..."
                                                    : ""}
                                            </p>
                                        </div>
                                    </WobbleCard>
                                )}
                            </div>
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
                                        Beauty & Makeup Tips from the Experts
                                    </h1>
                                    <p className="text-sm md:text-base">
                                        Stay up to date with the latest beauty
                                        trends, tutorials, and expert tips.
                                    </p>
                                </div>
                                <hr className="h-0.5 w-3/5 bg-black" />
                            </div>
                            <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {dataSisa &&
                                    dataSisa.map((article, index) => (
                                        <CardArticle
                                            key={index}
                                            data={article}
                                        />
                                    ))}
                            </div>
                            <div className="w-full hidden items-center justify-center">
                                <button className="button-see-more font-montserrat">
                                    See more
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
            <Footer />
        </>
    );
};

export default Blogs;
