import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { tasksActions, boardActions } from '../../store'
import ChangeAssignee from './ChangeAssignee'
import { dragDone } from './helper-funcs/board-funcs'

const TaskWidget = ({task}) => {
  const users = useSelector(state => state.users)
  const {from , to} = useSelector(state => state.board.drag)
  const dispatch = useDispatch()

  useEffect(() => {
    if(from && to) dispatch(tasksActions.moveTask({from, to}))

    dispatch(boardActions.dragSetFrom(false))
    dispatch(boardActions.dragSetTo(false))
  }, [to])

  const removeTask = () => {
    dispatch(tasksActions.removeTask({id: task.id}))
  }

  const modifyAssignee = (userId) => {
    const data = {taskId: task.id, assignee: users[userId]}
    dispatch(tasksActions.changeTaskAssignee(data))
  }

  const dragStartHandler = (e) => {
    const data = e.target.closest('.task-widget').dataset.id
    dispatch(boardActions.dragSetFrom(data)) 
  }

  const dragOverHandler = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const dragDropHandler = async (e) => {
    const data = e.target.closest('.task-widget').dataset.id
    dispatch(boardActions.dragSetTo(data))
  }

  return (
    <div className='task-widget' data-id={task.id} draggable onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDrop={dragDropHandler}>
      <div className="task-widget__left">
        <ChangeAssignee assignee={task.assignee} id={task.id} modifyAssignee={modifyAssignee} />
        <h5>{task.title}</h5>
      </div>
      <FontAwesomeIcon icon={faCoffee} onClick={removeTask} />
    </div>
  )
}

export default TaskWidget