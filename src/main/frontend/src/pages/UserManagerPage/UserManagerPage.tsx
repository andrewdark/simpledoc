import css from "./UserManagerPage.module.css";
import UserList from "../../components/UserList/UserList";
const UserManagerPage = () => {
    return (
        <div className={css.userManagerPage}>
            <UserList/>
        </div>
    );
}

export default UserManagerPage;
