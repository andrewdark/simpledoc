import css from './UserItem.module.css';
import React, {FC} from 'react';
import {IUser} from "../../models/IUser";
import {BsFeather, BsFillLockFill, BsFillUnlockFill} from "react-icons/bs";


interface UserItemProps {
    user: IUser;
}

const UserItem: FC<UserItemProps> = ({user}) => {
    return (
        <div key={user.userId} className={css.UserItem}>
            <div>{user.enabled?<BsFillUnlockFill style={{ color: 'green' }} size={24}/> : <BsFillLockFill style={{ color: 'red' }} size={24}/>}</div>
            <div>{user.userId}</div>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.email}</div>
            <div><BsFeather /></div>
        </div>
    );
};

export default UserItem;
