import React, { useState, useRef } from 'react'
import { FaRegCircle, FaCheckCircle, FaTrashAlt } from 'react-icons/fa'

const Task = ({
  task,
  taskI,
  onDelete,
  onComplete,
  dragging,
  handleDragStart,
  handleDragEnter,
  getStyles,
  priorities,
  categories,
}) => {
  const [deleting, setDeleting] = useState(false)
  return (
    <li
      draggable
      key={task}
      onDoubleClick={() => onComplete(task)}
      onDragStart={(e) => handleDragStart(e, { taskI })}
      onDragEnter={
        dragging
          ? (e) => {
              handleDragEnter(e, { taskI })
            }
          : null
      }
      className={`task dnd-item ${dragging ? getStyles({ taskI }) : ''} ${deleting ? 'fade' : ''}`}
    >
      <div className="task-complete ">
        {task.completed ? (
          <FaCheckCircle
            className="check"
            style={{
              fontSize: '24px',
            }}
            onClick={() => onComplete(task)}
          />
        ) : (
          <FaRegCircle
            style={{ color: categories[task.category].color, cursor: 'pointer', fontSize: '24px' }}
            onClick={() => onComplete(task)}
          />
        )}
      </div>
      <div className="task-text">{task.text}</div>
      <div className="task-delete">
        <div
          onClick={() => {
            setDeleting(true)
            setTimeout(() => onDelete(task.id), 200)
            // onDelete(task.id)
          }}
          className="task-delete"
        >
          <FaTrashAlt style={{ color: '#d8000c', cursor: 'pointer', fontSize: '18px' }} />
        </div>
      </div>
    </li>
  )
}

export default Task
