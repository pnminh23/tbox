import Banner from '@/components/common/Banner';
import style from './ComboPage.module.scss';
import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import { PATH } from '@/constants/config';
import Image from 'next/image';
import decorImg1 from '@public/static/img/decor/1.webp';
import decorImg2 from '@public/static/img/decor/2.webp';
import decorImg3 from '@public/static/img/decor/3.webp';
import decorImg4 from '@public/static/img/decor/4.webp';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useRef } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Slider from '@/components/common/Slider';
import BoxItem from '@/components/common/ItemSlider/BoxItem';
import Feedback from '@/components/common/Feedback';

const ComboPage = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <>
            <Banner />
            <div className="container">
                <Title>Combo đặt phòng</Title>
                <div className={style.listCombo}>
                    <div className={style.combo}>
                        <div className={style.title}>Combo 1</div>
                        <div className={style.utility}>
                            <p>2 tiếng sử dụng phòng</p>
                            <p>2 nước đóng chai</p>
                            <p>1 đĩa Khô gà</p>
                        </div>
                        <div className={style.price}>
                            <div className={style.item}>
                                <p className={style.nameCombo}>BoxJ</p>
                                <p>199K</p>
                            </div>
                            <div className={style.item}>
                                <p className={style.nameCombo}>BoxQ</p>
                                <p>259K</p>
                            </div>
                            <div className={style.item}>
                                <p className={style.nameCombo}>BoxJ</p>
                                <p>299K</p>
                            </div>
                        </div>
                        <Button yellowLinear rounded_10 href={PATH.BookRoom}>
                            Đặt phòng ngay
                        </Button>
                    </div>
                    <div className={style.combo}>
                        <div className={style.title}>Combo 2</div>
                        <div className={style.utility}>
                            <p>2 tiếng sử dụng phòng</p>
                            <p>2 nước trà tự chọn</p>
                            <p>1 mỳ ý số bò băm</p>
                            <p>1 gà viên(12 viên)</p>
                        </div>
                        <div className={style.price}>
                            <div className={style.item}>
                                <p className={style.nameCombo}>BoxJ</p>
                                <p>199K</p>
                            </div>
                            <div className={style.item}>
                                <p className={style.nameCombo}>BoxQ</p>
                                <p>259K</p>
                            </div>
                            <div className={style.item}>
                                <p className={style.nameCombo}>BoxJ</p>
                                <p>299K</p>
                            </div>
                        </div>
                        <Button yellowLinear rounded_10 href={PATH.BookRoom}>
                            Đặt phòng ngay
                        </Button>
                    </div>
                    <div className={style.combo}>
                        <div className={style.title}>Combo 3</div>
                        <div className={style.utility}>
                            <p>2 tiếng sử dụng phòng</p>
                            <p>2 nước tự chọn</p>
                            <p>1 Pizza bò băm</p>
                            <p>1 set đùi gà Couples</p>
                        </div>
                        <div className={style.price}>
                            <div className={style.item}>
                                <p className={style.nameCombo}>BoxJ</p>
                                <p>199K</p>
                            </div>
                            <div className={style.item}>
                                <p className={style.nameCombo}>BoxQ</p>
                                <p>259K</p>
                            </div>
                            <div className={style.item}>
                                <p className={style.nameCombo}>BoxJ</p>
                                <p>299K</p>
                            </div>
                        </div>
                        <Button yellowLinear rounded_10 href={PATH.BookRoom}>
                            Đặt phòng ngay
                        </Button>
                    </div>
                </div>
                <div className={style.comboDecorate}>
                    <h1 className={style.titleDecerate}>Combo trang trí</h1>
                    <p className={style.params}>
                        PNM - BOX mang đến combo khuyến mãi hấp dẫn trong không gian riêng tư và ấm cúng. Các phòng được
                        trang trí theo từng chủ đề và được thay đổi phù hợp với các dịp đặc biệt như Valentine, Noel hay
                        sinh nhật. Ánh đèn nhẹ nhàng, decor tinh tế tạo nên khung cảnh lý tưởng cho những buổi hẹn hò
                        hay kỷ niệm đáng nhớ. Đặt phòng để tận hưởng trọn vẹn cảm giác riêng tư và lãng mạn nhé!
                    </p>
                    <div className={style.slider}>
                        <div ref={prevRef} className={style.prevButton}>
                            <AiOutlineLeft />
                        </div>
                        <div ref={nextRef} className={style.nextButton}>
                            <AiOutlineRight />
                        </div>

                        <Swiper
                            className={style.swiperContent}
                            modules={[Navigation, Autoplay]}
                            speed={700}
                            slidesPerView={3}
                            loop={true}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                            breakpoints={{
                                0: { slidesPerView: 1, spaceBetween: 10 },
                                480: { slidesPerView: 2, spaceBetween: 15 },
                                980: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                        >
                            <SwiperSlide className={style.item}>
                                <Image src={decorImg1} alt="decor Image" />
                            </SwiperSlide>
                            <SwiperSlide className={style.item}>
                                <Image src={decorImg2} alt="decor Image" />
                            </SwiperSlide>
                            <SwiperSlide className={style.item}>
                                <Image src={decorImg3} alt="decor Image" />
                            </SwiperSlide>
                            <SwiperSlide className={style.item}>
                                <Image src={decorImg4} alt="decor Image" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <Button yellowLinear rounded_10 className={style.button}>
                        Liên hệ với PNM - BOX
                    </Button>
                </div>
                <Slider
                    apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                    title="Hệ thống phòng"
                    slidesPerView={3}
                    renderItem={(box) => <BoxItem box={box} />}
                    autoplay={true}
                    slidesPerGroup={3}
                />
                <Feedback />
            </div>
        </>
    );
};
export default ComboPage;
