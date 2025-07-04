import {Role} from "../models/IUser";
import {Delivery} from "../pages/catalog/DeliveryPage/Delivery/Delivery";
import {DeliveryId} from "../pages/catalog/DeliveryPage/DeliveryId/DeliveryId";
import Department from "../pages/catalog/DepartmentPage/Department/Department";
import DepartmentId from "../pages/catalog/DepartmentPage/DepartmentId/DepartmentId";


export const routes = [
    {path:"/catalog/delivery",component: Delivery, allowedRoles:[Role.ADMIN,Role.OPERATOR], redirectToAuthentication:'/sign-in',redirectToAuthorization:'/access-deny'},
    {path:"/catalog/delivery/:id",component: DeliveryId, allowedRoles:[Role.ADMIN,Role.OPERATOR], redirectToAuthentication:'/sign-in',redirectToAuthorization:'/access-deny'},
    {path:"/catalog/department",component: Department, allowedRoles:[Role.ADMIN,Role.OPERATOR], redirectToAuthentication:'/sign-in',redirectToAuthorization:'/access-deny'},
    {path:"/catalog/department/:id",component: DepartmentId, allowedRoles:[Role.ADMIN,Role.OPERATOR], redirectToAuthentication:'/sign-in',redirectToAuthorization:'/access-deny'}

]
