import React from "react";
import { useNavigate } from "react-router-dom";

const CardArticle = ({ data }) => {
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate(`/blogs/${data?.id_title}`);
    };

    return (
        <>
            <div className="w-full max-w-96 flex flex-col items-center justify-start p-4 border-2 border-gray-300 rounded-xl gap-4">
                <img
                    src={data?.link_img}
                    alt={data?.title}
                    loading="lazy"
                    className="rounded-lg"
                    onClick={handleReadMore}
                />
                <h1 className="font-montserrat font-semibold">{data?.title}</h1>
                <p className="font-montserrat">{data?.pre_desc}</p>
                <h2
                    className="mt-4 cursor-pointer underline font-montserrat"
                    onClick={handleReadMore}
                >
                    Read more
                </h2>
            </div>
        </>
    );
};

export default CardArticle;
