import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full md:h-[40rem] bg-[#121111] p-12 md:p-14">
                <div className="w-full max-w-screen-xl m-auto h-full flex gap-16 md:gap-10 lg:gap-28 flex-col md:flex-row">
                    <div className="flex-1 flex items-center justify-between flex-col gap-16 md:gap-0">
                        <div className="w-full flex flex-col gap-4">
                            <img
                                src="/LogoSSYMU_Landscape.png"
                                alt="SS Your Make Up"
                                loading="lazy"
                                className="w-44 md:w-56"
                            />
                            <p className="font-montserrat text-white text-xs md:text-sm">
                                The first free end-to-end analytics service for
                                the site, designed to work with enterprises of
                                various levels and business segments.
                            </p>
                            <div className="justify-start items-center gap-3 inline-flex">
                                <h1
                                    className="text-neutral-50 text-xs md:text-sm font-medium font-montserrat cursor-pointer"
                                    onClick={() => {
                                        navigate("/about");
                                    }}
                                >
                                    More about us
                                </h1>
                                <div className="w-2.5 h-2.5 bg-white rounded-[10px]" />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center justify-center gap-3 md:gap-4">
                                <div className="p-2 bg-white rounded-full">
                                    <a
                                        href="https://www.tiktok.com/@ssyourmakeup"
                                        target="blank"
                                    >
                                        <img
                                            src="/tiktok.png"
                                            alt="TikTok Logo"
                                            loading="lazy"
                                            className="w-4 lg:w-8"
                                        />
                                    </a>
                                </div>
                                <div className="p-2 bg-white rounded-full">
                                    <a
                                        href="https://wa.me/6285121106283"
                                        target="blank"
                                    >
                                        <img
                                            src="/waSolid.png"
                                            alt="Whatsapp Logo"
                                            loading="lazy"
                                            className="w-4 lg:w-8"
                                        />
                                    </a>
                                </div>
                                <div className="p-2 bg-white rounded-full">
                                    <a
                                        href="https://www.instagram.com/ssyourmakeup/"
                                        target="blank"
                                    >
                                        <img
                                            src="/ig.png"
                                            alt="Instagram Logo"
                                            loading="lazy"
                                            className="w-4 lg:w-8"
                                        />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <p className="font-montserrat text-white text-xs md:text-sm">
                                    © 2025 — Copyright <br />a All Rights
                                    reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-between flex-col">
                        <div className="w-full">
                            <ul className="flex items-center justify-start gap-4 lg:gap-8 font-montserrat font-light text-white text-xs md:text-base">
                                <li
                                    className="cursor-pointer"
                                    onClick={() => {
                                        navigate("/");
                                    }}
                                >
                                    Main.
                                </li>
                                <li
                                    className="cursor-pointer"
                                    onClick={() => {
                                        navigate("/about");
                                    }}
                                >
                                    About Us.
                                </li>
                                <li
                                    className="cursor-pointer"
                                    onClick={() => {
                                        navigate("/catalog");
                                    }}
                                >
                                    Our Catalog.
                                </li>
                                <li
                                    className="cursor-pointer"
                                    onClick={() => {
                                        navigate("/blogs");
                                    }}
                                >
                                    Blogs.
                                </li>
                            </ul>
                        </div>
                        <div className="flex w-full flex-col mt-8 ">
                            <div className="mb-12 md:mb-16">
                                <h1 className="font-montserrat mb-2 text-white text-sm md:text-base">
                                    Contact Us.
                                </h1>
                                <a
                                    href="https://wa.me/6285121106283"
                                    target="blank"
                                    className="text-[#BCBCBC] text-xs md:text-sm"
                                >
                                    ‪+62 851‑2110‑6283‬
                                </a>{" "}
                                <br />
                                <a
                                    href="mailto:info@ssyourmakeup.id"
                                    target="blank"
                                    className="text-[#BCBCBC] text-xs md:text-sm"
                                >
                                    info@ssyourmakeup.id
                                </a>
                            </div>
                            <div className="">
                                <h1 className="font-montserrat mb-2 text-white text-sm md:text-base">
                                    Location.
                                </h1>
                                <h1 className="text-[#BCBCBC] text-xs md:text-sm">
                                    Part of SS Group - PT Abil Mannaf Perkasa,
                                    Jl. K.H. Wahid Hasyim No.161, RT.1/RW.5, Kb.
                                    Kacang, Kecamatan Tanah Abang, Kota Jakarta
                                    Pusat, Daerah Khusus Ibukota Jakarta 10240
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
