import { createSlice } from "@reduxjs/toolkit";
import {initStatuses} from "../../helpers/initial-statuses";

const initState = [...initStatuses]

const statusSlice = createSlice({
    name: 'statuses',
    initialState: initState,
    reducers: {
        
    }
})

export default statusSlice