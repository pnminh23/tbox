import '../styles/_global.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingFullPage from '@/components/common/LoadingFullPage/loadingFullPage';

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);
        const handleError = () => setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleError);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleError);
        };
    }, [router]);

    // 👇 Delay hiển thị Component chính để tránh chớp

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden'; // khóa scroll
        } else {
            document.body.style.overflow = ''; // trả về trạng thái mặc định
        }
    }, [loading]);

    return (
        <>
            {loading && <LoadingFullPage />}
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}
