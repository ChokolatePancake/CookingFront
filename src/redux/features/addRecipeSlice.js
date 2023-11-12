import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    countSteps: 0,
}
const addRecipeSlice = createSlice({
    name: 'addRecipe',
    initialState,
    reducers: {
        addStep: (state, action) => {
            state.countSteps++;
        },
        resetSteps: (state, action) => {
            state.countSteps = 0;
        }
    },
    extraReducers: {}
})

export const {addStep, resetSteps} = addRecipeSlice.actions;

export default addRecipeSlice.reducer;

