import { createSlice } from "@reduxjs/toolkit";

const initState = {assigneeMenu: false, drag: {from: false, to: false}}

const boardSlice = createSlice({
    name: 'board',
    initialState: initState,
    reducers: {
        activateAssigneeMenu(state, action){
            state.assigneeMenu = action.payload.id
        },
        deactivateAssigneeMenu(state, action){
            state.assigneeMenu = false
        },
        dragSetFrom(state, action){
            state.drag.from = action.payload
        },
        dragSetTo(state, action){
            state.drag.to = action.payload
        }
    }
})

export default boardSlice