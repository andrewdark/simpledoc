import css from "./ReportPage.module.css";
import {NavBar, navLinks} from "../../components/NavBar/NavBar";
import List from "../../components/List/List";
import {catalogList} from "../../models/static_content/ReportStaticContent";
import {ICatalog} from "../../models/catalog/IСatalog";
import CatalogItem from "../../components/catalog/CatalogItem/CatalogItem";
import React from "react";
const ReportPage = () => {
    const navLinks: navLinks[] = [{link: "/", title: "Головна"}, {link: "/report", title: "Звіти"}];

    return (
        <div className={css.reportPage}>
            <NavBar navLinks={navLinks} isAddButton={false}/>
            <List items={catalogList} renderItems={(catalog: ICatalog) => <CatalogItem catalog={catalog}/>}/>
        </div>
    );
}

export default ReportPage;
