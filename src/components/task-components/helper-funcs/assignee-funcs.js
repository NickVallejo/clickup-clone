import { boardActions, usersActions } from "../../../store"
import {v4 as uuidv4} from 'uuid'

export const offMenu = (e, menu) => {
    return (dispatch) => {
        if(!e.target.closest('.assign-menu') && 
        !e.target.classList.contains('assign-circ') && 
        menu) dispatch(boardActions.deactivateAssigneeMenu())
    }
}

export const onMenu = (e, id) => {
    return (dispatch) => {
        if(!e.target.classList.contains('assign-del')){
            dispatch(boardActions.activateAssigneeMenu({id}))
        }
    }
}

export const modifyAssigneeThunk = (e, modifyAssignee) => {
    return (dispatch) => {
        modifyAssignee(e.target.dataset.id) 
        dispatch(boardActions.deactivateAssigneeMenu())
    }
}

export const addNewUser = (srcVal, modifyAssignee) => {
    return (dispatch) => {
        const newUserId = uuidv4()
        dispatch(boardActions.deactivateAssigneeMenu())
        dispatch(usersActions.addUser({id: newUserId, name: srcVal}))
        modifyAssignee(newUserId) 
        srcVal = ''
    }
}