import {Formik, Form, Field} from 'formik';
import css from './SignInForm.module.css';
import {ISignInRequest} from "../../models/auth/ISignInRequest";

const initialValues:ISignInRequest = {
    email: "",
    password: ""
};

interface FormProps{
    loginHandler : (credentials:ISignInRequest)=>void;
}
export const SignInForm = (props:FormProps) => {
    const handleSubmit = (values:any, actions:any) => {
        props.loginHandler(values);
        actions.resetForm();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={css.form}>
                <Field className={css.fInput} type="text" name="email" placeholder="Email"/>
                <Field className={css.fInput} type="password" name="password" placeholder="Password"/>
                <button className={css.fInput} type="submit">Submit</button>
            </Form>
        </Formik>
    );
};
