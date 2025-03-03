import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import CardProduct from "../../components/CardProduct";
import CardArticle from "../../components/CardArticle";
import FlipWords from "../../components/FlipWords";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

let url = import.meta.env.VITE_REACT_APP_API_KEY;

const Home = () => {
    const navigate = useNavigate();
    const words = [
        "Perfectly",
        "Flawlessly",
        "Beautifully",
        "Gracefully",
        "Naturally",
    ];

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

    const getAllProduct = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/product/`);
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

    const {
        data: dataProduct,
        isLoading: loadingProduct,
        isFetching: fetchingProduct,
    } = useQuery({
        queryKey: ["AllProduct"],
        queryFn: () => getAllProduct(),
        enabled: !!url,
    });

    const title = "SS Your Makeup©";
    const description =
        "SS Your Makeup is the official website of a luxurious beauty brand that embodies glamour and elegance. Discover our premium makeup collections for a flawless, radiant look.";
    const canonicalUrl = `https://www.ssyourmakeup.id/`;

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

    const dataTopArticle = data?.data ? data.data.slice(0, 3) : [];
    const dataTopProduct = dataProduct?.dataProduct
        ? dataProduct.dataProduct.slice(0, 6)
        : [];

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="pt-36 2xl:pt-56 px-10 md:px-12 h-screen bg-white">
                <div className="w-full max-w-screen-lg xl:max-w-screen-xl  m-auto marker:flex items-start justify-center md:pt-8 flex-col-reverse md:flex-row">
                    <div className="md:flex-1 w-full flex items-start justify-start md:justify-center ">
                        <div className="flex flex-col gap-4 mt-10 md:mt-28 items-center">
                            <h1
                                className="text-2xl md:text-6xl font-montserrat font-semibold text-center hidden md:block"
                                style={{ lineHeight: "1.2" }}
                                data-aos="fade-up"
                                data-aos-duration="3000"
                            >
                                Embrace Your Beauty Makeup <br /> for Every Skin
                                <FlipWords words={words} />
                            </h1>
                            <h1
                                className="text-3xl font-montserrat font-semibold text-center md:hidden"
                                style={{ lineHeight: "1.2" }}
                                data-aos="fade-up"
                                data-aos-duration="3000"
                            >
                                Embrace Your Beauty Makeup for Every Skin <br />
                                <FlipWords words={words} />
                            </h1>

                            <h2
                                className="font-montserrat text-sm text-center max-w-[50rem] mt-4"
                                data-aos="fade-up"
                                data-aos-duration="3000"
                            >
                                {" "}
                                Explore our vibrant collection, thoughtfully
                                crafted to highlight your unique beauty, from
                                bold, eye-catching statements to everyday
                                elegance, adding a special touch to every moment
                                of your life.
                            </h2>
                            <button
                                className="button-home"
                                data-aos="fade-up"
                                data-aos-duration="3000"
                                onClick={() => navigate(`/catalog`)}
                            >
                                <span>See more</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 mt-40 lg:mt-0 bg-white">
                <div
                    className="max-w-screen-lg xl:max-w-screen-xl m-auto relative"
                    data-aos="fade-up"
                    data-aos-duration="3000"
                >
                    <div className="w-full h-full flex items-end justify-center relative overflow-hidden">
                        <div className="z-10 relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="99"
                                height="65"
                                viewBox="0 0 117 76"
                                fill="none"
                                className="absolute z-20 right-6 top-44 hidden md:block md:-rotate-45 md:top-24 lg:top-44 lg:-rotate-0"
                            >
                                <path
                                    d="M2.06709 74.2642C20.0539 61.3424 38.385 44.6884 42.571 21.9905C43.2237 18.451 43.4935 9.77437 38.0488 9.56972C33.2705 9.39013 26.4571 14.7343 25.3992 19.1447C22.6456 30.6239 22.7784 46.0623 38.7569 45.4655C56.1516 44.8158 76.0075 33.9143 90.3477 24.5939C97.3033 20.0731 105.321 14.0898 110.709 7.77188C114.286 3.57781 110.214 5.94684 106.882 7.06947C102.144 8.66614 91.2033 12.353 101.693 8.8181C105.955 7.38175 110.392 5.15005 113.853 2.78371C117.553 0.253767 112.956 7.08628 112.64 8.17278C111.641 11.5981 110.955 16.8241 112.109 20.2489"
                                    stroke="#C9A575"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="41"
                                height="72"
                                viewBox="0 0 41 72"
                                fill="none"
                                className="absolute z-20 right-6 top-4 md:hidden"
                            >
                                <path
                                    d="M10.6696 69.9627C13.8613 58.4935 15.9415 45.3439 10.0585 34.4206C9.14111 32.7172 6.33455 28.9893 3.98329 30.7356C1.91987 32.2682 0.862024 36.8011 1.90264 39.0059C4.61107 44.7444 9.86173 51.1714 16.3589 45.5445C23.432 39.4189 28.0872 28.1677 30.9622 19.4352C32.3567 15.1996 33.7042 9.99362 33.837 5.53198C33.9251 2.5702 33.0151 4.93373 31.9963 6.52533C30.5474 8.78899 27.2018 14.016 30.4096 9.00443C31.713 6.96806 32.8217 4.53969 33.4763 2.38316C34.176 0.0775403 34.5482 4.48845 34.781 5.05049C35.5151 6.82237 36.9859 9.24397 38.6221 10.2913"
                                    stroke="#C9A575"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <img
                                src="/assetHome5.png"
                                alt="SS Your Make Up"
                                loading="lazy"
                                className="w-[40rem]"
                            />
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="660"
                            height="513"
                            viewBox="0 0 971 756"
                            fill="none"
                            className="absolute -bottom-16 ms-2 hidden md:block"
                        >
                            <path
                                d="M971 485.5C971 753.634 788.134 756 520 756C251.866 756 0 753.634 0 485.5C0 217.366 217.366 0 485.5 0C753.634 0 971 217.366 971 485.5Z"
                                fill="#C9A575"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="280"
                            height="218"
                            viewBox="0 0 300 234"
                            fill="none"
                            className="absolute -bottom-16 md:hidden"
                        >
                            <path
                                d="M300 150C300 232.843 243.502 233.574 160.659 233.574C77.8164 233.574 0 232.843 0 150C0 67.1573 67.1573 0 150 0C232.843 0 300 67.1573 300 150Z"
                                fill="#C9A575"
                            />
                        </svg>
                    </div>
                    <div className="absolute bg-white -top-32 lg:top-4 -right-6 md:right-6 shadow-md w-64 md:w-80 p-4 flex rounded-xl items-center justify-between">
                        <img
                            src="/Luxe-Aura-Baked-Blush-Aura-Peach-SSYMU.png"
                            alt="SS Your Make Up - Luxe Aura Baked Blush Aura Peach"
                            loading="lazy"
                            className="w-28 h-28"
                        />
                        <div className="flex flex-col items-center justify-center font-montserrat gap-2">
                            <h2 className="font-semibold text-xs md:text-sm text-center">
                                Luxe Aura Baked Blush <br /> - Aura Peach
                            </h2>
                            <p className="text-center text-[10px] md:text-xs">
                                A radiant baked blush that delivers a natural,
                                luminous glow to your cheeks.
                            </p>
                            <h2
                                className="mt-2 cursor-pointer underline text-xs md:text-sm"
                                onClick={() =>
                                    navigate(
                                        `/catalog/product/luxe-aura-baked-blush`
                                    )
                                }
                            >
                                See product
                            </h2>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center md:justify-evenly mt-10 flex-wrap gap-10 md:gap-0">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="bg-primary p-4 rounded-full">
                                <img
                                    src="/assetHome6.png"
                                    alt="SS Your Make Up"
                                    loading="lazy"
                                    className="w-8 md:w-10"
                                />
                            </div>
                            <h2 className="font-montserrat text-sm md:text-base">
                                100% Natural
                            </h2>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="bg-primary p-4 rounded-full">
                                <img
                                    src="/assetHome7.png"
                                    alt="SS Your Make Up"
                                    loading="lazy"
                                    className="w-8 md:w-10"
                                />
                            </div>
                            <h2 className="font-montserrat text-sm md:text-base">
                                Local Expert
                            </h2>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="bg-primary p-4 rounded-full">
                                <img
                                    src="/assetHome8.png"
                                    alt="SS Your Make Up"
                                    loading="lazy"
                                    className="w-8 md:w-10"
                                />
                            </div>
                            <h2 className="font-montserrat text-sm md:text-base">
                                Alcohol Free
                            </h2>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="bg-primary p-4 rounded-full">
                                <img
                                    src="/assetHome9.png"
                                    alt="SS Your Make Up"
                                    loading="lazy"
                                    className="w-8 md:w-10"
                                />
                            </div>
                            <h2 className="font-montserrat text-sm md:text-base">
                                BPOM Certified
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-10 md:px-12 lg:px-16 xl::px-24 pb-20 bg-white">
                <div
                    className="max-w-screen-lg xl:max-w-screen-xl m-auto"
                    data-aos="fade-up"
                    data-aos-duration="3000"
                >
                    <div className="w-full flex items-center justify-between">
                        <div className="font-montserrat flex flex-col items-start justify-center gap-2">
                            <h2 className="text-xl md:text-4xl font-medium">
                                Look By Category
                            </h2>
                            <p className="text-sm md:text-base">
                                Find makeup products for every part of your
                                face.
                            </p>
                        </div>
                        <hr className="h-0.5 w-3/5 bg-black" />
                    </div>
                    <div className="grid grid-cols-6 md:grid-cols-7 mt-8 md:gap-4 gap-2">
                        <div className="col-span-6 md:col-span-4 row-span-4 mb-4 md:mb-8 relative flex items-end justify-end overflow-hidden rounded-xl group cursor-pointer">
                            <div className="w-full bg-gradient-to-b from-transparent to-[#222222] py-6 absolute z-30 flex flex-col font-montserrat px-4 md:px-8 xl:px-10 gap-2">
                                <h2 className="font-semibold text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl">
                                    Flawless Face Essentials
                                </h2>
                                <p className="text-white hidden lg:block">
                                    From dewy to matte, explore our face
                                    essentials to bring out your best look.
                                </p>
                                <button
                                    className="button-see-more-white font-montserrat lg:py-4"
                                    onClick={() => navigate(`/catalog/face`)}
                                >
                                    See more
                                </button>
                            </div>
                            <img
                                src="/assetHome2.png"
                                alt="SS Your Make Up-Model"
                                loading="lazy"
                                className="w-full h-full object-cover rounded-md group-hover:scale-110 transition-all ease-in-out duration-300"
                                onClick={() => navigate(`/catalog/face`)}
                            />
                        </div>

                        <div className="col-span-6 md:col-span-3 relative flex items-end justify-end overflow-hidden rounded-xl group cursor-pointer">
                            <div className="w-full bg-gradient-to-b from-transparent to-[#222222] py-6 absolute flex flex-col font-montserrat px-4 lg:px-8 gap-2 z-30">
                                <h2 className="font-semibold text-white md:text-xl lg:text-2xl xl:text-3xl">
                                    For Eyes That Stand Out
                                </h2>
                                <p className="text-white hidden lg:block">
                                    From natural to bold, find eyeshadows,
                                    liners, and mascaras for every look
                                </p>
                                <button
                                    className="button-see-more-white font-montserrat lg:py-4"
                                    onClick={() => navigate(`/catalog/eye`)}
                                >
                                    See more
                                </button>
                            </div>
                            <img
                                src="/assetHome3.png"
                                alt="SS Your Make Up-Detail"
                                loading="lazy"
                                className="w-full h-full object-cover rounded-md group-hover:scale-110 transition-all ease-in-out duration-300"
                                onClick={() => navigate(`/catalog/eye`)}
                            />
                        </div>

                        <div className="col-span-6 md:col-span-3 relative flex items-end justify-end rounded-xl group cursor-pointer overflow-hidden">
                            <div className="w-full bg-gradient-to-b from-transparent to-[#222222] py-6 absolute flex flex-col font-montserrat px-4 lg:px-8 gap-2 z-30">
                                <h2 className="font-semibold text-white md:text-xl lg:text-2xl xl:text-3xl">
                                    Lips That Speak Volumes
                                </h2>
                                <p className="text-white hidden lg:block">
                                    From long-lasting mattes to high-shine
                                    glosses – find your signature color
                                </p>
                                <button
                                    className="button-see-more-white font-montserrat lg:py-4"
                                    onClick={() => navigate(`/catalog/lips`)}
                                >
                                    See more
                                </button>
                            </div>
                            <img
                                src="/assetHome4.png"
                                alt="SS Your Make Up-Detail"
                                loading="lazy"
                                className="w-full h-full object-cover rounded-md group-hover:scale-110 transition-all ease-in-out duration-300"
                                onClick={() => navigate(`/catalog/lips`)}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 bg-white">
                <div
                    className="max-w-screen-lg xl:max-w-screen-xl m-auto flex flex-col items-center"
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
                        {dataTopProduct &&
                            dataTopProduct.map((product, index) => (
                                <CardProduct key={index} data={product} />
                            ))}
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button
                            className="button-see-more font-montserrat"
                            onClick={() => navigate(`/catalog`)}
                        >
                            See more
                        </button>
                    </div>
                </div>
            </section>
            <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 bg-[F5F5F5] bg-white">
                <div
                    className="max-w-screen-lg xl:max-w-screen-xl m-auto flex flex-col items-center"
                    data-aos="fade-up"
                    data-aos-duration="3000"
                >
                    <div className="w-full flex items-center justify-between">
                        <div className="font-montserrat flex flex-col items-start justify-center gap-2">
                            <h2 className="text-xl md:text-4xl font-medium">
                                Trusted by Experts
                            </h2>
                            <p className="text-sm md:text-base max-w-[30rem]">
                                Beauty experts love SS Your Makeup for its
                                premium quality, easy use, and flawless results.
                            </p>
                        </div>
                        <hr className="h-0.5 w-3/5 bg-black" />
                    </div>
                    <div className="w-full flex py-14 flex-col md:flex-row">
                        <div className="flex-1 flex items-end justify-center">
                            <video
                                src="/assetVideoHome.mp4"
                                className="w-80 rounded-xl shadow-md"
                                controls
                                loop
                                muted
                                autoPlay
                                playsInline
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="flex-1 flex items-center justify-center mt-12">
                            <div className="flex flex-col items-start justify-center xl:mx-20 gap-4">
                                <h2 className="font-montserrat text-xl md:text-3xl italic">
                                    “Di aku udah ada product terbaru dari ss,
                                    ini cushion aku tuh paling jarang banget
                                    bisa cocok pake cushion, tapi kemaren aku
                                    cobain pake cushion ini dan warna nya itu
                                    cocok banget sama kulit aku. Kemasan nya
                                    mewah cakep banget.”
                                </h2>
                                <a
                                    href="https://www.instagram.com/reel/DDqs9tSSDG-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                                    className="underline"
                                >
                                    Visit video
                                </a>
                                <div className="flex items-center justify-center gap-4 mt-8">
                                    <a
                                        href="https://www.instagram.com/ivan_gunawan/"
                                        target="blank"
                                    >
                                        <img
                                            src="/assetHome10.png"
                                            alt="SSYMU - Ivan Gunawan"
                                            loading="lazy"
                                            className="rounded-full w-16 cursor-pointer"
                                        />
                                    </a>
                                    <div className="font-montserrat">
                                        <div className="flex gap-2 items-center justify-center">
                                            <a
                                                href="https://www.instagram.com/ivan_gunawan/"
                                                target="blank"
                                            >
                                                <h2 className="font-medium text-lg">
                                                    Ivan Gunawan
                                                </h2>
                                            </a>
                                            <img
                                                src="/assetVerified.png"
                                                alt="SSYMU - Verified"
                                                loading="lazy"
                                                className="w-6 h-6"
                                            />
                                        </div>
                                        <h2>Perancang Busana</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full gap-8 flex-col md:flex-row">
                        <div className="w-full md:w-1/2 bg-white p-4 shadow-xl rounded-xl flex flex-col gap-4">
                            <p className="font-montserrat italic">
                                "Kalau saya selalu sebelumnya sudah follow
                                Foundernya, kakak Shella Sauki. Memang selalu
                                tengok dia punya konten. Pas dia punya cushion,
                                memang cantik, glowing and selalu tengok dia
                                punya Live dekat tiktok tapi saye orang malaysia
                                jadi saya tak boleh tekan keranjang kuning. "
                            </p>
                            <div className="flex items-center justify-start gap-4">
                                <a
                                    href="https://www.instagram.com/awinzulkifli/"
                                    target="blank"
                                >
                                    <img
                                        src="/assetEntre.jpeg"
                                        alt="SSYMU - Awin Zulkifli"
                                        loading="lazy"
                                        className="rounded-full w-12"
                                    />
                                </a>
                                <div className="font-montserrat text-sm">
                                    <a
                                        href="https://www.instagram.com/awinzulkifli/"
                                        target="blank"
                                    >
                                        <div className="flex gap-2">
                                            <h2 className="font-medium">
                                                Awin Zulkifli
                                            </h2>
                                        </div>
                                    </a>
                                    <h2>Entrepreneur</h2>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 bg-white p-4 shadow-xl rounded-xl flex flex-col gap-4">
                            <p className="font-montserrat italic">
                                "Warna cocok banget untuk dipakai buat daily
                                terus buat yang mau pergi buat ke kantor, itu
                                semuanya tuh kepakai banget Aku paling suka sama
                                lip liner yang warna Nutty Nude karena warnya
                                spesifik dan cocok banget di semua jenis kulit."
                            </p>
                            <div className="flex items-center justify-start gap-4">
                                <a
                                    href="https://www.instagram.com/nadydy_/"
                                    target="blank"
                                >
                                    <img
                                        src="/assetMUA.jpeg"
                                        alt="SSYMU - MUA"
                                        loading="lazy"
                                        className="rounded-full w-12 cursor-pointer"
                                    />
                                </a>
                                <div className="font-montserrat text-sm">
                                    <div className="flex gap-2">
                                        <a
                                            href="https://www.instagram.com/nadydy_/"
                                            target="blank"
                                        >
                                            <h2 className="font-medium cursor-pointer">
                                                Nadya Amanada
                                            </h2>
                                        </a>
                                    </div>
                                    <h2>MUA</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 bg-white">
                <div
                    className="max-w-screen-lg xl:max-w-screen-xl m-auto flex flex-col items-center"
                    data-aos="fade-up"
                    data-aos-duration="3000"
                >
                    <div className="w-full flex items-center justify-between">
                        <div className="font-montserrat flex flex-col items-start justify-center gap-2">
                            <h2 className="text-xl md:text-4xl font-medium">
                                Beauty & Makeup Tips from the Experts
                            </h2>
                            <p className="text-sm md:text-base">
                                Stay up to date with the latest beauty trends,
                                tutorials, and expert tips.
                            </p>
                        </div>
                        <hr className="h-0.5 w-3/5 bg-black" />
                    </div>
                    <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {dataTopArticle &&
                            dataTopArticle.map((article, index) => (
                                <CardArticle key={index} data={article} />
                            ))}
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button
                            className="button-see-more font-montserrat"
                            onClick={() => navigate(`/blogs`)}
                        >
                            See more
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;
