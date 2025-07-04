import css from "./SignUpPage.module.css";
import {NavLink} from "react-router-dom";
import {SignUpForm} from "../../components/SignUpForm/SignUpForm";
import {useAppDispatch} from "../../hooks/redux";
import {register} from "../../redux/auth/operations";
import {ISignUpRequest} from "../../models/auth/ISignUpRequest";

const SignUpPage = () => {
    const dispatch = useAppDispatch();

    const loginHandler = (credentials: ISignUpRequest) => {
        dispatch(register(credentials));
    }
    return (
        <div className={"container"}>
            <div className={css.loginWrap}>
                <h2>Register</h2>
                <SignUpForm loginHandler={loginHandler}/>
                <NavLink className={css.link} to={`/sign-in`}>
                    Already registered? Login
                </NavLink>
            </div>
        </div>

    );
};

export default SignUpPage;
