import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from "yup";
import {FC, useId} from "react";
import css from './SignUpForm.module.css';
import {ISignUpRequest} from "../../models/auth/ISignUpRequest";

const initialValues: ISignUpRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Must be a valid email!").required("Required"),
    password: Yup.string().min(3, "Too short").max(256, "Too long").required("Required"),
    confirmPassword: Yup.string().required("Required").oneOf([Yup.ref('password')], 'Passwords must match')
});

interface FormProps {
    loginHandler: (credentials: ISignUpRequest) => void;
}

export const SignUpForm: FC<FormProps> = (props) => {
    const firstNameFieldId = useId();
    const lastNameFieldId = useId();
    const emailFieldId = useId();
    const passwordFieldId = useId();
    const confirmPasswordFieldId = useId();

    const handleSubmit = (values: ISignUpRequest, actions: any) => {
        props.loginHandler(values);
        actions.resetForm();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignUpSchema}>
            <Form className={css.form}>
                <div className={css.fieldsGroup}>
                    {/*<label htmlFor={firstNameFieldId}>FirstName</label>*/}
                    <Field id={firstNameFieldId} className={css.fInput} type="text" name="firstName"
                           placeholder="First Name"/>
                    <ErrorMessage className={css.error} name="firstName" component="span"/>
                </div>

                <div className={css.fieldsGroup}>
                    {/*<label htmlFor={lastNameFieldId}>LastName</label>*/}
                    <Field id={lastNameFieldId} className={css.fInput} type="text" name="lastName"
                           placeholder="Last Name"/>
                    <ErrorMessage className={css.error} name="lastName" component="span"/>
                </div>

                <div className={css.fieldsGroup}>
                    {/*<label htmlFor={emailFieldId}>Email</label>*/}
                    <Field id={emailFieldId} className={css.fInput} type="text" name="email" placeholder="Email"/>
                    <ErrorMessage className={css.error} name="email" component="span"/>
                </div>

                <div className={css.fieldsGroup}>
                    {/*<label htmlFor={passwordFieldId}>Password</label>*/}
                    <Field id={passwordFieldId} className={css.fInput} type="password" name="password"
                           placeholder="Password"/>
                    <ErrorMessage className={css.error} name="password" component="span"/>
                </div>

                <div className={css.fieldsGroup}>
                    {/*<label htmlFor={confirmPasswordFieldId}>ConfirmPassword</label>*/}
                    <Field id={confirmPasswordFieldId} className={css.fInput} type="password" name="confirmPassword"
                           placeholder="Confirm password"/>
                    <ErrorMessage className={css.error} name="confirmPassword" component="span"/>
                </div>

                <button className={css.submitBtn} type="submit">Submit</button>
            </Form>
        </Formik>
    );
};
