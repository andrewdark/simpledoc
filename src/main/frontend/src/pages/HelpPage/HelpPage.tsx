import css from "./HelpPage.module.css";
import {NavBar, navLinks} from "../../components/NavBar/NavBar";
import List from "../../components/List/List";
import {catalogList} from "../../models/static_content/RegistrationStaticContent";
import {ICatalog} from "../../models/catalog/IСatalog";
import CatalogItem from "../../components/catalog/CatalogItem/CatalogItem";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../hooks/redux";
import {setNavegante} from "../../redux/navegante/slice";
const HelpPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setNavegante({id:0, link: "/help", title: "Допомога"}));
    }, [dispatch]);
    return (
        <div className={css.helpPage}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <List items={catalogList} renderItems={(catalog: ICatalog) => <CatalogItem catalog={catalog}/>}/>
        </div>
    );
}

export default HelpPage;
