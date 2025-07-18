import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IDepartment} from "../../../models/catalog/IDepartment";
import {createDepartment, deleteDepartment, getAllDepartment, getDepartmentById, updateDepartment} from "./operations";

interface DepartmentState {
    items: IDepartment[];
    item: IDepartment | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: DepartmentState = {
    items: [],
    item: null,
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

                const newItems = [...state.items]; // Создаем копию массива, чтобы не мутировать исходное состояние напрямую (особенно важно для Redux/Immer)
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    // Если объект найден
                    newItems[index] = action.payload; // Заменяем объект по найденному индексу
                }
                state.items = newItems;
                state.item = null;
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
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getDepartmentById
            .addCase(getDepartmentById.pending, handlePending)
            .addCase(getDepartmentById.rejected, handleRejected)
            .addCase(getDepartmentById.fulfilled, (state: DepartmentState, action: PayloadAction<IDepartment>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});


export const departmentReducer = departmentSlice.reducer;
