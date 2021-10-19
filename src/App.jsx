import { useState, useEffect } from 'react'

import Categories from './components/Categories'

import { FaPlus, FaTimes } from 'react-icons/fa'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'

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
  }
  const completeTask = (task) => {
    const completeTask = tasks.map((t) =>
      t.id === task.id ? { ...task, completed: !task.completed } : t
    )
    setTasks([...completeTask])
    localStorage.setItem('tasks', JSON.stringify([...completeTask]))
  }

  const deleteTask = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id)
    console.log(deleteTask)
    setTasks(deleteTask)
    localStorage.setItem('tasks', JSON.stringify([...deleteTask]))
  }
  const getCategoryName = (index) => {
    console.log(categoriesDefault[filter].name)
    return categoriesDefault[filter].name
  }

  return (
    <div className="App">
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
          />
        )}
        <Categories
          tasks={tasks}
          categories={categoriesDefault}
          filter={filter}
          setFilter={setFilter}
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
