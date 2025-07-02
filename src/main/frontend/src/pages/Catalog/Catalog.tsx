
import List from "../../components/List/List"
import {ICatalog} from "../../models/catalog/IСatalog";
import {catalogList} from "../../models/catalog/CatalogStaticContent"
import CatalogItem from "../../components/catalog/CatalogItems/CatalogItem";
export const Catalog = () => {
    return (
        <div>
            <List items={catalogList} renderItems={(catalog:ICatalog)=><CatalogItem catalog={catalog}/>}/>
        </div>

    );
}
