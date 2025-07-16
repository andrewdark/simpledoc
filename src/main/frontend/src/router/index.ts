import {Role} from "../models/IUser";

import Delivery from "../pages/catalog/DeliveryPage/Delivery/Delivery";
import DeliveryId from "../pages/catalog/DeliveryPage/DeliveryId/DeliveryId";

import Department from "../pages/catalog/DepartmentPage/Department/Department";
import DepartmentId from "../pages/catalog/DepartmentPage/DepartmentId/DepartmentId";

import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import ReportPage from "../pages/ReportPage/ReportPage";
import SearchEnginePage from "../pages/SearchEnginePage/SearchEnginePage";
import HelpPage from "../pages/HelpPage/HelpPage";
import UserManagerPage from "../pages/UserManagerPage/UserManagerPage";
import ResolutionCategoryId from "../pages/catalog/ResolutionCategoryPage/ResolutionCategoryId/ResolutionCategoryId";
import ResolutionCategory from "../pages/catalog/ResolutionCategoryPage/ResolutionCategory/ResolutionCategory";
import CitizenCategory from "../pages/catalog/CitizenCategoryPage/CitizenCategory/CitizenCategory";
import CitizenCategoryId from "../pages/catalog/CitizenCategoryPage/CitizenCategoryId/CitizenCategoryId";
import CitizenStatus from "../pages/catalog/CitizenStatusPage/CitizenStatus/CitizenStatus";
import CitizenStatusId from "../pages/catalog/CitizenStatusPage/CitizenStatusId/CitizenStatusId";
import RubricId from "../pages/catalog/RubricPage/RubricId/RubricId";
import Rubric from "../pages/catalog/RubricPage/Rubric/Rubric";
import Citizen from "../pages/catalog/CitizenPage/Citizen/Citizen";
import CitizenId from "../pages/catalog/CitizenPage/CitizenId/CitizenId";
import Organization from "../pages/catalog/OrganizationPage/Organization/Organization";
import OrganizationId from "../pages/catalog/OrganizationPage/OrganizationId/OrganizationId";
import RecordGroup from "../pages/catalog/RecordGroupPage/RecordGroup/RecordGroup";
import RecordGroupId from "../pages/catalog/RecordGroupPage/RecordGroupId/RecordGroupId";
import SelectRecordGroupPage from "../pages/SelectRecordGroupPage/SelectRecordGroupPage";


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
        path: "/select-catalog/:selectGroupId/registration/:recordGroupId",
        component: RegistrationPage,
        allowedRoles: [Role.ADMIN, Role.OPERATOR, Role.USER],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/select-catalog/:selectGroupId",
        component: SelectRecordGroupPage,
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
    },
    {
        path: "/catalog/record-group",
        component: RecordGroup,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/record-group/:id",
        component: RecordGroup,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/record-group/:id/details",
        component: RecordGroupId,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/organization",
        component: Organization,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/organization/:id",
        component: OrganizationId,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/citizen",
        component: Citizen,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/citizen/:id",
        component: CitizenId,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/rubric",
        component: Rubric,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/rubric/:id",
        component: RubricId,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/citizen-status",
        component: CitizenStatus,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/citizen-status/:id",
        component: CitizenStatusId,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/citizen-category",
        component: CitizenCategory,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/citizen-category/:id",
        component: CitizenCategoryId,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/resolution-category",
        component: ResolutionCategory,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },
    {
        path: "/catalog/resolution-category/:id",
        component: ResolutionCategoryId,
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
        redirectToAuthentication: '/sign-in',
        redirectToAuthorization: '/access-deny'
    },


]
