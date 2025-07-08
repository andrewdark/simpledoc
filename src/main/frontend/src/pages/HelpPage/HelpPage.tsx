import css from "./HelpPage.module.css";
import {NavBar, navLinks} from "../../components/NavBar/NavBar";
import List from "../../components/List/List";
import {catalogList} from "../../models/static_content/RegistrationStaticContent";
import {ICatalog} from "../../models/catalog/IСatalog";
import CatalogItem from "../../components/catalog/CatalogItem/CatalogItem";
import React from "react";
const HelpPage = () => {
    const navLinks: navLinks[] = [{link: "/", title: "Головна"}, {link: "/registration", title: "Реєстрація документів"}];

    return (
        <div className={css.helpPage}>
            <NavBar navLinks={navLinks} isAddButton={false}/>
            <List items={catalogList} renderItems={(catalog: ICatalog) => <CatalogItem catalog={catalog}/>}/>
        </div>
    );
}

export default HelpPage;
