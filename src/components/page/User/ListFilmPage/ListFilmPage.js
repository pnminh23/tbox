import Slider from '@/components/common/Slider';
import style from './ListFilmPage.module.scss';
import { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import FilmItem from '@/components/common/ItemSlider/FilmItem';
import Banner from '@/components/common/Banner';
import clsx from 'clsx';
import SearchBar from '@/components/common/SearchBar';
import loadingAnimation from '@public/animations/loadingItem.json';
import Lottie from 'lottie-react';
import Input from '@/components/common/Input/input';
import {
    categoryFilms,
    useAllFilms,
    useFilm,
    useFilmsByCategory,
    useFilmsByCurrentYear,
    useFilmsByYear,
    useTop10Film,
} from '@/services/films';
import Pagination from '@/components/common/Pagonation';
import Title from '@/components/common/Title';
import Image from 'next/image';
import LoadingItem from '@/components/common/LoadingItem/LoadingItem';

const ListFilmPage = () => {
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedTopFilm, setSelectedTopFilm] = useState(false);
    const [activeFilter, setActiveFilter] = useState('');

    const { film: filmbyCategory, isLoading: loadingFilmByCategory } = useFilmsByCategory(selectedCategory);
    const { film: filmbyYear, isLoading: loadingFilmByYear } = useFilmsByYear(selectedYear);
    const { film: top10Film, isLoading: loadingTop10Film } = useTop10Film();
    const { filmsCurrentyear, isLoadingFilmsByCurrentYear, isErrorFilmsByCurrentYear } = useFilmsByCurrentYear();
    const { films, isLoadingFilms, isErrorFilms } = useAllFilms();
    const { film, isLoading: loadingFilm } = useFilm(selectedFilm);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const totalItems = films?.length || 0;
    const totalPages = Math.ceil(totalItems / limit);
    const FilmOptions = films?.map((film) => ({
        name: `${film.name} - ${film.nameEnglish}`,
        id: film._id,
        image: film.image,
    }));
    const paginatedFilms = films?.slice((currentPage - 1) * limit, currentPage * limit) || [];
    const allFimContainerRef = useRef(null);

    const getLast15Years = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 15 }, (_, i) => currentYear - 1 - i);
    };

    const clearAllFilters = () => {
        setSelectedFilm(null);
        setSelectedCategory('');
        setSelectedYear('');
        setSelectedTopFilm(false);
        setActiveFilter('');
    };

    return (
        <>
            <Banner />

            <div className={clsx('container', style.container)}>
                <div className={style.left}>
                    {/* Bộ lọc phim theo Search */}
                    {activeFilter === 'search' &&
                        (loadingFilm ? (
                            <Lottie animationData={loadingAnimation} loop autoplay className={style.loading} />
                        ) : (
                            film && (
                                <Slider
                                    data={[film]}
                                    title="Phim bạn tìm kiếm"
                                    slidesPerView={4}
                                    renderItem={(film) => <FilmItem film={film} />}
                                />
                            )
                        ))}

                    {/* Bộ lọc phim theo thể loại */}
                    {activeFilter === 'category' && filmbyCategory?.length > 0 && (
                        <Slider
                            data={filmbyCategory}
                            title={`Thể loại: ${selectedCategory}`}
                            slidesPerView={4}
                            renderItem={(film) => <FilmItem film={film} />}
                        />
                    )}

                    {/* Bộ lọc phim theo năm */}
                    {activeFilter === 'year' && filmbyYear?.length > 0 && (
                        <Slider
                            data={filmbyYear}
                            title={`Phim phát hành năm ${selectedYear}`}
                            slidesPerView={4}
                            renderItem={(film) => <FilmItem film={film} />}
                        />
                    )}

                    {/* Bộ lọc phim top10 */}
                    {activeFilter === 'top10' && top10Film?.length > 0 && (
                        <Slider
                            data={top10Film}
                            title="Top 10 được đặt nhiều nhất"
                            slidesPerView={4}
                            renderItem={(film) => <FilmItem film={film} />}
                        />
                    )}

                    {/* Không chọn bộ lọc nào => hiển thị mặc định */}
                    {
                        <>
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
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalItems={totalItems}
                                    limit={limit}
                                    onPageChange={setCurrentPage}
                                    onLimitChange={(newLimit) => {
                                        setLimit(newLimit);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </>
                    }
                </div>

                <div className={style.right}>
                    <SearchBar
                        data={FilmOptions}
                        onSelect={(item) => {
                            setSelectedFilm(item.id);
                            setSelectedCategory('');
                            setSelectedYear('');
                            setSelectedTopFilm(false);
                            setActiveFilter('search');
                        }}
                        heightImage={70}
                        widthImage={50}
                    />

                    <ul className={clsx(style.options)}>
                        <li
                            onClick={() => {
                                setSelectedTopFilm(true);
                                setSelectedFilm(null);
                                setSelectedCategory('');
                                setSelectedYear('');
                                setActiveFilter('top10');
                            }}
                        >
                            <AiOutlineRight />
                            Hot và phổ biến
                        </li>
                    </ul>

                    <div className={style.category}>
                        <h5>Thể loại</h5>
                        <ul>
                            {categoryFilms.map((category, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setSelectedFilm(null);
                                        setSelectedYear('');
                                        setSelectedTopFilm(false);
                                        setActiveFilter('category');
                                    }}
                                >
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
                                <div
                                    key={year}
                                    className={style.yearItem}
                                    onClick={() => {
                                        setSelectedYear(year.toString());
                                        setSelectedFilm(null);
                                        setSelectedCategory('');
                                        setSelectedTopFilm(false);
                                        setActiveFilter('year');
                                    }}
                                >
                                    <p>{year}</p>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <button className={style.clearButton} onClick={clearAllFilters}>
                        Xoá bộ lọc
                    </button>
                </div>
            </div>
        </>
    );
};

export default ListFilmPage;
