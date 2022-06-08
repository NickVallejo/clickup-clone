import React from 'react'
import { useSelector } from 'react-redux'
import StatusColumn from './StatusColumn'

const Board = () => {
    const statuses = useSelector(state => state.statuses)
    const tasks = useSelector(state => state.tasks)
    const taskArray = Object.keys(tasks).map(key => tasks[key])

  return (
    <section className="app-board">
        <div className="app-board__wrap">
            {statuses.map(status => <StatusColumn 
            key={status.id} 
            id={status.id}
            title={status.title} 
            tasks={taskArray.filter(task => task.status == status.id)} 
            /> )}
        </div>
    </section>
  )
}

export default Board