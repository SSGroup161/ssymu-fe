import React from "react";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ data }) => {
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate(`/catalog/product/${data?.id_title}`);
        window.scrollTo(0, 0);
    };

    const truncateText = (text, maxLength = 70) => {
        if (!text) return "";
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    console.log(data);

    return (
        <>
            <div className="w-full max-w-96 flex flex-col items-center justify-start p-2 md:p-6 py-4">
                {/* <img
                    src={data?.poster}
                    alt={data?.title}
                    loading="lazy"
                    className="w-40 h-40 object-cover"
                /> */}
                <model-viewer
                    src={data?.asset_varian1}
                    alt={data?.title}
                    auto-rotate
                    rotation-per-second="30deg"
                    shadow-intensity="1"
                    interaction-prompt="none"
                ></model-viewer>

                <div className="w-full flex flex-col items-center justify-center font-montserrat gap-2 md:gap-4">
                    <h1 className="font-semibold text-sm md:text-base text-center">
                        {data?.name_product}
                    </h1>
                    <p className="text-center text-xs md:text-sm">
                        {truncateText(data?.description)}
                    </p>
                    <h2
                        className="mt-4 cursor-pointer underline"
                        onClick={handleReadMore}
                    >
                        See product
                    </h2>
                </div>
            </div>
        </>
    );
};

export default CardProduct;
