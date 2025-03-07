import Link from "next/link";
import style from "./FormLogin.module.scss";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const FormLogin = () => {
    const [hiddenPw, setHiddenPw] = useState(false);
    return (
        <div className={style.container}>
            <form className={style.login}>
                <h3>đăng nhập</h3>
                <div className={style.groupItem}>
                    <input
                        type="text"
                        placeholder="Email và số điện thoại"
                        className={style.input}
                    />
                </div>
                <div className={`${style.groupItem} ${style.password}`}>
                    <input
                        type={hiddenPw ? "text" : "password"}
                        placeholder="Mật khẩu"
                        className={`${style.input} ${style.inpPassword}`}
                    />
                    <div
                        className={style.eye}
                        onClick={() => setHiddenPw(!hiddenPw)}
                    >
                        {hiddenPw ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                </div>
                <div className={style.groupItem}>
                    <div>
                        <input type="checkbox" />
                        <span>Ghi nhớ đăng nhập</span>
                    </div>
                    <Link href="#">Quên mật khẩu</Link>
                </div>
                <div className={style.groupItem}>
                    <button className={style.buttonLogin}>Đăng nhập</button>
                </div>

                <div className={style.groupItem}>
                    <span>Hoặc</span>
                </div>
                <div className={style.groupItem}>
                    <button className={style.buttonGG}>Đăng nhập</button>
                </div>
            </form>
        </div>
    );
};
export default FormLogin;
