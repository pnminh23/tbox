import style from './BoxItem.module.scss';
import Image from 'next/image';

const BoxItem = ({ box }) => {
    return (
        <div className={style.item}>
            <div className={style.image}>
                <Image src={box} alt={'image'} fill objectFit="cover" />
            </div>
            <div className={style.content}>
                <h5>box j</h5>
            </div>
            <div className={style.icon}>
                <Image src="/favicon.ico" alt="Favicon" width={32} height={32} layout="responsive" />
            </div>
        </div>
    );
};
export default BoxItem;
