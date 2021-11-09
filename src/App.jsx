import { useState, useEffect } from 'react'

import Toast from './components/Toast'
import Categories from './components/Categories'
import { FaPlus, FaTimes } from 'react-icons/fa'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import checkIcon from './images/check.svg'
import errorIcon from './images/error.svg'
import warningIcon from './images/warning.svg'
import infoIcon from './images/info.svg'

import './App.css'

const prioritiesDefault = [
  { name: 'High', color: '#FF0000' },
  { name: 'Medium', color: '#FFFF00' },
  { name: 'Low', color: '#00FF00' },
]
const categoriesDefault = [
  { name: 'Personal', color: '#b619dc' },
  { name: 'Work', color: '#2a70dc' },
]

function App() {
  const [toastList, setToastList] = useState([])
  const [tasks, setTasks] = useState([])
  const [showTaskCreate, setShowTaskCreate] = useState(false)
  const [filter, setFilter] = useState('')
  const [filteredTasks, setFilteredTasks] = useState([])

  useEffect(() => {
    const getTasks = () => {
      const tasks = fetchTasks()
      if (!tasks) return
      setTasks(tasks)
      setFilteredTasks(tasks)
    }
    getTasks()
  }, [])
  useEffect(() => {
    const filteredTasks = () => {
      if (!tasks) return
      if (!filter) return setFilteredTasks(tasks)
      const filtered = tasks.filter((task) => {
        return task.category === filter
      })
      setFilteredTasks(filtered)
    }
    filteredTasks()
  }, [filter, tasks])

  const fetchTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    return tasks
  }

  const addTask = (task) => {
    setTasks([...tasks, task])
    localStorage.setItem('tasks', JSON.stringify([...tasks, task]))
    showToast('success', 'Task has been added')
  }
  const completeTask = (task) => {
    const completeTask = tasks.map((t) =>
      t.id === task.id ? { ...task, completed: !task.completed } : t
    )
    setTasks([...completeTask])
    localStorage.setItem('tasks', JSON.stringify([...completeTask]))
    showToast('success', `Task ${task.completed ? 'updated' : 'complete'}`)
  }

  const deleteTask = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id)
    setTasks(deleteTask)
    localStorage.setItem('tasks', JSON.stringify([...deleteTask]))
    showToast('danger', 'Task deleten')
  }

  const showToast = (type, message) => {
    const id = Math.floor(Math.random() * 101 + 1)
    let toastProperties

    switch (type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Success',
          description: message || 'This is a success toast component',
          backgroundColor: '#5cb85c',
          icon: checkIcon,
        }
        break
      case 'danger':
        toastProperties = {
          id,
          title: 'Danger',
          description: message || 'This is a error toast component',
          backgroundColor: '#d9534f',
          icon: errorIcon,
        }
        break
      case 'info':
        toastProperties = {
          id,
          title: 'Info',
          description: message || 'This is an info toast component',
          backgroundColor: '#5bc0de',
          icon: infoIcon,
        }
        break
      case 'warning':
        toastProperties = {
          id,
          title: 'Warning',
          description: message || 'This is a warning toast component',
          backgroundColor: '#f0ad4e',
          icon: warningIcon,
        }
        break

      default:
        setToastList([])
    }

    setToastList([...toastList, toastProperties])
  }

  return (
    <div className="App">
      <Toast position="bottom-right" toastList={toastList} setToastList={setToastList} />
      <div className="container">
        <header className="header">
          <h1>Todo List</h1>
          {showTaskCreate ? (
            <div className="add-circle hide" onClick={() => setShowTaskCreate(!showTaskCreate)}>
              <FaTimes
                style={{
                  color: '#fff',
                  fontSize: '24px',
                  padding: '2px',
                }}
              />
            </div>
          ) : (
            <div className="add-circle" onClick={() => setShowTaskCreate(!showTaskCreate)}>
              <FaPlus
                style={{
                  color: '#fff',
                  fontSize: '24px',
                  padding: '2px',
                }}
              />
            </div>
          )}
        </header>

        {showTaskCreate && (
          <AddTask
            addTask={addTask}
            tasks={tasks}
            categoriesDefault={categoriesDefault}
            prioritiesDefault={prioritiesDefault}
            showToast={showToast}
          />
        )}
        <Categories
          tasks={tasks}
          categories={categoriesDefault}
          filter={filter}
          setFilter={setFilter}
          showToast={showToast}
        />

        <section id="tasks" className="tasks">
          {filteredTasks?.length > 0 ? (
            <Tasks
              tasks={filteredTasks}
              onDelete={deleteTask}
              onComplete={completeTask}
              setTasks={setTasks}
              setFilteredTasks={setFilteredTasks}
              categoriesDefault={categoriesDefault}
              prioritiesDefault={prioritiesDefault}
              filter={filter}
            />
          ) : (
            <div className="text-primary tasks-header">
              {showTaskCreate && setShowTaskCreate(false)}
              No {filter && categoriesDefault[filter].name} Tasks - Create one!
              <AddTask
                addTask={addTask}
                tasks={tasks}
                categoriesDefault={categoriesDefault}
                prioritiesDefault={prioritiesDefault}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
