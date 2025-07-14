import css from "./ReportPage.module.css";
import {NavBar, navLinks} from "../../components/NavBar/NavBar";
import List from "../../components/List/List";
import {catalogList} from "../../models/static_content/ReportStaticContent";
import {ICatalog} from "../../models/catalog/IСatalog";
import CatalogItem from "../../components/catalog/CatalogItem/CatalogItem";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../hooks/redux";
import {setNavegante} from "../../redux/navegante/slice";
const ReportPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setNavegante({id:0, link: "/report", title: "Звіти"}));
    }, [dispatch]);

    return (
        <div className={css.reportPage}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <List items={catalogList} renderItems={(catalog: ICatalog) => <CatalogItem catalog={catalog}/>}/>
        </div>
    );
}

export default ReportPage;
