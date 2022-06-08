import { boardActions } from "../../../store"

export const dragDone = (data) => {
    return (dispatch) => {
        console.log('INSIDE THUNK', data)
        return new Promise((resolve, reject) => {
            dispatch(boardActions.dragSetTo(data))
            resolve()
        })
    }
}