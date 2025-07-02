import React from 'react';
import {fetchUsers} from "../../redux/users/operations";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import List from "../List/List";
import {IUser} from "../../models/IUser";
import UserItem from "../UserItem/UserItem";

const UserList = () => {
    const users = useAppSelector(state => state.userReducer.users);

    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(fetchUsers());
        console.log("LOU: ", users);
    }

    return (
        <div>
            <button onClick={clickHandler}>Fetch user</button>
            <List items={users} renderItems={(user: IUser) => <UserItem user={user}/>}></List>
        </div>
    );
};

export default UserList;
