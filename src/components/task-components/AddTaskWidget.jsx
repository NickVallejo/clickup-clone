import React, {useEffect, useRef, useState} from 'react'
import { tasksActions } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import Task from '../../helpers/TaskClass'
import ChangeAssignee from './ChangeAssignee'

const AddTaskWidget = () => {
  const titleRef = useRef()
  const textRef = useRef()
  const dispatch = useDispatch()
  const [assignee, setAssignee] = useState(false)
  const [assigneeId, setAssigneeId] = useState(false)
  const users = useSelector(state => state.users)

  useEffect(() => {
    assigneeId ? setAssignee(users[assigneeId]) : setAssignee(false)
  }, [assigneeId])

  const addTaskFromWidget = () => {
    if(titleRef.current.value){
      const task = new Task(1, titleRef.current.value, textRef.current.value, assignee)
      console.log('task being added', task)
      dispatch(tasksActions.addTask({task}))
      titleRef.current.value = ""
      textRef.current.value = ""
      setAssigneeId(false)
      setAssignee(false)
    } else titleRef.current.style.borderBottom = "1px solid red"
  }

  const typingTitle = () => {
    if(titleRef.current.style.borderBottom = "1px solid red") {
      titleRef.current.style.borderBottom = "none"
    }
  }

  const pickAssignee = (userId) => setAssigneeId(userId)

  return (
    <div className="add-task">
        <div className="add-task__row">
          <input onChange={typingTitle} ref={titleRef} type="text" placeholder="Add Title..." />
          <ChangeAssignee assignee={assignee} id={0} modifyAssignee={pickAssignee} />
        </div>
        <textarea ref={textRef} placeholder="Add Description..."></textarea>
        <button onClick={addTaskFromWidget}>Add +</button>
    </div>
  )
}

export default AddTaskWidget