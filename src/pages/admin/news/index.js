import Head from 'next/head';
import LayoutAdmin from '@/layout/LayoutAdmin/LayoutAdmin';
import NewsManage from '@/components/page/Admin/NewsManage/NewsManage';

const title = 'Quản lý mã và tin khuyến mãi';
export default function Account() {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NewsManage />
        </>
    );
}
Account.getLayout = function getLayout(page) {
    return (
        <LayoutAdmin admin title={title}>
            {page}
        </LayoutAdmin>
    );
};
