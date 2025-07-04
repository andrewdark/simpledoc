import List from "../../components/List/List"
import {ICatalog} from "../../models/catalog/IСatalog";
import {catalogList} from "../../models/catalog/CatalogStaticContent"
import CatalogItem from "../../components/catalog/CatalogItem/CatalogItem";
import {NavBar, navLinks} from "../../components/NavBar/NavBar";

export const Catalogs = () => {
    const navLinks: navLinks[] = [{link: "/", title: "Головна"}, {link: "/catalog", title: "Довідники"}];
    return (
        <div>
            <NavBar navLinks={navLinks} isAddButton={false} setVisible={() => {
            }}/>
            <List items={catalogList} renderItems={(catalog: ICatalog) => <CatalogItem catalog={catalog}/>}/>
        </div>
    );
}
