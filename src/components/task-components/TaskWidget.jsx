import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { tasksActions, boardActions } from '../../store'
import ChangeAssignee from './ChangeAssignee'
import { dragDone } from './helper-funcs/board-funcs'

const TaskWidget = ({task}) => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const removeTask = () => {
    dispatch(tasksActions.removeTask({task}))
  }

  const modifyAssignee = (userId) => {
    const data = {task, assignee: users[userId]}
    dispatch(tasksActions.changeTaskAssignee(data))
  }

  const dragStartHandler = (e) => {
    console.log('DRAG', task.id)
    const data = e.target.closest('.task-widget').dataset.id
    dispatch(boardActions.dragSetFrom({status: task.status, id: task.id})) 
  }

  const dragOverHandler = (e) => {
    console.log('DRAGGING OVER', task.id)
    e.stopPropagation()
    e.preventDefault()
  }

  const dragOutHandler = (e) => {
    console.log('LEAVING DRAG', task.id)
  }

  const dragDropHandler = async (e) => {
    console.log('DROP', task.id)
    const data = e.target.closest('.task-widget').dataset.id
    dispatch(boardActions.dragSetTo({status: task.status, id: task.id}))
  }

  return (
    <div className='task-widget' data-id={task.id} onDragLeave={dragOutHandler} draggable onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDrop={dragDropHandler}>
      <div className="task-widget__left">
        <ChangeAssignee assignee={task.assignee} id={task.id} modifyAssignee={modifyAssignee} />
        <h5>{task.title}</h5>
      </div>
      <FontAwesomeIcon icon={faCoffee} onClick={removeTask} />
    </div>
  )
}

export default TaskWidget