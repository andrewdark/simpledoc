import React, { Suspense } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import {Header} from '../../components/Header/Header'; // Предполагаем, что Header находится здесь
import css from './Layout.module.css';
import {LeftMenu} from "../../components/LeftMenu/LeftMenu";
import {BottomMenu} from "../../components/BottomMenu/BottomMenu"; // Ваш CSS-модуль

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
    const location = useLocation();

    // Определите маршруты, для которых Header НЕ должен отображаться
    // Используем useMatch для динамических маршрутов
    const isProductPage = useMatch('/product/:productId');
    const isAnotherDynamicPage = useMatch('/category/:categoryId'); // Пример другого динамического маршрута

    // Список маршрутов, на которых Header должен быть скрыт
    const routesToHideHeader = ["/sign-up", "/sign-in"];

    // Проверяем, скрывать ли Header:
    // 1. Текущий путь точно совпадает с одним из путей в routesToHideHeader
    // 2. Текущий путь совпадает с динамическим маршрутом /product/:productId
    // 3. Текущий путь совпадает с другим динамическим маршрутом /category/:categoryId
    const hideHeader =
        routesToHideHeader.includes(location.pathname) ||
        !!isProductPage || // !! преобразует объект (или null) в true/false
        !!isAnotherDynamicPage;

    return (
        <Suspense fallback={<div>Loading...</div>}> {/* Добавьте fallback для Suspense */}
            <div className={css.wrapper}>
                {!hideHeader && <Header/>}
                <div className={css.container}>
                    {!hideHeader && <LeftMenu/>}
                    <div className={css.main}>
                        {props.children}
                    </div>

                </div>
                {!hideHeader && <BottomMenu/>}
                <footer className={css.footer}>
                    <p>&copy; ФОП Продан К.М., 2025.</p>
                </footer>
            </div>
        </Suspense>
    );
};
