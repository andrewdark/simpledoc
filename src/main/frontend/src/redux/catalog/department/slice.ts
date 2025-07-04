import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IDepartment} from "../../../models/catalog/IDepartment";
import {createDepartment, deleteDepartment, getAllDepartment, getDepartmentById, updateDepartment} from "../department/operations";

interface DepartmentState {
    items: IDepartment[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: DepartmentState = {
    items: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}

const handlePending = (state: DepartmentState) => {
    state.isLoading = true;
};
const handleRejected = (state: DepartmentState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<DepartmentState>) => {

        builder
            //createDepartment
            .addCase(createDepartment.pending, handlePending)
            .addCase(createDepartment.rejected, handleRejected)
            .addCase(createDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateDepartment
            .addCase(updateDepartment.pending, handlePending)
            .addCase(updateDepartment.rejected, handleRejected)
            .addCase(updateDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                for (const item of state.items) {
                    if (item.id === action.payload.id) {
                        item.id = action.payload.id;

                        break;
                    }
                }
            })
            //deleteDepartment
            .addCase(deleteDepartment.pending, handlePending)
            .addCase(deleteDepartment.rejected, handleRejected)
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllDepartment
            .addCase(getAllDepartment.pending, handlePending)
            .addCase(getAllDepartment.rejected, handleRejected)
            .addCase(getAllDepartment.fulfilled, (state: DepartmentState, action: PayloadAction<IPageable<IDepartment>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload.content;
                state.page = action.payload.page;
            })
            //getDepartmentById
            .addCase(getDepartmentById.pending, handlePending)
            .addCase(getDepartmentById.rejected, handleRejected)
            .addCase(getDepartmentById.fulfilled, (state: DepartmentState, action: PayloadAction<IDepartment>) => {
                state.isLoading = false;
                state.error = '';
                state.items = [];
                state.page = {
                    "size": 1,
                    "number": 0,
                    "totalElements": 0,
                    "totalPages": 0
                }
                state.items.push(action.payload);
            })
    }
});


export const departmentReducer = departmentSlice.reducer;
