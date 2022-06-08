import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { tasksActions, boardActions } from '../../store'
import StatusColumn from './StatusColumn'

const Board = () => {
    const statuses = useSelector(state => state.statuses)
    const tasks = useSelector(state => state.tasks)
    const {from , to} = useSelector(state => state.board.drag)
    const dispatch = useDispatch()

    useEffect(() => console.log('FROM AND TO', from, to), [from, to])

    useEffect(() => {
      if(from && to) dispatch(tasksActions.moveTask({from, to}))
      
      dispatch(boardActions.dragSetFrom(false))
      dispatch(boardActions.dragSetTo(false))
    }, [to])

  return (
    <section className="app-board">
        <div className="app-board__wrap">
            {statuses.map(status => <StatusColumn 
            key={status.id} 
            id={status.id}
            title={status.title} 
            tasks={tasks[status.id]} 
            /> )}
        </div>
    </section>
  )
}

export default Board