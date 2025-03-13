import style from "./Footer.module.scss";
import logo from "../../../../public/static/img/logoBOX.svg";
import {
    AiOutlineFacebook,
    AiOutlineInstagram,
    AiOutlineYoutube,
} from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
function Footer() {
    return (
        <div className={style.container}>
            <div className="container">
                <div className={style.footer}>
                    <div className={style.logo}>
                        <Image src={logo} alt="logo" />
                    </div>
                    <div className={style.listBranch}>
                        <h3>Hệ thống TBOX tại Hà Nội</h3>
                        <div className={style.listBranchctn}>
                            <ul>
                                <li>175 Tây Sơn</li>
                                <li>175 Tây Sơn</li>
                                <li>175 Tây Sơn</li>
                                <li>175 Tây Sơn</li>
                            </ul>
                            <ul>
                                <li>175 Tây Sơn</li>
                                <li>175 Tây Sơn</li>
                                <li>175 Tây Sơn</li>
                                <li>175 Tây Sơn</li>
                            </ul>
                        </div>
                    </div>
                    <div className={style.contact}>
                        <h3>Liên hệ</h3>
                        <div className={style.listContact}>
                            <div className={style.ico}>
                                <Link href="#">
                                    <AiOutlineFacebook />
                                </Link>
                            </div>
                            <div className={style.ico}>
                                <Link href="#">
                                    <AiOutlineInstagram />
                                </Link>
                            </div>
                            <div className={style.ico}>
                                <Link href="#">
                                    <AiOutlineYoutube />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;
