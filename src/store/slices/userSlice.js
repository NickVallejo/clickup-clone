import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid'

const initState = {1 : {id: 1, name: 'Nick'}, 2 : {id: 2, name: 'David'}, 3: {id: 3, name: 'Jessica'}}

const userSlice = createSlice({
    name: 'users',
    initialState: initState,
    reducers: {
        addUser(state, action){
            const {id, name} = action.payload
            state[id] = {id, name}
        }
    }
})

export default userSlice