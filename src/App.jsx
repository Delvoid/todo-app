import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const getTasks = () => {
      const tasks = fetchTasks()
      if (!tasks) return
      setTasks(tasks)
    }
    getTasks()
  }, [])

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

  return (
    <div className="App">
      <div className="container">
        <header className="header">TODO</header>

        <AddTask
          addTask={addTask}
          tasks={tasks}
          categoriesDefault={categoriesDefault}
          prioritiesDefault={prioritiesDefault}
        />
        <section>
          <header className="text-primary tasks-header">Categories</header>
          <div className="categories">
            <div className="category">
              <div className="text-primary">40 Tasks</div>
              <div className="category-text">Personal</div>
              <div className="progress-bar">
                <div className="progress-percent-purple"></div>
              </div>
            </div>
            <div className="category">
              <div className="text-primary">10 Tasks</div>
              <div className="category-text">Work</div>
              <div className="progress-bar">
                <div className="progress-percent-blue"></div>
              </div>
            </div>
          </div>
        </section>
        <section className="tasks">
          {tasks && tasks.length > 0 ? (
            <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onComplete={completeTask}
              setTasks={setTasks}
              categoriesDefault={categoriesDefault}
              prioritiesDefault={prioritiesDefault}
            />
          ) : (
            'No Tasks'
          )}
        </section>
      </div>
    </div>
  )
}

export default App
