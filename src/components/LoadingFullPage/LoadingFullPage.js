import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import style from "./LoadingFullPage.module.scss";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const FullPageLoading = () => {
    const [animationData, setAnimationData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimation = async () => {
            try {
                const res = await fetch("/animations/loadingFullpage.json");
                const data = await res.json();
                setAnimationData(data);
            } catch (error) {
                console.error("Error loading animation:", error);
            }
        };

        fetchAnimation();

        // Giả lập thời gian tải (có thể bỏ nếu không cần)
        setTimeout(() => setLoading(false), 2000);
    }, []);

    if (!loading) return null;

    return (
        <div className={style.fullPageLoading}>
            {animationData ? (
                <Lottie
                    animationData={animationData}
                    className={style.lottieAnimation}
                    loop={true}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FullPageLoading;
