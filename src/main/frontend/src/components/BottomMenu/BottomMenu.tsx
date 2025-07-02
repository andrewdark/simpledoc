import css from "./BottomMenu.module.css";
import {BsBarChart, BsFileEarmark, BsQuestionCircle, BsSearch} from "react-icons/bs";
import {NavLink} from "react-router-dom";

export const BottomMenu = () => {
    return (
        <div className={css.BottomMenu}>
            <NavLink to={'/report'}><BsBarChart className="left-menu-icon" size="24"/> </NavLink>
            <NavLink to={'/registration'}><BsFileEarmark className="left-menu-icon" size="24"/> </NavLink>
            <NavLink to={'/searching'}><BsSearch className="left-menu-icon" size="24"/> </NavLink>
            <NavLink to={'/help'}><BsQuestionCircle className="left-menu-icon" size="24"/></NavLink>

        </div>
    );
};
