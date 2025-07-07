import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import {IOrganization} from "../../../../models/catalog/IOrganization";
import {FC} from "react";
import css from './OrganizationItem.module.css';

interface OrganizationItemProps {
    item: IOrganization,
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;
}

export const OrganizationItem: FC<OrganizationItemProps> = ({item, readItemHandler, updateItemHandler, deleteItemHandler}) => {

    return (
        <div key={item.id} className={css.organizationItem}>
            <div>{item.id}</div>

            <div className={css.itemNavigation}>
                <div onClick={() => {
                    readItemHandler(item.id ? item.id : 0)
                }}><BsFileText/></div>
                <div onClick={() => {
                    updateItemHandler(item.id ? item.id : 0)
                }}><BsFeather/></div>
                <div onClick={() => deleteItemHandler(item.id ? item.id : 0)}><BsTrash/></div>
            </div>
        </div>
    );
};
