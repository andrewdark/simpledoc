import css from "./Layout.module.css";
import {useLocation} from "react-router-dom";
import {Suspense} from "react";
import {Header} from "../../components/Header/Header";
import {LeftMenu} from "../../components/LeftMenu/LeftMenu";
import {BottomMenu} from "../../components/BottomMenu/BottomMenu";
import {catalogList} from "../../models/catalog/CatalogStaticContent";

export const Layout = (props: any) => {

    const location = useLocation();
    const headerArray:string[] = ["/", "/user-manager", "/profile", "/catalog", "/report", "/registration", "/searching", "/help", "/sign-up", "/sign-in",];
    const menuArray:string[] = ["/", "/user-manager", "/profile", "/catalog", "/report", "/registration", "/searching", "/help"];
    catalogList.map(el=>headerArray.push(el.path));
    catalogList.map(el=>menuArray.push(el.path));

    const hideHeader = !headerArray.includes(location.pathname);
    const hideMenu = !menuArray.includes(location.pathname);
    return (
        <Suspense>
            <div className={css.wrapper}>
                {!hideHeader && <Header/>}
                <div className={css.container}>
                    {!hideMenu && <LeftMenu/>}
                    <div className={css.main}>
                        {props.children}
                    </div>

                </div>
                {!hideMenu && <BottomMenu/>}
                <footer className={css.footer}>
                    <p>&copy; ФОП Продан К.М., 2025.</p>
                </footer>
            </div>
        </Suspense>
    );
};
