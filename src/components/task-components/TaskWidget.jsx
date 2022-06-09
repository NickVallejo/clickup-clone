import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { tasksActions, boardActions } from '../../store'
import ChangeAssignee from './ChangeAssignee'
import { dragDone } from './helper-funcs/board-funcs'

const TaskWidget = ({task}) => {
  const users = useSelector(state => state.users)
  const [hide, setHide] = useState(false)
  const dispatch = useDispatch()

  const removeTask = () => {
    dispatch(tasksActions.removeTask({task}))
  }

  const modifyAssignee = (userId) => {
    const data = {task, assignee: users[userId]}
    dispatch(tasksActions.changeTaskAssignee(data))
  }

  //when drag starting, create figment
  const dragStartHandler = (e) => {
    dispatch(boardActions.dragSetFrom({status: task.status, id: task.id}))
    dispatch(tasksActions.createFigment({task}))
    setTimeout(() => setHide(true), 10) 
  }

  const dragEndHandler = (e) => {
    setHide(false)
  }

  const dragOverHandler = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  //gives el of the target when enter drop zone (fires once)
  //add figment
  const dragEnterHandler = (e) => {
    dispatch(tasksActions.displayFigment({task}))
  }

  //gives el of the target when exiting drop zone (fires once)
  // remove figment
  const dragOutHandler = (e) => {
    console.log('LEAVING DRAG', task.id)
    dispatch(tasksActions.hideFigment())
  }

  const dragDropHandler = async (e) => {
    dispatch(boardActions.dragSetTo({status: task.status, id: task.id}))
    dispatch(tasksActions.hideFigment())
  }

  return (
    <div className={`task-widget ${hide && 'task-hide'}`} data-id={task.id} onDragEnd={dragEndHandler} onDragEnter={dragEnterHandler} onDragLeave={dragOutHandler} draggable onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDrop={dragDropHandler}>
      <div className="task-widget__left">
        <ChangeAssignee assignee={task.assignee} id={task.id} modifyAssignee={modifyAssignee} />
        <h5>{task.title}</h5>
      </div>
      <FontAwesomeIcon icon={faCoffee} onClick={removeTask} />
    </div>
  )
}

export default TaskWidget