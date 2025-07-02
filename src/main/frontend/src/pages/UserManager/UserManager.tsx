import css from "./UserManager.module.css";
import UserList from "../../components/UserList/UserList";
export const UserManager = () => {
    return (
        <div className={css.dev}>
            <UserList/>
        </div>
    );
}
