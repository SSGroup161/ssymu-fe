import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const About = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>About - SS Your Makeup©</title>
                <meta
                    name="description"
                    content="SS Your Makeup is a beauty brand that embodies glamour and luxury, celebrating natural beauty with premium makeup collections for an elegant and stunning look."
                />
                <meta
                    name="keywords"
                    content="SS Your Makeup, beauty brand, makeup, luxury makeup, natural beauty, elegant look, premium cosmetics"
                />
                <meta name="author" content="SS Your Makeup" />
                <link
                    rel="canonical"
                    href="https://www.ssyourmakeup.id/about"
                />

                {/* Open Graph / Facebook Meta Tags (For Link Previews in Facebook & WhatsApp) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About SS Your Makeup©" />
                <meta
                    property="og:description"
                    content="SS Your Makeup is a beauty brand that embodies glamour and luxury, celebrating natural beauty with premium makeup collections for an elegant and stunning look."
                />
                <meta
                    property="og:url"
                    content="https://www.ssyourmakeup.id/about"
                />
                <meta
                    property="og:image"
                    content="https://www.ssyourmakeup.id/SSYMU-About2.png"
                />
                <meta property="og:site_name" content="SS Your Makeup" />
                <meta property="og:locale" content="en_US" />

                {/* WhatsApp Specific Meta Tags */}
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/jpeg" />

                {/* Twitter Card Meta Tags (For Twitter Previews) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About - SS Your Makeup©" />
                <meta
                    name="twitter:description"
                    content="SS Your Makeup is a beauty brand that embodies glamour and luxury, celebrating natural beauty with premium makeup collections for an elegant and stunning look."
                />
                <meta
                    name="twitter:image"
                    content="https://www.ssyourmakeup.id/SSYMU-About2.png"
                />
                <meta name="twitter:site" content="@SSYourMakeup" />

                {/* Meta Tags for WhatsApp & Messenger (FB) */}
                <meta
                    property="og:updated_time"
                    content="2024-03-05T12:00:00+00:00"
                />
                <meta
                    property="og:image:alt"
                    content="SS Your Makeup - Luxury Beauty Brand"
                />
                <meta
                    property="og:image:secure_url"
                    content="https://www.ssyourmakeup.id/SSYMU-About2.png"
                />

                {/* Robots Meta Tags (For Search Engine Crawling) */}
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />

                {/* Schema.org Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "SS Your Makeup",
                        url: "https://www.ssyourmakeup.id",
                        logo: "https://www.ssyourmakeup.id/LogoSSYMU.png",
                        description:
                            "SS Your Makeup is a beauty brand that embodies glamour and luxury, celebrating natural beauty with premium makeup collections for an elegant and stunning look.",
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
            <section className="w-full h-screen flex items-center justify-center px-10 lg:px-36 relative">
                <div className="flex flex-col items-center justify-center m-auto pt-16 md:pt-32 w-full h-full">
                    <h1
                        className="text-xl md:text-5xl font-montserrat font-semibold text-center hidden md:block"
                        style={{ lineHeight: "1.2" }}
                        data-aos="fade-up"
                        data-aos-duration="3000"
                    >
                        <span className="text-primary">SS Your Makeup </span>
                        High quality essentials <br /> enhancing natural beauty
                        for everyone
                    </h1>
                    <h1
                        className="text-3xl md:text-5xl font-montserrat font-semibold text-center md:hidden"
                        style={{ lineHeight: "1.2" }}
                        data-aos="fade-up"
                        data-aos-duration="3000"
                    >
                        <span className="text-primary">SS Your Makeup </span>
                        High quality essentials enhancing natural beauty for
                        everyone
                    </h1>
                    <h2
                        className="font-montserrat text-center max-w-[50rem] mt-4 text-sm md:text-base"
                        data-aos="fade-up"
                        data-aos-duration="3000"
                    >
                        {" "}
                        SS Your Makeup enhances natural beauty with high-quality
                        products, <br />
                        offering a perfect blend of elegance and comfort.
                    </h2>
                </div>
                <div className="absolute w-full h-full -z-20 top-0">
                    <div className="bg-primary/40 w-full h-full absolute"></div>
                    <video
                        src="/SSYMU-Video.mp4"
                        alt="SS Your Make Up - About"
                        className="w-full h-full object-cover"
                        loop
                        muted
                        autoPlay
                        playsInline
                    />
                </div>
            </section>
            <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 mt-16 lg:mt-28 bg-white">
                <div className="max-w-screen-lg xl:max-w-screen-xl m-auto relative">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div
                            className="flex-1 relative flex items-end justify-end"
                            data-aos="fade-up"
                            data-aos-duration="3000"
                        >
                            <img
                                src="/SSYMU-About1.png"
                                alt="SSYMU - Image About"
                                loading="lazy"
                                className="absolute top-0 left-0 w-96"
                            />
                            <div className="z-10 pr-10 lg:pr-24">
                                <img
                                    src="/SSYMU-About2.png"
                                    alt="SSYMU - Image About"
                                    loading="lazy"
                                    className="mt-20 lg:mt-32 w-96 md:w-72 lg:w-96"
                                />
                            </div>
                        </div>
                        <div
                            className="flex-1"
                            data-aos="fade-up"
                            data-aos-duration="3000"
                        >
                            <div className="font-montserrat flex flex-col gap-6">
                                <h2>Our Story: Beauty Inspired by You</h2>
                                <h2 className="text-3xl md:text-4xl font-medium">
                                    Empowering confidence, one product at a
                                    time.
                                </h2>
                                <p className="text-[#030202] font-light">
                                    At SS Your Makeup, we believe that true
                                    beauty begins with confidence. Our
                                    high-quality makeup products are designed to
                                    empower individuals to express themselves
                                    and enhance their natural beauty. Whether
                                    you're looking to refresh your everyday look
                                    or create something bold for a special
                                    occasion, our collection offers something
                                    for everyone. <br />
                                    <br />
                                    Explore our full range of makeup products
                                    and find the perfect match for your unique
                                    style. Click the button below to browse our
                                    catalog and discover the beauty that awaits
                                    you.
                                </p>
                            </div>
                            <button
                                className="button-home mt-14"
                                onClick={() => navigate(`/catalog`)}
                            >
                                <span>See catalog</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 mt-16 lg:mt-28 bg-white">
                <div className="max-w-screen-lg xl:max-w-screen-xl m-auto relative">
                    <div className="w-full flex flex-col-reverse lg:flex-row gap-10 items-center justify-between">
                        <div
                            className="flex-1"
                            data-aos="fade-up"
                            data-aos-duration="3000"
                        >
                            <div className="font-montserrat flex flex-col gap-6">
                                <h2>Discover the art of natural beauty.</h2>
                                <h2 className="text-3xl md:text-4xl font-medium">
                                    Enhancing your beauty with high-quality
                                    essentials.
                                </h2>
                                <ul className="flex flex-col items-center gap-4">
                                    <li className="flex items-center text-[#030202] font-light gap-4">
                                        <div className="p-2 bg-primary rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8.9996 18.0001C8.86763 17.9993 8.73713 17.9723 8.61561 17.9209C8.4941 17.8694 8.38398 17.7943 8.2916 17.7001L4.2916 13.6371C4.19106 13.5455 4.11024 13.4344 4.05409 13.3106C3.99794 13.1868 3.96763 13.0528 3.96503 12.9168C3.96242 12.7809 3.98757 12.6458 4.03894 12.5199C4.0903 12.394 4.16681 12.2799 4.26377 12.1846C4.36074 12.0892 4.47612 12.0147 4.60288 11.9655C4.72964 11.9162 4.8651 11.8934 5.00099 11.8983C5.13688 11.9032 5.27034 11.9358 5.39321 11.9941C5.51608 12.0523 5.62578 12.135 5.7156 12.2371L9.0046 15.5801L18.2926 6.29308C18.3848 6.19757 18.4952 6.12139 18.6172 6.06898C18.7392 6.01657 18.8704 5.98898 19.0032 5.98783C19.136 5.98668 19.2677 6.01198 19.3906 6.06226C19.5134 6.11254 19.6251 6.18679 19.719 6.28069C19.8129 6.37458 19.8871 6.48623 19.9374 6.60913C19.9877 6.73202 20.013 6.8637 20.0119 6.99648C20.0107 7.12926 19.9831 7.26048 19.9307 7.38249C19.8783 7.50449 19.8021 7.61483 19.7066 7.70708L9.7066 17.7071C9.51911 17.8946 9.26479 18 8.9996 18.0001Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        Explore premium makeup collections
                                        designed to suit every look and need
                                        ensuring your appearance is always
                                        perfect and unique.
                                    </li>
                                    <li className="flex items-center text-[#030202] font-light gap-4">
                                        <div className="p-2 bg-primary rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8.9996 18.0001C8.86763 17.9993 8.73713 17.9723 8.61561 17.9209C8.4941 17.8694 8.38398 17.7943 8.2916 17.7001L4.2916 13.6371C4.19106 13.5455 4.11024 13.4344 4.05409 13.3106C3.99794 13.1868 3.96763 13.0528 3.96503 12.9168C3.96242 12.7809 3.98757 12.6458 4.03894 12.5199C4.0903 12.394 4.16681 12.2799 4.26377 12.1846C4.36074 12.0892 4.47612 12.0147 4.60288 11.9655C4.72964 11.9162 4.8651 11.8934 5.00099 11.8983C5.13688 11.9032 5.27034 11.9358 5.39321 11.9941C5.51608 12.0523 5.62578 12.135 5.7156 12.2371L9.0046 15.5801L18.2926 6.29308C18.3848 6.19757 18.4952 6.12139 18.6172 6.06898C18.7392 6.01657 18.8704 5.98898 19.0032 5.98783C19.136 5.98668 19.2677 6.01198 19.3906 6.06226C19.5134 6.11254 19.6251 6.18679 19.719 6.28069C19.8129 6.37458 19.8871 6.48623 19.9374 6.60913C19.9877 6.73202 20.013 6.8637 20.0119 6.99648C20.0107 7.12926 19.9831 7.26048 19.9307 7.38249C19.8783 7.50449 19.8021 7.61483 19.7066 7.70708L9.7066 17.7071C9.51911 17.8946 9.26479 18 8.9996 18.0001Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        Achieve a naturally beautiful look with
                                        ease through products crafted to
                                        highlight your true beauty seamlessly.
                                    </li>
                                    <li className="flex items-center text-[#030202] font-light gap-4">
                                        <div className="p-2 bg-primary rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8.9996 18.0001C8.86763 17.9993 8.73713 17.9723 8.61561 17.9209C8.4941 17.8694 8.38398 17.7943 8.2916 17.7001L4.2916 13.6371C4.19106 13.5455 4.11024 13.4344 4.05409 13.3106C3.99794 13.1868 3.96763 13.0528 3.96503 12.9168C3.96242 12.7809 3.98757 12.6458 4.03894 12.5199C4.0903 12.394 4.16681 12.2799 4.26377 12.1846C4.36074 12.0892 4.47612 12.0147 4.60288 11.9655C4.72964 11.9162 4.8651 11.8934 5.00099 11.8983C5.13688 11.9032 5.27034 11.9358 5.39321 11.9941C5.51608 12.0523 5.62578 12.135 5.7156 12.2371L9.0046 15.5801L18.2926 6.29308C18.3848 6.19757 18.4952 6.12139 18.6172 6.06898C18.7392 6.01657 18.8704 5.98898 19.0032 5.98783C19.136 5.98668 19.2677 6.01198 19.3906 6.06226C19.5134 6.11254 19.6251 6.18679 19.719 6.28069C19.8129 6.37458 19.8871 6.48623 19.9374 6.60913C19.9877 6.73202 20.013 6.8637 20.0119 6.99648C20.0107 7.12926 19.9831 7.26048 19.9307 7.38249C19.8783 7.50449 19.8021 7.61483 19.7066 7.70708L9.7066 17.7071C9.51911 17.8946 9.26479 18 8.9996 18.0001Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        Experience reliable product quality that
                                        delivers long lasting results helping
                                        you feel confident in every moment.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="flex-1 relative flex items-end justify-end"
                            data-aos="fade-up"
                            data-aos-duration="3000"
                        >
                            <img
                                src="/SSYMU-Aura-Baked-Blush-About.png"
                                alt="SSYMU - Image About"
                                loading="lazy"
                                className="w-96"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-10 md:px-12 lg:px-16 xl:px-24 pb-20 mt-16 md:mt-28 bg-white">
                <div
                    className="max-w-screen-lg xl:max-w-screen-xl m-auto relative"
                    data-aos="fade-up"
                    data-aos-duration="3000"
                >
                    <div className="font-montserrat flex flex-col gap-4">
                        <h2 className="text-4xl font-medium">
                            Your Beauty Destination
                        </h2>
                        <h2>
                            Visit us and unlock the secrets to radiant beauty
                            with our premium makeup collection
                        </h2>
                    </div>

                    <div className="mt-8">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1983.0743346611055!2d106.78301300000001!3d-6.24413!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1175b92614f%3A0x6173704d396d5a99!2sGandaria%20City!5e0!3m2!1sid!2sid!4v1738920263256!5m2!1sid!2sid"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-96 rounded-xl"
                        ></iframe>
                    </div>
                    <div className="mt-8 font-montserrat">
                        <h2 className="font-medium text-xl">Our Location:</h2>
                        <h2 className="">
                            2nd Floor Jl. Sultan Iskandar Muda, Gandaria, Kby.
                            Lama District, South Jakarta City, Special Capital
                            Region of Jakarta 12240
                        </h2>
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row gap-4">
                        <a href="mailto:info@ssyourmakeup.id" target="blank">
                            <button className="bg-primary font-montserrat text-white p-4 rounded-lg">
                                info@ssyourmakeup.id
                            </button>
                        </a>
                        <a href="https://wa.me/6285121106283" target="blank">
                            <button className="bg-primary font-montserrat text-white p-4 rounded-lg">
                                ‪+62 851‑2110‑6283‬
                            </button>
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default About;
