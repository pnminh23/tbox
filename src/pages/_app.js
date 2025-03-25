import '../styles/_global.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}
