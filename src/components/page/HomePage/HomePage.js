import style from "./HomePage.module.scss";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Slider from "@/components/common/Slider";
import FilmItem from "@/components/common/ItemSlider/FilmItem";
import Banner from "@/components/common/Banner";
import BoxItem from "@/components/common/ItemSlider/BoxItem";
import imgContent1 from "../../../../public/static/img/imgContent1.webp";
import img2Content1 from "../../../../public/static/img/img2Content1.jpg";
import Image from "next/image";
const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <div className="container">
                <Slider
                    apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                    title="Phim hot tại PNM - BOX"
                    slidesPerView={5}
                    renderItem={(film) => <FilmItem film={film} />}
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
                {/* <Image src={bkg1} alt="background" /> */}
                <h3> lí do chọn PNM - BOX</h3>
                <div className={style.intro}>
                    <div className={style.paragraph}>
                        <h5>Cafe phim phòng riêng đầu tiên</h5>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industrys standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                            <br />
                            <br />
                            It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                    <Image src={imgContent1} alt="image Box" />
                </div>
                <div className={style.utilities}>
                    <div className={style.image}>
                        <Image src={img2Content1} alt="ảnh nhân viên" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Home;
