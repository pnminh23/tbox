import Banner from '@/components/common/Banner';
import style from './LocationsPage.module.scss';
import Slider from '@/components/common/Slider';
import BoxItem from '@/components/common/ItemSlider/BoxItem';
import { useAllBranches } from '@/services/branch';

const LocationsPage = () => {
    const { branches, isLoadingAllBranches, isErrorAllBranches, mutateBranches } = useAllBranches();
    console.log('branches', branches);

    return (
        <>
            {/* <Slider
                    // apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                    key={branch._id}
                    data={branch.image}
                    isLoading={isLoadingAllBranches}
                    title={branch.name}
                    slidesPerView={5}
                    renderItem={(box) => <BoxItem box={box} />}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        480: { slidesPerView: 3 },
                        980: { slidesPerView: 5 },
                    }}
                />; */}
            <Banner />
            {branches?.map((branch) => {
                const roomImages = branch.rooms.map((room) => ({
                    image: room.image,
                    name: room.name,
                    type: {
                        name: room.type.name,
                    },
                }));
                return (
                    <Slider
                        key={branch._id}
                        data={roomImages}
                        subtitle={`Địa chỉ: ${branch.address}`}
                        isLoading={isLoadingAllBranches}
                        title={branch.name}
                        slidesPerView={3}
                        renderItem={(box) => <BoxItem box={box} />}
                        breakpoints={{
                            0: { slidesPerView: 2 },
                            480: { slidesPerView: 3 },
                            980: { slidesPerView: 3 },
                        }}
                    >
                        {/* <div className={style.subContent}>
                            <p className={style.address}>{`Địa chỉ: ${branch.address}`}</p>
                            <p className={style.typeRoom}></p>
                        </div> */}
                    </Slider>
                );
            })}
        </>
    );
};
export default LocationsPage;
