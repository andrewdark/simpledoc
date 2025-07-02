import css from "./WelcomePage.module.css";
export const WelcomePage = () => {

    return (
        <div className={css.WelcomePage}>
            <div className={"container"}>
                <h1>HELLO WORM!</h1>
                <p>This is a Welcome Page!!</p>

            </div>
        </div>

    );
};
