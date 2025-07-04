import {Role} from "../models/IUser";
import {DeliveryList} from "../pages/catalog/delivery/DeliveryList/DeliveryList";
import {DeliveryDetail} from "../pages/catalog/delivery/DeliveryId/DeliveryDetail";


export const routes = [
    {path:"/catalog/delivery",component: DeliveryList, allowedRoles:[Role.ADMIN,Role.OPERATOR], redirectToAuthentication:'/sign-in',redirectToAuthorization:'/access-deny'},
    {path:"/catalog/delivery/:deliveryId",component: DeliveryDetail, allowedRoles:[Role.ADMIN,Role.OPERATOR], redirectToAuthentication:'/sign-in',redirectToAuthorization:'/access-deny'}
]
