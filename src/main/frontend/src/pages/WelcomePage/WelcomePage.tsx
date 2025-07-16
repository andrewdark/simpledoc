import css from "./WelcomePage.module.css";
import {NavBar} from "../../components/NavBar/NavBar";
import {useAppDispatch} from "../../hooks/redux";
import {useEffect} from "react";
import {clearNavegante} from "../../redux/navegante/slice";

const WelcomePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearNavegante(null));
    }, [dispatch]);

    return (
        <div className={css.welcomePage}>
            <NavBar isAddButton={false} isBackButton={false}/>
            <div className={"container"}>
                <h1>HELLO WORM!</h1>
                <p>This is a Welcome Page!!</p>

            </div>
        </div>

    );
};

export default WelcomePage;
