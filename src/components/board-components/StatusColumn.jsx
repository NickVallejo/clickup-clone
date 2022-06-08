import React, { useEffect } from 'react'
import AddTaskWidget from '../task-components/AddTaskWidget'
import TaskWidget from '../task-components/TaskWidget'
import { tasksActions, boardActions } from '../../store'
import { useSelector, useDispatch } from 'react-redux'

const StatusColumn = ({title, tasks, id}) => {

  return ( 
    <div className="status-column">
        <h1>{title}</h1>
        <ul>
            {tasks.map(task => <TaskWidget key={task.id} task={task} />)}
        </ul>
        {id === 1 && <AddTaskWidget />}
    </div>
  )
}

export default StatusColumn