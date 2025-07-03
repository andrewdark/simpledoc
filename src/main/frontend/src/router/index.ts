import {Role} from "../models/IUser";
import {Delivery} from "../pages/catalog/Delivery/Delivery";


export const routes = [
    {path:"/catalog/delivery",component: Delivery, allowedRoles:[Role.ADMIN,Role.OPERATOR], redirectToAuthentication:'/sign-in',redirectToAuthorization:'/access-deny'}
]
