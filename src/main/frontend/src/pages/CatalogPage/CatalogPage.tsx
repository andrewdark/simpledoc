import List from "../../components/List/List"
import {ICatalog} from "../../models/catalog/IСatalog";
import {catalogList} from "../../models/static_content/CatalogStaticContent"
import CatalogItem from "../../components/catalog/CatalogItem/CatalogItem";
import css from './CatalogPage.module.css';

import {NavBar, navLinks} from "../../components/NavBar/NavBar";
import {useAppDispatch} from "../../hooks/redux";
import {useEffect} from "react";
import {setNavegante} from "../../redux/navegante/slice";

const CatalogPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setNavegante({id:0, link: "/catalog", title: "Довідники"}));
    }, [dispatch]);

    return (
        <div className={css.catalogPage}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <List items={catalogList} renderItems={(catalog: ICatalog) => <CatalogItem catalog={catalog}/>}/>
        </div>
    );
}

export default CatalogPage;
