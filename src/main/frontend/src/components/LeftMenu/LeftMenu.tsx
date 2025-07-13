import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import css from "./LeftMenu.module.css";
import {BsBarChart, BsFileEarmark, BsFolderCheck, BsPersonGear, BsQuestionCircle, BsSearch} from "react-icons/bs";
import {NavLink} from "react-router-dom";

export const LeftMenu = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
            <aside className={css.asideCls}>
                <h2>Меню</h2>
                <ul>
                    <li><NavLink to={'/report'}><BsBarChart className="left-menu-icon" size="24" /> Звітність</NavLink></li>
                    <li><NavLink to={'/select-catalog/0'}><BsFileEarmark className="left-menu-icon" size="24"/> Реєстрація</NavLink></li>
                    <li><NavLink to={'/searching'}><BsSearch className="left-menu-icon" size="24"/> Розширений пошук</NavLink></li>
                    <li><NavLink to={'/help'}><BsQuestionCircle className="left-menu-icon" size="24"/> Допомога</NavLink></li>
                    <hr/>
                    <li><NavLink to={'/catalog'}><BsFolderCheck className="left-menu-icon" size="24"/> Довідники</NavLink></li>
                    <li><NavLink to={'/user-manager'}><BsPersonGear className="left-menu-icon" size="24"/> Користувачі</NavLink></li>
                </ul>
            </aside>
    );
};
