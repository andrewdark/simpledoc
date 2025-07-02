import {RootState} from "../store";

export const selectIsLoggedIn = (state:RootState) => state.authReducer.isLoggedIn;
export const selectRoles = (state:RootState) => state.authReducer.roles;
