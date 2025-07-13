import css from "./UserManagerPage.module.css";
import UserList from "../../components/UserList/UserList";
import {useAppDispatch} from "../../hooks/redux";
import React, {useEffect} from "react";
import {setNavegante} from "../../redux/navegante/slice";
import {NavBar} from "../../components/NavBar/NavBar";
const UserManagerPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setNavegante({link: "/report", title: "Звіти"}));
    }, [dispatch]);
    return (
        <div className={css.userManagerPage}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <UserList/>
        </div>
    );
}

export default UserManagerPage;
