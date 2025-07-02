import css from "./Layout.module.css";
import {useLocation} from "react-router-dom";
import {Suspense} from "react";
import {Header} from "../../components/Header/Header";
import {LeftMenu} from "../../components/LeftMenu/LeftMenu";
import {BottomMenu} from "../../components/BottomMenu/BottomMenu";

export const Layout = (props: any) => {

    const location = useLocation();
    const hideHeader = !["/", "/user-manager","/profile", "/catalog", "/report", "/registration", "/searching","/help", "/sign-up", "/sign-in", ].includes(
        location.pathname
    );
    const hideMenu = !["/", "/user-manager","/profile", "/catalog", "/report", "/registration", "/searching","/help"].includes(
        location.pathname
    );
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
