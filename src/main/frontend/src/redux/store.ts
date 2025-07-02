import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./users/slice";
import {authReducer} from "./auth/slice";
//REDUX-PERSIST
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Persisting token field from auth slice to localstorage
const authPersistConfig = {
    key: 'accessTokenPersist',
    storage,
    whitelist: ['accessToken'],
};

const rootReducer = combineReducers({
    userReducer,
    authReducer: persistReducer(authPersistConfig, authReducer),
});
const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    });
}
export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
