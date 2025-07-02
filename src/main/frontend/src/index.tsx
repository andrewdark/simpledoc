import React from 'react';
import "modern-normalize";
import './index.css';
import App from './App';
import {createRoot} from "react-dom/client";
import {HashRouter} from "react-router-dom"; //BrowserRouter
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from "redux-persist";

const persistor = persistStore(store);

const container = document.getElementById("root");
const app = (<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <HashRouter><App/></HashRouter>
    </PersistGate>
</Provider>);

const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(app);

