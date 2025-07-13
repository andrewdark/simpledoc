import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./users/slice";
import {authReducer} from "./auth/slice";
import {deliveryReducer} from "./catalog/delivery/slice";
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
import {departmentReducer} from "./catalog/department/slice";
import {citizenStatusReducer} from "./catalog/citizen_status/slice";
import {resolutionCategoryReducer} from "./catalog/resolution_category/slice";
import {citizenCategoryReducer} from "./catalog/citizen_category/slice";
import {rubricReducer} from "./catalog/rubric/slice";
import {citizenReducer} from "./catalog/citizen/slice";
import {recordGroupReducer} from "./catalog/record_group/slice";
import {organizationReducer} from "./catalog/organization/slice";
import {modalReducer} from "./modal/slice";
import {naveganteReducer} from "./navegante/slice";
// Persisting token field from auth slice to localstorage
const authPersistConfig = {
    key: 'accessTokenPersist',
    storage,
    whitelist: ['accessToken'],
};

const rootReducer = combineReducers({
    modalReducer,
    userReducer,
    recordGroupReducer,
    departmentReducer,
    organizationReducer,
    citizenReducer,
    deliveryReducer,
    rubricReducer,
    citizenStatusReducer,
    citizenCategoryReducer,
    resolutionCategoryReducer,
    naveganteReducer,
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
