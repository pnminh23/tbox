import { useState, useEffect } from 'react';
import { login } from '@/services/auth';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from 'js-cookie';
import Link from 'next/link';
import clsx from 'clsx';
import style from './FormRegister.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { AiFillEye, AiFillEyeInvisible, AiOutlineLeft } from 'react-icons/ai';
import Button from '@/components/common/Button/Button';
import LoadingFullPage from '@/components/common/LoadingFullPage/loadingFullPage';
import { useRouter } from 'next/router';
import { PATH } from '@/constants/config';

const FormRegister = () => {
    const [hiddenPw, setHiddenPw] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmPassword: '',
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const validateInput = (name, value) => {
        setErrors((prev) => {
            let newErrors = { ...prev };
            if (!value.trim()) {
                newErrors[name] = 'Trường này không được bỏ trống.';
            } else if (name === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                newErrors.email = emailRegex.test(value) ? '' : 'Email không đúng định dạng.';
            } else if (name === 'password') {
                if (value.length < 8 && !/[A-Z]/.test(value)) {
                    newErrors.password = 'Mật khẩu phải đủ 8 kí tự và ít nhất 1 chữ cái viết hoa.';
                } else if (value.length < 8) {
                    newErrors.password = 'Mật khẩu phải đủ 8 kí tự.';
                } else if (!/[A-Z]/.test(value)) {
                    newErrors.password = 'Mật khẩu phải có ít nhất 1 chữ cái viết hoa.';
                } else {
                    newErrors.password = '';
                }
            } else if (name === 'phonenumber') {
                const phoneRegex = /^(0|\+84)(\d{9})$/; // Ví dụ kiểm tra số điện thoại Việt Nam
                newErrors.phonenumber = phoneRegex.test(value)
                    ? ''
                    : 'Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 hoặc +84 và có 10 chữ số.';
            } else if (name === 'name') {
                const containsNumber = /\d/.test(value);
                newErrors[name] = containsNumber ? 'Trường này không được chứa số.' : '';
            } else if (name === 'confirmPassword') {
                newErrors.confirmPassword = value !== password ? 'Mật khẩu nhập lại không khớp.' : '';
            } else {
                newErrors[name] = '';
            }
            return newErrors;
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (errors.email || errors.password || !email || !password) {
            toast.error('Vui lòng kiểm tra lại thông tin!');
            return;
        }

        setLoading(true);
        try {
            const response = await login(email, password);

            if (response.sucess) {
                toast.success('Đăng nhập thành công!');

                setTimeout(() => {
                    router.push('/');
                }, 1500);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
    };
    // useEffect(() => {
    //     const handleRouteChange = () => setLoading(false);
    //     window.addEventListener('load', handleRouteChange);
    //     return () => window.removeEventListener('load', handleRouteChange);
    // }, []);
    return (
        <>
            {loading && <LoadingFullPage />} {/* Loading toàn trang */}
            <div className={style.container}>
                <form className={style.login} onSubmit={handleLogin}>
                    <div className={style.headerRow}>
                        <h3>Đăng ký</h3>
                        <AiOutlineLeft className={style.back} onClick={() => router.back()} />
                    </div>
                    <div className={clsx(style.groupItem, style.relative)}>
                        <Tippy content={errors.name} visible={!!errors.name} placement="right">
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                className={clsx(style.input, { [style.checked]: errors.name })}
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    validateInput('name', e.target.value);
                                }}
                                onBlur={(e) => validateInput('name', e.target.value)}
                            />
                        </Tippy>
                    </div>
                    <div className={clsx(style.groupItem, style.relative)}>
                        <Tippy content={errors.email} visible={!!errors.email} placement="right">
                            <input
                                type="text"
                                placeholder="Email hoặc số điện thoại"
                                className={clsx(style.input, { [style.checked]: errors.email })}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateInput('email', e.target.value);
                                }}
                                onBlur={(e) => validateInput('email', e.target.value)}
                            />
                        </Tippy>
                    </div>
                    <div className={clsx(style.groupItem, style.relative)}>
                        <Tippy content={errors.phonenumber} visible={!!errors.phonenumber} placement="right">
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                className={clsx(style.input, { [style.checked]: errors.phonenumber })}
                                value={phonenumber}
                                onChange={(e) => {
                                    setPhonenumber(e.target.value);
                                    validateInput('phonenumber', e.target.value);
                                }}
                                onBlur={(e) => validateInput('phonenumber', e.target.value)}
                            />
                        </Tippy>
                    </div>
                    <div className={clsx(style.groupItem, style.relative)}>
                        <Tippy content={errors.password} visible={!!errors.password} placement="right">
                            <div className={style.inputWrapper}>
                                <input
                                    type={hiddenPw ? 'text' : 'password'}
                                    placeholder="Mật khẩu"
                                    className={clsx(style.input, style.inpPassword, {
                                        [style.checked]: errors.password,
                                    })}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validateInput('password', e.target.value);
                                    }}
                                    onBlur={(e) => validateInput('password', e.target.value)}
                                />
                                <div className={style.eye} onClick={() => setHiddenPw(!hiddenPw)}>
                                    {hiddenPw ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </div>
                            </div>
                        </Tippy>
                    </div>
                    <div className={clsx(style.groupItem, style.relative)}>
                        <Tippy content={errors.confirmPassword} visible={!!errors.confirmPassword} placement="right">
                            <div className={style.inputWrapper}>
                                <input
                                    type={hiddenPw ? 'text' : 'password '}
                                    placeholder="Nhập lại mật khẩu"
                                    className={clsx(style.input, style.inpPassword, {
                                        [style.checked]: errors.confirmPassword,
                                    })}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        validateInput('confirmPassword', e.target.value);
                                    }}
                                    onBlur={(e) => validateInput('confirmPassword', e.target.value)}
                                />
                                <div className={style.eye} onClick={() => setHiddenPw(!hiddenPw)}>
                                    {hiddenPw ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </div>
                            </div>
                        </Tippy>
                    </div>

                    <div className={style.groupItem}>
                        <Button
                            type="submit"
                            yellowLinear
                            rounded_20
                            uppercase
                            disabled={
                                loading ||
                                !name ||
                                !email ||
                                !phonenumber ||
                                !password ||
                                !confirmPassword ||
                                Object.values(errors).some((e) => e)
                            }
                        >
                            Đăng ký
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormRegister;
