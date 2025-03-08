import Link from "next/link";
import style from "./FormLogin.module.scss";
import { useState } from "react";
import {
    AiFillEye,
    AiFillEyeInvisible,
    AiOutlineWarning,
} from "react-icons/ai";

const FormLogin = () => {
    const [hiddenPw, setHiddenPw] = useState(false);
    // const [validate, setValidate] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: false, password: false });
    const [tooltip, setTooltip] = useState("");
    const validateInput = (name, value) => {
        setErrors((prev) => {
            let newErrors = { ...prev };

            if (!value.trim()) {
                newErrors[name] = true; // Nếu rỗng, gán lỗi
                setTooltip("Email và số điện thoại không được bỏ trống.");
            } else if (name === "password") {
                // Kiểm tra mật khẩu phải có ít nhất 8 ký tự và 1 chữ cái viết hoa
                if (value.length < 8 && !/[A-Z]/.test(value)) {
                    newErrors.password = true;
                    setTooltip(
                        "Mật khẩu phải đủ 8 kí tự và ít nhất 1 chữ cái viết hoa."
                    );
                } else if (value.length < 8) {
                    newErrors.password = true;
                    setTooltip("Mật khẩu phải đủ 8 kí tự.");
                } else if (!/[A-Z]/.test(value)) {
                    newErrors.password = true;
                    setTooltip("Mật khẩu phải có ít nhất 1 chữ cái viết hoa.");
                } else {
                    newErrors.password = false;
                }
            } else {
                newErrors[name] = false; // Nếu hợp lệ, xóa lỗi
            }

            return newErrors;
        });
    };
    return (
        <div className={style.container}>
            <form className={style.login}>
                <h3>đăng nhập</h3>
                <div className={`${style.groupItem} ${style.relative}`}>
                    <input
                        type="text"
                        placeholder="Email và số điện thoại"
                        className={`${style.input} ${
                            errors.email ? style.checked : ""
                        }`}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateInput("email", e.target.value);
                        }}
                        onBlur={(e) => validateInput("email", e.target.value)}
                    />
                    {errors.email && (
                        <div className={style.validation}>
                            <AiOutlineWarning />
                            <span className={style.tooltip}>{tooltip}</span>
                        </div>
                    )}
                </div>
                <div className={`${style.groupItem} ${style.relative}`}>
                    <input
                        type={hiddenPw ? "text" : "password"}
                        placeholder="Mật khẩu"
                        className={`${style.input} ${style.inpPassword} ${
                            errors.password ? style.checked : ""
                        }`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validateInput("password", e.target.value);
                        }}
                        onBlur={(e) =>
                            validateInput("password", e.target.value)
                        }
                    />
                    {errors.password && (
                        <div className={style.validation}>
                            <AiOutlineWarning />
                            <span className={style.tooltip}>{tooltip}</span>
                        </div>
                    )}
                    <div
                        className={style.eye}
                        onClick={() => setHiddenPw(!hiddenPw)}
                    >
                        {hiddenPw ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                </div>

                <div
                    className={`${style.groupItem} ${style.justyfiContentBetween}`}
                >
                    <div className={style.checkboxWrapper}>
                        <input
                            id="rememberMe"
                            type="checkbox"
                            className={style.promotedInputCheckbox}
                        />
                        <svg>
                            <use xlinkHref="#checkmark" />
                        </svg>
                        <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
                    </div>
                    <Link href="#">Quên mật khẩu?</Link>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: "none" }}
                    >
                        <symbol id="checkmark" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                fill="none"
                                d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                            ></path>
                        </symbol>
                    </svg>
                </div>
                <div className={style.groupItem}>
                    <button className={style.buttonLogin}>Đăng nhập</button>
                </div>

                <div className={style.groupItem}>
                    <span className={style.dividerText}>Hoặc</span>
                </div>
                <div className={style.groupItem}>
                    <button className={style.buttonGG}>
                        Đăng nhập bằng Google
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="48px"
                            height="48px"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                            />
                            <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                            />
                            <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                            />
                            <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};
export default FormLogin;
