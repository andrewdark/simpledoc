import css from "./WelcomePage.module.css";

const WelcomePage = () => {

    return (
        <div className={css.welcomePage}>
            <div className={"container"}>
                <h1>HELLO WORM!</h1>
                <p>This is a Welcome Page!!</p>

            </div>
        </div>

    );
};

export default WelcomePage;
