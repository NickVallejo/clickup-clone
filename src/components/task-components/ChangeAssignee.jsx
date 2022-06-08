import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onMenu, offMenu, modifyAssigneeThunk, addNewUser } from './helper-funcs/assignee-funcs'

const ChangeAssignee = ({modifyAssignee, assignee, id}) => {
    const users = useSelector(state => state.users)
    const userArray = Object.keys(users).map(key => users[key])
    const [menu, setMenu] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState(userArray)
    const srcRef = useRef()
    const dispatch = useDispatch()
    const activeAssigneeMenu = useSelector(state => state.board.assigneeMenu)

    //add document click lsiteneres. should be fixed
    useEffect(() => {
        document.addEventListener('click', offMenuHandler)
        return () => document.removeEventListener('click', offMenuHandler)
    })
    //check if active menu is this current instance
    useEffect(() => setMenu(activeAssigneeMenu === id), [activeAssigneeMenu])
    //when a new user is added, refresh the filter array to include the new user
    useEffect(() => setFilteredUsers(userArray), [users])
    // turn off menu and remove it as active menu
    const offMenuHandler = (e) => dispatch(offMenu(e, menu))
    //show menu and assign it as the active menu
    const onMenuHandler = (e) => dispatch(onMenu(e, id))
    //delete currently assigned user when x icon is clicked
    const deleteAssignee = () => modifyAssignee(false)
    //modify assignee when existing user is clicked, not when created
    const modifyAssigneeHandler = (e) => dispatch(modifyAssigneeThunk(e, modifyAssignee))

    const srcNewUser = (e) => {
        const srcVal = srcRef.current.value
        //if src length, filter users, otherwise return all users
        if(srcVal.length){
            setFilteredUsers(userArray.filter(user => user.name.toLowerCase().startsWith(srcVal.toLowerCase())))
        } else{
            setFilteredUsers(userArray)
        }
        //if enter key pressed and inputted user !exist, create new user, assign user to task, and close menu
        if(e.keyCode === 13 && srcVal.length && !userArray.find(el => el.name.toLowerCase() === srcVal.toLowerCase())){
            dispatch(addNewUser(srcVal, modifyAssignee))
        }
    }

  return (
    <div className="assign-wrap">
        <div className="assign-circ" onClick={onMenuHandler}>{assignee && <span>{assignee.name[0]} <span className="assign-del" onClick={deleteAssignee}>x</span></span>}</div>
        {menu &&
        <div className="assign-menu">
            <input ref={srcRef} type="text" placeholder='Add User...' onKeyDown={srcNewUser}/>
            <ul>
                {filteredUsers.map(user => <li onClick={modifyAssigneeHandler} key={user.id} data-id={user.id}>{user.name}</li> )}
            </ul>
        </div>
        }   
    </div>
  )
}

export default ChangeAssignee