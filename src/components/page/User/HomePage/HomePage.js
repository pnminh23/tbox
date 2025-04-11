import style from './HomePage.module.scss';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Slider from '@/components/common/Slider';
import FilmItem from '@/components/common/ItemSlider/FilmItem';
import Banner from '@/components/common/Banner';
import BoxItem from '@/components/common/ItemSlider/BoxItem';
import Button from '@/components/common/Button/Button';
import imgContent1 from '@public/static/img/imgContent1.webp';
import img2Content1 from '@public/static/img/img2Content1.jpg';
import { AiOutlineCheck, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import decorImg1 from '@public/static/img/decor/1.webp';
import decorImg2 from '@public/static/img/decor/2.webp';
import decorImg3 from '@public/static/img/decor/3.webp';
import decorImg4 from '@public/static/img/decor/4.webp';
import menu1 from '@public/static/img/menuItem/menu1.jpg';
import menu2 from '@public/static/img/menuItem/menu2.jpg';
import menu3 from '@public/static/img/menuItem/menu3.jpg';
import comboDat from '@public/static/img/menuItem/comboDating.jpg';
// import backgroundContent3 from "@public/static/img/menuItem/background.jpg";
import clsx from 'clsx';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Feedback from '@/components/common/Feedback';
const Home = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div>
            <Banner />
            <div className="container">
                <Slider
                    apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                    title="Phim hot tại PNM - BOX"
                    slidesPerView={5}
                    renderItem={(film) => <FilmItem film={film} />}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        480: { slidesPerView: 3 },
                        980: { slidesPerView: 5 },
                    }}
                />

                <Slider
                    apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                    title="Hệ thống phòng"
                    slidesPerView={3}
                    renderItem={(box) => <BoxItem box={box} />}
                    autoplay={true}
                    slidesPerGroup={3}
                />
            </div>
            <div className={style.content1}>
                <h3> lí do chọn PNM - BOX</h3>
                {/* <Image src={bkg1} alt="background" /> */}
                <div className="container">
                    <div className={style.intro}>
                        <div className={style.paragraph}>
                            <h5>Cafe phim phòng riêng đầu tiên</h5>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industrys standard dummy text ever since the 1500s, when an unknown printer
                                took a galley of type and scrambled it to make a type specimen book. It has survived not
                                only five centuries, but also the leap into electronic typesetting, remaining
                                essentially unchanged.
                                <br />
                                <br />
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                                Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                                including versions of Lorem Ipsum.
                            </p>
                        </div>
                        <Image src={imgContent1} alt="image Box" />
                    </div>
                    <div className={style.utilities}>
                        <div className={style.image}>
                            <Image src={img2Content1} alt="ảnh nhân viên" />
                        </div>
                        <div className={style.contentUtilities}>
                            <ul>
                                <li>
                                    Thiết bị hiện đại <AiOutlineCheck />
                                </li>
                                <li>
                                    vệ sinh sạch sẽ <AiOutlineCheck />
                                </li>
                                <li>
                                    bảo mật riêng tư cam kết 100% ko camera
                                    <AiOutlineCheck />
                                </li>
                                <li>
                                    Tài khoản Youtube, Netflix, Fpt Play Prenium
                                    <AiOutlineCheck />
                                </li>
                                <li>
                                    Bảo đảm vệ sinh an toàn thực phẩm
                                    <AiOutlineCheck />
                                </li>
                                <li>
                                    Dành cho khách hàng trên 18 tuổi
                                    <AiOutlineCheck />
                                </li>
                            </ul>
                            <Button uppercase p_10_24 w_fit rounded_10 redLinear bold>
                                Đặt phòng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.content2}>
                <div className={style.title}>
                    <h5>Tổ chức sự kiện</h5>
                    <p>
                        {`Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`}
                        <br />
                        {`There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...`}
                    </p>
                </div>
                {/* Nút prev/next đặt ngoài Swiper */}
                <div ref={prevRef} className={style.prevButton}>
                    <AiOutlineLeft />
                </div>
                <div ref={nextRef} className={style.nextButton}>
                    <AiOutlineRight />
                </div>

                <Swiper
                    className={style.swiperContent2}
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
            <div className={style.content3}>
                <h5>Thực đơn đa dạng</h5>
                <div className={style.containerContent3}>
                    <div className="container">
                        <div className={style.menuitem}>
                            <Image src={menu1} alt="Menu 1" />
                            <Image src={menu2} alt="Menu 2" />
                            <Image src={menu3} alt="Menu 3" />
                            <Image src={menu3} alt="Menu 3" />
                            <div className={style.comboImage}>
                                <Image src={comboDat} alt="Combo dating" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className={style.title}>
                    <h1>Đánh giá của khách hàng về PNM - BOX</h1>
                </div>
                <Feedback />
            </div>
        </div>
    );
};
export default Home;
