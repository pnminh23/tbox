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
            <div className={style.content}>
                <h5>box j</h5>
            </div>
            <div className={style.icon}>
                <Image
                    src="/favicon.ico"
                    alt="Favicon"
                    width={32}
                    height={32}
                />
            </div>
        </div>
    );
};
export default BoxItem;
