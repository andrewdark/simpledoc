import css from "./Header.module.css";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import {AuthMenu} from "../AuthMenu/AuthMenu";
import {AuthNav} from "../AuthNav/AuthNav";
import {Logo} from "./Logo/Logo";

export const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (

        <header className={css.header}>
            <div className={["container", css.container].join(' ')}>
                <Logo/>
                <div className={css.auth}>
                    {isLoggedIn ? <AuthMenu/> : <AuthNav/>}
                </div>
            </div>
        </header>

    );
};
