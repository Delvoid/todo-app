import React, { useState, useRef } from 'react'
import { FaRegCircle, FaCheckCircle, FaTimes } from 'react-icons/fa'

const Task = ({
  task,
  taskI,
  onDelete,
  onComplete,
  dragging,
  handleDragStart,
  handleDragEnter,
  getStyles,
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
            onClick={() => onDelete(task.id)}
          />
        ) : (
          <FaRegCircle
            style={{ color: 'purple', cursor: 'pointer', fontSize: '24px' }}
            onClick={() => onDelete(task.id)}
          />
        )}
      </div>
      <div className="task-text">{task.text}</div>
      <div className="task-delete">
        <div onClick={() => onDelete(task.id)} className="task-delete">
          <FaTimes style={{ color: 'red', cursor: 'pointer', fontSize: '24px' }} />
        </div>
      </div>
    </li>
  )
}

export default Task
