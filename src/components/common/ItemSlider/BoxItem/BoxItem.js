import style from "./BoxItem.module.scss";
import Image from "next/image";

const BoxItem = ({ box }) => {
    return (
        <div className={style.item}>
            <div className={style.image}>
                <Image
                    src={`https://phimimg.com//${box.poster_url}`}
                    alt={box.origin_name}
                    fill
                    objectFit="cover"
                />
            </div>
        </div>
    );
};
export default BoxItem;
