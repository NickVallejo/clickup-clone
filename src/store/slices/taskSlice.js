import { createSlice } from "@reduxjs/toolkit";

const initState = {
    1 : [
        {id: 1234, status: 1, title: 'do dishes'},
        {id: 4321, status: 1, title: 'eat penne pasta'}
    ],
    2 : [
        {id: 5678, status: 2, title: 'talk to daniel'},
        {id: 8765, status: 2, title: 'call gma about going to the zoo'}
    ],
    3 : [
        {id: 9012, status: 3, title: 'go zorbing with austin'},
        {id: 9021, status: 3, title: 'eat a lil poo'}
    ] 
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initState,
    reducers: {
        addTask(state, action){
            const task = action.payload.task
            state[task.status].push(task)
        },
        removeTask(state, action){
            const task = action.payload.task
            const idx = state[task.status].findIndex(el => el.id === task.id)
            state[task.status].splice(idx, 1)
        },
        changeTaskAssignee(state, action){
            const {task, assignee} = action.payload
            const el = state[task.status].find(el => el.id === task.id)
            el.assignee = assignee
        },
        moveTask(state, action){
            const {from, to} = action.payload
            const fromIdx = state[from.status].findIndex(el => el.id === from.id)
            const toIdx = state[to.status].findIndex(el => el.id === to.id)

            const splicedEl = state[from.status].splice(fromIdx, 1)[0]
            splicedEl.status = to.status
            
            state[to.status].splice(toIdx, 0, splicedEl)
        }
    }
})

export default tasksSlice