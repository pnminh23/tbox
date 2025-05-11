import Slider from '@/components/common/Slider';
import style from './ListFilmPage.module.scss';
import { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import FilmItem from '@/components/common/ItemSlider/FilmItem';
import Banner from '@/components/common/Banner';
import clsx from 'clsx';
import Input from '@/components/common/Input/input';
import { categoryFilms, useAllFilms, useFilmsByCurrentYear } from '@/services/films';
import Pagination from '@/components/common/Pagonation';

const ListFilmPage = () => {
    const { filmsCurrentyear, isLoadingFilmsByCurrentYear, isErrorFilmsByCurrentYear, mutateFilmsByCurrentYear } =
        useFilmsByCurrentYear();
    const { films, isLoadingFilms, isErrorFilms, mutateFilms } = useAllFilms();
    const [currentPage, setCurrentPage] = useState(1); // bắt đầu từ 1
    const [limit, setLimit] = useState(8); // mặc định 8 phim/trang
    const totalItems = films?.length || 0;
    const totalPages = Math.ceil(totalItems / limit);

    // Lấy danh sách phim hiện tại để hiển thị
    const paginatedFilms = films?.slice((currentPage - 1) * limit, currentPage * limit) || [];

    const allFimContainerRef = useRef(null);

    const getLast15Years = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 15 }, (_, i) => currentYear - 1 - i);
    };

    return (
        <>
            <Banner />

            <div className={clsx('container', style.container)}>
                <div className={style.left}>
                    <Slider
                        data={filmsCurrentyear}
                        title="Phim mới ra mắt năm nay"
                        slidesPerView={4}
                        renderItem={(film) => <FilmItem film={film} />}
                    />
                    <div className={style.allFimContainer} ref={allFimContainerRef}>
                        <div className={style.title}>
                            <h3>Tất cả các Phim tại PNM - BOX</h3>
                        </div>
                        <div className={style.allFilm}>
                            {isLoadingFilms ? (
                                <p>Đang tải phim...</p>
                            ) : isErrorFilms ? (
                                <p>Lỗi khi tải phim.</p>
                            ) : (
                                paginatedFilms.map((film, index) => <FilmItem key={index} film={film} />)
                            )}
                        </div>

                        {/* Phân trang */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            limit={limit}
                            onPageChange={(page) => setCurrentPage(page)}
                            onLimitChange={(newLimit) => {
                                setLimit(newLimit);
                                setCurrentPage(1); // reset về trang đầu
                            }}
                        />
                    </div>
                </div>
                <div className={style.right}>
                    <Input rounded_5 dark icon={<AiOutlineSearch />} placeholder={'Bạn tìm phim gì'} />
                    <ul className={clsx(style.options)}>
                        <li>
                            <AiOutlineRight />
                            Phim mới ra mắt
                        </li>
                        <li>
                            <AiOutlineRight />
                            Hot và phổ biến
                        </li>
                    </ul>

                    <div className={style.category}>
                        <h5>Thể loại</h5>
                        <ul>
                            {categoryFilms.map((category, index) => (
                                <li key={index}>
                                    <AiOutlineRight />
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={style.year}>
                        <h5>Năm phát hành</h5>
                        <ul>
                            {getLast15Years().map((year) => (
                                <div key={year} className={style.yearItem}>
                                    <p>{year}</p>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ListFilmPage;
