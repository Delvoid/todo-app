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
      className={dragging ? getStyles({ taskI }) : 'task dnd-item'}
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
        <div onClick={() => onDelete(task.id)} className="task-delete">
          <FaTrashAlt style={{ color: '#d8000c', cursor: 'pointer', fontSize: '18px' }} />
        </div>
      </div>
    </li>
  )
}

export default Task
