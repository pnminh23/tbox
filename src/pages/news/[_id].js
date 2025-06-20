import Head from 'next/head';
import LayoutUser from '@/layout/LayoutUser/LayoutUser';
import NewsDetail from '@/components/page/User/NewsDetail';
import { useRouter } from 'next/router';
import { useNews } from '@/services/news';
export default function News() {
    const router = useRouter();
    const { _id } = router.query;
    const { news } = useNews(_id);

    return (
        <>
            <Head>
                <title>Chi tiết tin tức</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NewsDetail news={news} />
        </>
    );
}
News.getLayout = function getLayout(page) {
    return <LayoutUser>{page}</LayoutUser>;
};
