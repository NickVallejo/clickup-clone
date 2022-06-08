import { createSlice } from "@reduxjs/toolkit";

const initState = {1234: {id: 1234, status: 1, title: 'do dishes'}, 4321: {id: 4321, status: 2, title: 'walk dog'}, 4567: {id: 4567, status: 3, title: 'eat bangel'}}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initState,
    reducers: {
        addTask(state, action){
            const data = action.payload
            state[data.task.id] = (data.task)
        },
        removeTask(state, action){
            delete state[action.payload.id] 
        },
        changeTaskAssignee(state, action){
            const data = action.payload
            state[data.taskId].assignee = data.assignee
        },
        moveTask(state, action){
            const {from, to} = action.payload
            state[from].status = state[to].status
            const stateArray = Object.keys(state).map(key => state[key])
            stateArray = stateArray.filter(task => task.status == state[to].id)
            const toIdx = stateArray.findIndex(task => task.id == to)
            const fromIdx = stateArray.findIndex(task => task.id == from)
            const el = stateArray.splice(fromIdx, 1)
            stateArray.splice(toIdx, 0, el)
        }
    }
})

export default tasksSlice