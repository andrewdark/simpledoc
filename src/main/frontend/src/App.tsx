import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {Layout} from "./hoc/Layout/Layout";
import {WelcomePage} from "./pages/WelcomePage/WelcomePage";
import {SignInPage} from "./pages/SignInPage/SignInPage";
import {SignUpPage} from "./pages/SignUpPage/SignUpPage";
import {ExceptionPage} from "./pages/ExceptionPage/ExceptionPage";
import {RestrictedRoute} from "./hoc/RestrictedRoute/RestrictedRoute";
import {PrivateRoute} from "./hoc/PrivateRoute/PrivateRoute";
import {useAppDispatch} from "./hooks/redux";
import {refreshUser} from "./redux/auth/operations";
import {myInter} from "./http";
import {store} from "./redux/store";
import {Catalogs} from "./pages/Catalogs/Catalogs";
import {Report} from "./pages/Report/Report";
import {SearchEngine} from "./pages/SearchEngine/SearchEngine";
import {Registration} from "./pages/Registration/Registration";
import {Help} from "./pages/Help/Help";
import {AccessRoute} from "./hoc/AccessRoute/AccessRoute";
import {UserManager} from "./pages/UserManager/UserManager";
import {Role} from "./models/IUser";
import {routes} from "./router";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        myInter(store);
        dispatch(refreshUser());
    }, [dispatch]);
    return (
        <Layout>
            <Routes>
                <Route path={`/`} element={
                    <PrivateRoute redirectTo="/sign-in" component={<WelcomePage/>}/>}/>
                <Route path={`/sign-in`} element={
                    <RestrictedRoute redirectTo="/" component={<SignInPage/>}/>}/>
                <Route path={`/sign-up`} element={
                    <RestrictedRoute redirectTo="/" component={<SignUpPage/>}/>}/>

                <Route path={'/catalog'} element={
                    <PrivateRoute redirectTo="/sign-in" component={<Catalogs/>}/>}/>
                {/*CATALOGS ROUT LIST*/}
                {routes.map(route=> <Route path={route.path} element={
                    <AccessRoute allowedRoles={route.allowedRoles} redirectToAuthentication={route.redirectToAuthentication}
                                 redirectToAuthorization={route.redirectToAuthorization} component={< route.component />}/>}/>)}
                {/*CATALOGS ROUT LIST*/}
                <Route path={'/catalog'} element={
                    <PrivateRoute redirectTo="/sign-in" component={<Catalogs/>}/>}/>

                <Route path={'/report'} element={
                    <PrivateRoute redirectTo="/sign-in" component={<Report/>}/>}/>
                <Route path={'/registration'} element={
                    <PrivateRoute redirectTo="/sign-in" component={<Registration/>}/>}/>
                <Route path={'/searching'} element={
                    <PrivateRoute redirectTo="/sign-in" component={<SearchEngine/>}/>}/>
                <Route path={'/help'} element={
                    <PrivateRoute redirectTo="/sign-in" component={<Help/>}/>}/>
                <Route path={'/user-manager'} element={
                    <AccessRoute allowedRoles={[Role.ADMIN]} redirectToAuthentication="/sign-in"
                                 redirectToAuthorization={"/access-deny"} component={<UserManager/>}/>}/>
                <Route path={`/access-deny`} element={<ExceptionPage message="403 - Forbidden"/>}/>
                <Route path={`*`} element={<ExceptionPage message="404 - PAGE NOT FOUND"/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
