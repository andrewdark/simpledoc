import css from './SignInPage.module.css';
import {SignInForm} from "../../components/SignInForm/SignInForm";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {ISignInRequest} from "../../models/auth/ISignInRequest";
import {logIn} from "../../redux/auth/operations";

export const SignInPage = () => {
    const dispatch = useAppDispatch();

    const loginHandler = (credentials: ISignInRequest) => {
        dispatch(logIn(credentials));
    }
    return (
        <div className={"container"}>
            <div className={css.loginWrap}>
                <h2>Login</h2>
                <SignInForm loginHandler={loginHandler}/>
                <NavLink className={css.link} to={`/sign-up`}>
                    Don't have an account? Register
                </NavLink>
            </div>
        </div>

    );
};
