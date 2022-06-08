import { configureStore } from "@reduxjs/toolkit"
import statusSlice from "./slices/statusSlice"
import tasksSlice from "./slices/taskSlice"
import userSlice from "./slices/userSlice"
import boardSlice from "./slices/boardSlice"

const store = configureStore({
    reducer: {
        statuses: statusSlice.reducer,
        tasks: tasksSlice.reducer,
        users: userSlice.reducer,
        board: boardSlice.reducer,
    }
})

export const statusesActions = statusSlice.actions
export const tasksActions = tasksSlice.actions
export const usersActions = userSlice.actions
export const boardActions = boardSlice.actions

export default store