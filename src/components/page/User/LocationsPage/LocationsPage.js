import Banner from '@/components/common/Banner';
import style from './LocationsPage.module.scss';
import Slider from '@/components/common/Slider';
import BoxItem from '@/components/common/ItemSlider/BoxItem';

const LocationsPage = () => {
    return (
        <>
            <Banner />
            <Slider
                apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                title="Box 175 Tây Sơn"
                slidesPerView={3}
                renderItem={(box) => <BoxItem box={box} />}
                autoplay={true}
                slidesPerGroup={3}
            />
            <Slider
                apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                title="Box 139 Nguyễn Ngọc Vũ"
                slidesPerView={3}
                renderItem={(box) => <BoxItem box={box} />}
                autoplay={true}
                slidesPerGroup={3}
            />
            <Slider
                apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                title="Box 7 Thiền Quang"
                slidesPerView={3}
                renderItem={(box) => <BoxItem box={box} />}
                autoplay={true}
                slidesPerGroup={3}
            />
            <Slider
                apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                title="Box 19C Hoàng Diệu"
                slidesPerView={3}
                renderItem={(box) => <BoxItem box={box} />}
                autoplay={true}
                slidesPerGroup={3}
            />
        </>
    );
};
export default LocationsPage;
