import React, {FC} from "react";
import css from "./CatalogItem.module.css";
import {ICatalog} from "../../../models/catalog/IСatalog";
import {NavLink} from "react-router-dom";


interface CatalogItemProps {
    catalog: ICatalog;
}

const CatalogItem: FC<CatalogItemProps> = ({catalog}) => {
    return (
        <div key={catalog.id} className={css.catalogItem}>
            <NavLink to={catalog.path}>
                <h4>{catalog.title}</h4>
                <p>{catalog.description}</p>
            </NavLink>
        </div>
    );
};

export default CatalogItem;
