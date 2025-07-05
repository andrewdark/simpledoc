import List from "../../components/List/List"
import {ICatalog} from "../../models/catalog/IСatalog";
import {catalogList} from "../../models/catalog/CatalogStaticContent"
import CatalogItem from "../../components/catalog/CatalogItem/CatalogItem";
import css from './CatalogPage.module.css';

import {NavBar, navLinks} from "../../components/NavBar/NavBar";

const CatalogPage = () => {
    const navLinks: navLinks[] = [{link: "/", title: "Головна"}, {link: "/catalog", title: "Довідники"}];
    return (
        <div className={css.catalogPage}>
            <NavBar navLinks={navLinks} isAddButton={false}/>
            <List items={catalogList} renderItems={(catalog: ICatalog) => <CatalogItem catalog={catalog}/>}/>
        </div>
    );
}

export default CatalogPage;
