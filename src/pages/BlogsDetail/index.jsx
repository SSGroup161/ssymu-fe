import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { Toaster, toast } from "sonner";

let url = import.meta.env.VITE_REACT_APP_API_KEY;
let feUrl = import.meta.env.VITE_REACT_APP_FE_SITE;

const BlogsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split("-");
        const date = new Date(`${year}-${month}-${day}`);

        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const getArticleById = async (idArticle) => {
        try {
            const response = await axios.get(
                `${url}/api/v1/article/${idArticle}`
            );

            if (!response.data.status === 404) {
                throw new Error("Artikel tidak ditemukan");
                // console.error("status", response.data.status);
            }
            return response.data.data;
        } catch (error) {
            // console.error("Error fetching article:", error);
            throw error;
        }
    };

    const { data, isLoading, isFetching, isError, error } = useQuery({
        queryKey: ["ArticleDetails", id],
        queryFn: () => getArticleById(id),
        enabled: !!id,
    });

    useEffect(() => {
        if (isError) {
            navigate("*");
        }
    }, [isError, navigate, error, data]);

    let dateNew = "";
    let enhancedHTML = "";
    const articleUrl = `${feUrl}/blogs/${data?.id_title}`;
    const encodedUrl = encodeURIComponent(articleUrl);
    const encodedTitle = encodeURIComponent(data?.title + " - SSYMU");

    if (data && data.date && data.description) {
        dateNew = formatDate(data.date);
        const cleanHTML = DOMPurify.sanitize(data.description);
        const removeFirstParagraphTag = (html) => {
            return html.replace(/^<p>(.*?)<\/p>/, "$1");
        };

        const cleanHTMLWithoutFirstP = removeFirstParagraphTag(cleanHTML);

        enhancedHTML = `<strong>${
            data?.place || ""
        }</strong> - ${cleanHTMLWithoutFirstP.trim()}`;
    }

    const title = data?.title || "Loading...";
    const description =
        data?.description ||
        "Baca artikel menarik seputar kecantikan dan makeup di SS Your Makeup.";
    const image = data?.link_img || "";
    const canonicalUrl = `https://www.ssyourmakeup.id/blogs/${id}`;

    useEffect(() => {
        document.title = `${title} | SS Your Makeup`;

        const updateMetaTag = (name, content) => {
            let tag = document.querySelector(`meta[name="${name}"]`);
            if (!tag) {
                tag = document.createElement("meta");
                tag.setAttribute("name", name);
                document.head.appendChild(tag);
            }
            tag.setAttribute("content", content);
        };

        const updateMetaProperty = (property, content) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement("meta");
                tag.setAttribute("property", property);
                document.head.appendChild(tag);
            }
            tag.setAttribute("content", content);
        };

        updateMetaTag("description", description);

        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement("link");
            linkCanonical.setAttribute("rel", "canonical");
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute("href", canonicalUrl);

        updateMetaProperty("og:title", title);
        updateMetaProperty("og:description", description);
        updateMetaProperty("og:url", canonicalUrl);
        updateMetaProperty("og:image", image);
        updateMetaProperty("og:type", "article");

        updateMetaProperty("twitter:card", "summary_large_image");
        updateMetaProperty("twitter:title", title);
        updateMetaProperty("twitter:description", description);
        updateMetaProperty("twitter:image", image);

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            author: {
                "@type": "Person",
                name: data?.creator || "SS Your Makeup Team",
            },
            publisher: {
                "@type": "Organization",
                name: "SS Your Makeup",
                logo: {
                    "@type": "ImageObject",
                    url: "https://www.ssyourmakeup.id/logo.png",
                },
            },
            datePublished: data?.date || "",
            dateModified: data?.updated_at || "",
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": canonicalUrl,
            },
            image: image,
            description: description,
        };

        let scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        scriptTag.innerHTML = JSON.stringify(jsonLd);
        document.head.appendChild(scriptTag);

        return () => {
            scriptTag.remove();
        };
    }, [title, description, image, canonicalUrl, data]);

    const shareToFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        window.open(facebookUrl, "_blank");
    };

    const shareToWhatsApp = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareToTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        window.open(twitterUrl, "_blank");
    };

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(articleUrl)
            .then(() => {
                toast.success("Link artikel berhasil disalin!");
            })
            .catch((err) => {
                console.error("Gagal menyalin link:", err);
            });
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <Toaster richColors />
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
                    <article className="pt-20 md:pt-36 2xl:pt-44 px-10 md:px-12 bg-white">
                        <header
                            className="w-full max-w-screen-lg md:max-w-screen-xl overflow-hidden m-auto flex items-center justify-center md:pt-8 flex-col pt-20 pb-10 md:pb-8 md:py-20 gap-8"
                            data-aos="fade-up"
                            data-aos-duration="3000"
                        >
                            <h1 className="text-center text-2xl md:text-5xl font-montserrat font-semibold">
                                {data && data?.title}
                            </h1>
                            <div className="w-full flex items-start justify-start">
                                <div className="flex items-center justify-center gap-2 font-montserrat">
                                    <h2>{data && data?.creator}</h2>
                                    <div className="bg-black w-2 h-2 rounded-full"></div>
                                    <time dateTime={dateNew}>{dateNew}</time>
                                </div>
                            </div>
                            {data?.link_img && (
                                <img
                                    src={data?.link_img}
                                    alt={
                                        data?.title
                                            ? `${data?.title} - SS Your Makeup`
                                            : "SS Your Makeup - Artikel Blog"
                                    }
                                    loading="lazy"
                                    className="w-full rounded-xl"
                                    width="1200"
                                    height="630"
                                />
                            )}
                        </header>
                    </article>
                    <article className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 bg-white">
                        <div
                            className="max-w-screen-lg md:max-w-screen-xl m-auto flex flex-col items-center"
                            data-aos="fade-up"
                            data-aos-duration="3000"
                        >
                            <div className="w-full flex flex-col-reverse gap-10 lg:gap-0 lg:grid lg:grid-cols-3">
                                <div className="lg:col-span-1 flex justify-start font-montserrat lg:sticky lg:top-40 lg:h-40">
                                    <div className="">
                                        <h2 className="text-2xl font-semibold">
                                            Was this article helpful?
                                        </h2>
                                        <h2>Share it with the world!</h2>
                                        <div className="flex mt-4 gap-2">
                                            <button
                                                className="group cursor-pointer p-3 border-2 border-gray-200 rounded-full flex items-center justify-center"
                                                onClick={shareToTwitter}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    className="w-5 h-5 group-hover:scale-125 transition-all duration-300 ease-in-out"
                                                >
                                                    <path
                                                        d="M11.9871 8.39955L18.278 0L15.9819 0.0318937L10.8478 6.88316L5.6763 0L0 0.0265779L7.99626 10.6883L1.71141 19.0752H3.99149L9.13535 12.2072L14.2865 19.0752L17.9868 19.0683H17.9916L20 19.0645L11.9871 8.39955ZM14.8977 17.7411L14.6952 17.4674L14.594 17.3305L9.97532 11.0856L8.84426 9.55676L3.16767 1.88148H5.48497L10.0127 7.99759L11.1438 9.52535L17.2469 17.7411H14.8977Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className="group cursor-pointer p-3 border-2 border-gray-200 rounded-full flex items-center justify-center"
                                                onClick={shareToFacebook}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="13"
                                                    height="22"
                                                    viewBox="0 0 13 22"
                                                    fill="none"
                                                    className="w-5 h-5 group-hover:scale-125 transition-all duration-300 ease-in-out"
                                                >
                                                    <path
                                                        d="M12 1H9C7.67392 1 6.40215 1.52678 5.46447 2.46447C4.52678 3.40215 4 4.67392 4 6V9H1V13H4V21H8V13H11L12 9H8V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H12V1Z"
                                                        stroke="black"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className="group cursor-pointer p-3 border-2 border-gray-200 rounded-full flex items-center justify-center"
                                                onClick={shareToWhatsApp}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="w-5 h-5 group-hover:scale-125 transition-all duration-300 ease-in-out"
                                                >
                                                    <path
                                                        d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 13.379 2.28 14.693 2.784 15.888C3.063 16.548 3.202 16.878 3.22 17.128C3.237 17.378 3.163 17.652 3.016 18.201L2 22L5.799 20.984C6.348 20.837 6.622 20.764 6.872 20.78C7.122 20.798 7.452 20.937 8.112 21.216C9.34266 21.7343 10.6647 22.0009 12 22Z"
                                                        stroke="black"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M8.58817 12.377L9.45917 11.296C9.82617 10.84 10.2792 10.416 10.3162 9.808C10.3242 9.655 10.2162 8.967 10.0012 7.59C9.91617 7.049 9.41017 7 8.97317 7C8.40317 7 8.11817 7 7.83517 7.13C7.47717 7.293 7.11017 7.752 7.02917 8.137C6.96517 8.442 7.01317 8.652 7.10817 9.072C7.51017 10.855 8.45517 12.616 9.91917 14.081C11.3842 15.545 13.1452 16.49 14.9292 16.892C15.3492 16.987 15.5582 17.035 15.8632 16.971C16.2482 16.891 16.7072 16.523 16.8712 16.165C17.0002 15.882 17.0002 15.597 17.0002 15.027C17.0002 14.589 16.9512 14.084 16.4102 13.999C15.0332 13.783 14.3452 13.676 14.1922 13.684C13.5852 13.72 13.1602 14.174 12.7042 14.541L11.6232 15.411"
                                                        stroke="black"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className="group cursor-pointer p-3 border-2 border-gray-200 rounded-full flex items-center justify-center"
                                                onClick={copyToClipboard}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 17 17"
                                                    fill="none"
                                                    className="w-5 h-5 group-hover:scale-125 transition-all duration-300 ease-in-out"
                                                >
                                                    <path
                                                        d="M10.2127 6.78723C9.89792 6.47232 9.52416 6.22251 9.11279 6.05208C8.70142 5.88164 8.2605 5.79392 7.81522 5.79392C7.36995 5.79392 6.92903 5.88164 6.51766 6.05208C6.10629 6.22251 5.73253 6.47232 5.41772 6.78723L1.99272 10.2132C1.357 10.8491 0.999906 11.7114 1 12.6106C1.00009 13.5097 1.35737 14.372 1.99322 15.0077C2.62908 15.6435 3.49143 16.0006 4.39058 16.0005C5.28972 16.0004 6.152 15.6431 6.78772 15.0072L7.10872 14.7032M6.78772 10.2132C7.10253 10.5281 7.47629 10.778 7.88766 10.9484C8.29903 11.1188 8.73995 11.2066 9.18522 11.2066C9.6305 11.2066 10.0714 11.1188 10.4828 10.9484C10.8942 10.778 11.2679 10.5281 11.5827 10.2132L15.0067 6.78723C15.6426 6.15151 15.9999 5.28923 15.9999 4.39009C16 3.49095 15.6429 2.62859 15.0072 1.99273C14.3715 1.35688 13.5092 0.999606 12.6101 0.999512C11.7109 0.999418 10.8486 1.35651 10.2127 1.99224L9.18472 2.95324"
                                                        stroke="black"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="lg:col-span-2 space-y-6"
                                    dangerouslySetInnerHTML={{
                                        __html: enhancedHTML,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </article>
                </div>
            )}
            <Footer />
        </>
    );
};

export default BlogsDetail;
