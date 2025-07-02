import React, {FC} from "react";
import css from "./CatalogItems.module.css";
import {ICatalog} from "../../../models/catalog/IСatalog";


interface CatalogItemProps {
    catalog: ICatalog;
}

const CatalogItem: FC<CatalogItemProps> = ({catalog}) => {
    return (
        <div key={catalog.id} className={css.catalogItem}>

            <h4>{catalog.title}</h4>
            <p>{catalog.description}</p>

        </div>
    );
};

export default CatalogItem;
