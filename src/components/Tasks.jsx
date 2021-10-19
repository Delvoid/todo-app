import React, { useState, useRef, useEffect } from 'react'

import Task from './Task'

const Tasks = ({
  tasks,
  onDelete,
  onComplete,
  setTasks,
  prioritiesDefault,
  categoriesDefault,
  setFilteredTasks,
  filter,
}) => {
  const [dragging, setDragging] = useState(false)
  const dragItem = useRef()
  const dragItemNode = useRef()

  useEffect(() => {
    setFilteredTasks(tasks)
  }, [tasks])

  const handleDragStart = (e, item) => {
    dragItemNode.current = e.target
    dragItemNode.current.addEventListener('dragend', handleDragEnd)
    dragItem.current = item

    setTimeout(() => {
      setDragging(true)
    }, 0)
  }
  const handleDragEnter = (e, targetItem) => {
    if (dragItemNode.current !== e.target) {
      setTasks((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList))
        newList.splice(targetItem.taskI, 0, newList.splice(dragItem.current.taskI, 1)[0])
        dragItem.current = targetItem
        localStorage.setItem('tasks', JSON.stringify(newList))

        return newList
      })
    }
  }

  const handleDragEnd = (e) => {
    setDragging(false)
    dragItem.current = null
    dragItemNode.current.removeEventListener('dragend', handleDragEnd)
    dragItemNode.current = null
  }
  const getStyles = (item) => {
    if (dragItem.current.taskI === item.taskI) {
      return 'task dnd-item current'
    }
    return 'task dnd-item'
  }

  return (
    <>
      <header className="text-primary tasks-header">
        Todays {filter && categoriesDefault[filter].name} Task's
      </header>
      <ul className="dnd">
        {tasks.map((task, i) => (
          <Task
            taskI={i}
            key={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
            id={task.id}
            dragging={dragging}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            getStyles={getStyles}
            priorities={prioritiesDefault}
            categories={categoriesDefault}
          />
        ))}
      </ul>
    </>
  )
}

export default Tasks
