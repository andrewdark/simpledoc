import React from "react";
import {useSelector} from "react-redux";
import {selectIsLoggedIn, selectRoles} from "../../redux/auth/selectors";
import {Navigate} from "react-router-dom";

interface PrivateRouteProps {
    component: React.JSX.Element;
    redirectToAuthentication: string;
    redirectToAuthorization: string;
    allowedRoles: string[];
};

export const AccessRoute = (props: PrivateRouteProps) => {

    function hasCommonElement(arr1: string[] | null, arr2: string[]): boolean {
        if(!arr1)  return false;
        // Для оптимизации, преобразуем один из массивов в Set.
        // Поиск в Set занимает в среднем O(1) время, в то время как в массиве - O(n).
        const set1 = new Set(arr1);

        // Итерируемся по второму массиву и проверяем, есть ли каждый его элемент в Set.
        for (const item of arr2) {
            if (set1.has(item)) {
                return true; // Найдено совпадение, сразу возвращаем true
            }
        }

        return false; // Если цикл завершился, совпадений не найдено
    }

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const roles = useSelector(selectRoles);
    if (!isLoggedIn) {
        return <Navigate to={props.redirectToAuthentication}/>
    }

    return hasCommonElement(roles, props.allowedRoles) ? props.component : <Navigate to={props.redirectToAuthorization}/>;
};
