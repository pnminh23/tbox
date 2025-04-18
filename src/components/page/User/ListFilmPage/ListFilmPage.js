import Slider from '@/components/common/Slider';
import style from './ListFilmPage.module.scss';
import imgtest from '@public/static/Co_dau_hao_mon.jpg';
import { useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { AiOutlineSearch, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import FilmItem from '@/components/common/ItemSlider/FilmItem';
import Banner from '@/components/common/Banner';
import clsx from 'clsx';
import Input from '@/components/common/Input/input';
const ITEMS_PER_PAGE = 12; // Số phim mỗi trang
const filmsData = Array.from({ length: 30 }, (_, index) => ({
    origin_name: `Cô dâu hào môn ${index + 1}`, // Thêm số thứ tự vào tên phim
    category: [{ name: 'Tâm lý tình cảm' }],
    year: 2025,
    time: '120 phút',
    poster_url: 'upload/vod/20231211-1/8a6139abc918a034f878e69bd5472138.jpg',
}));

const ListFilmPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const allFimContainerRef = useRef(null);
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = filmsData.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(filmsData.length / ITEMS_PER_PAGE);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);

        if (typeof window !== 'undefined' && allFimContainerRef.current) {
            const offset = 70; // Điều chỉnh khoảng cách lùi xuống
            const elementPosition = allFimContainerRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        }
    };

    const listCategoryFilm = [
        'Hành động',
        'Phiêu lưu',
        'Kinh dị',
        'Khoa học viễn tưởng',
        'Hài hước',
        'Tình cảm',
        'Tâm lý - Chính kịch',
        'Hình sự - Tội phạm',
        'Hoạt hình',
        'Viễn Tây',
    ];

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
                        apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                        title="Phim mới ra mắt"
                        slidesPerView={4}
                        renderItem={(film) => <FilmItem film={film} />}
                    />
                    <div className={style.allFimContainer} ref={allFimContainerRef}>
                        <div className={style.title}>
                            <h3>Tất cả các Phim tại PNM - BOX</h3>
                        </div>
                        <div className={style.allFilm}>
                            {currentItems.map((film, index) => (
                                <FilmItem key={index} film={film} />
                            ))}
                        </div>

                        {/* Phân trang */}
                        <ReactPaginate
                            previousLabel={<AiOutlineLeft />}
                            nextLabel={<AiOutlineRight />}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={2}
                            onPageChange={handlePageClick}
                            containerClassName={style.pagination}
                            activeClassName={style.active}
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
                            {listCategoryFilm.map((category, index) => (
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
