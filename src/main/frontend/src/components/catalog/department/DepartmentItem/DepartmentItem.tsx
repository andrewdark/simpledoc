import React, {FC} from 'react';
import {BsBuilding, BsFeather, BsFileText, BsPersonVcard, BsTrash} from "react-icons/bs";
import {IDepartment} from "../../../../models/catalog/IDepartment";
import {deleteDepartment} from "../../../../redux/catalog/department/operations";
import {useAppDispatch} from "../../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import css from './DepartmentItem.module.css';

interface DepartmentItemProps {
    department: IDepartment
}

const DepartmentItem: FC<DepartmentItemProps> = ({department}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <div className={css.departmentItem}>
            <div>{department.official ? <BsPersonVcard size={24}/> : <BsBuilding size={24}/>}</div>
            <div>{department.id}</div>
            <div>{department.name}</div>
            <div>{department.createdAt}</div>
            <div><BsFeather/></div>
            <div onClick={() => navigate(`/catalog/department/${department.id}`, {
                state: {
                    param1: "hello",
                    param2: "worm"
                }
            })}><BsFileText/></div>
            <div onClick={() => {
                dispatch(deleteDepartment({id: department.id}))
            }}><BsTrash/></div>
        </div>
    );
};

export default DepartmentItem;
