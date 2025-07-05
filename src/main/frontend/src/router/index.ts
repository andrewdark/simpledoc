import {Role} from "../models/IUser";
import {Delivery} from "../pages/catalog/DeliveryPage/Delivery/Delivery";
import {DeliveryId} from "../pages/catalog/DeliveryPage/DeliveryId/DeliveryId";

import Department from "../pages/catalog/DepartmentPage/Department/Department";
import DepartmentId from "../pages/catalog/DepartmentPage/DepartmentId/DepartmentId";

import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";

import ReportPage from "../pages/ReportPage/ReportPage";
import SearchEnginePage from "../pages/SearchEnginePage/SearchEnginePage";

import HelpPage from "../pages/HelpPage/HelpPage";
import UserManagerPage from "../pages/UserManagerPage/UserManagerPage";



export const routes = [

    {
        path: "/report",
        component: ReportPage,
        allowedRoles: [Role.ADMIN, Role.OPERATOR, Role.USER],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/searching",
        component: SearchEnginePage,
        allowedRoles: [Role.ADMIN, Role.OPERATOR, Role.USER],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/help",
        component: HelpPage,
        allowedRoles: [Role.ADMIN, Role.OPERATOR, Role.USER],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/user-manager",
        component: UserManagerPage,
        allowedRoles: [Role.ADMIN, Role.OPERATOR, Role.USER],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog",
        component: CatalogPage,
        allowedRoles: [Role.ADMIN, Role.OPERATOR, Role.USER],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/registration",
        component: RegistrationPage,
        allowedRoles: [Role.ADMIN, Role.OPERATOR, Role.USER],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },

    {
        path: "/catalog/delivery",
        component: Delivery,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/delivery/:id",
        component: DeliveryId,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/department",
        component: Department,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/department/:id",
        component: DepartmentId,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    }

]
