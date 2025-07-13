import css from "./SearchEnginePage.module.css";
import {useAppDispatch} from "../../hooks/redux";
import {useEffect} from "react";
import {setNavegante} from "../../redux/navegante/slice";
import {NavBar} from "../../components/NavBar/NavBar";
const SearchEnginePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setNavegante({link: "/searching", title: "Пошук"}));
    }, [dispatch]);

    return (
        <div className={css.searchEnginePage}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <h1>SearchEngine</h1>
        </div>
    );
}

export default SearchEnginePage;
