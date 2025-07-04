import {Role} from "../models/IUser";
import {Delivery} from "../pages/catalog/Delivery/Delivery";
import {DeliveryDetail} from "../components/catalog/delivery/DeliveryDetail/DeliveryDetail";


export const routes = [
    {path:"/catalog/delivery",component: Delivery, allowedRoles:[Role.ADMIN,Role.OPERATOR], redirectToAuthentication:'/sign-in',redirectToAuthorization:'/access-deny'},
    {path:"/catalog/delivery/:deliveryId",component: DeliveryDetail, allowedRoles:[Role.ADMIN,Role.OPERATOR], redirectToAuthentication:'/sign-in',redirectToAuthorization:'/access-deny'}
]
