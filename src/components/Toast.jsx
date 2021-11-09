import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Toast = ({ toastList, setToastList, position }) => {
  const [list, setList] = useState(toastList)

  useEffect(() => {
    setList(toastList)
  }, [toastList, list])

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length && list.length) {
        deleteToast(toastList[0].id)
      }
    }, 10000)

    return () => {
      clearInterval(interval)
    }

    // eslint-disable-next-line
  }, [list])

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id)
    list.splice(listItemIndex, 1)
    setToastList([...list])
    setList([...list])
  }

  return (
    <>
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div className="notification-image">
              <img src={toast.icon} alt="" />
            </div>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  dismissTime: PropTypes.number,
}

export default Toast
