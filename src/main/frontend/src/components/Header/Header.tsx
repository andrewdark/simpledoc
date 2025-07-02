import css from "./Header.module.css";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import {AuthMenu} from "../AuthMenu/AuthMenu";
import {AuthNav} from "../AuthNav/AuthNav";
import {BsSun} from "react-icons/bs";

export const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (

        <header className={css.header}>
            <div className={["container", css.container].join(' ')}>
                <nav className={css.nav}>
                    <BsSun className="logo-icon" size='24'/>SimpleDoc
                </nav>
                <div className={css.auth}>
                    {isLoggedIn ? <AuthMenu/> : <AuthNav/>}
                </div>
            </div>
        </header>

    );
};
