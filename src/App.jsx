import { useState, useEffect } from 'react'

import Tasks from './components/Tasks'

import './App.css'
const defaultData = [
  { title: 'group 1', items: ['1', '2', '3'] },
  { title: 'group 2', items: ['4', '5'] },
]

function App() {
  const [tasks, setTasks] = useState([])
  const [data, setData] = useState()
  useEffect(() => {
    if (localStorage.getItem('List')) {
      console.log(localStorage.getItem('List'))
      setData(JSON.parse(localStorage.getItem('List')))
    } else {
      setData(defaultData)
    }
  }, [setData])

  // FORM
  const [submited, setSubmited] = useState(false)
  const [text, setText] = useState('')
  const [textError, setTextError] = useState({})

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
    setText('')
    setSubmited(false)
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
  const onSubmit = (e) => {
    e.preventDefault()
    setSubmited(true)

    const isValid = formValidation()
    const task = {
      id: generateId(16),
      text,
      completed: false,
      creadted_at: new Date(),
    }
    if (isValid) {
      addTask(task)
    }
  }

  const generateId = () => {
    return tasks.length + randomString(16)
  }

  const randomString = (length) => {
    return [...Array(length)].map((i) => (Math.random() * 36).toString(36)).join('')
  }

  const formValidation = () => {
    let isValid = true

    isValid = textValidation(text)

    return isValid
  }

  const textValidation = (text) => {
    let isValid = true
    const textError = {}
    if (text.trim().length < 5) {
      textError.textShort = 'Text is too short'
      isValid = false
    }
    if (text.trim().length > 60) {
      textError.textShort = 'Text is too long'
      isValid = false
    }

    setTextError(textError)

    return isValid
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">TODO</header>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Task</label>
            <input
              type="text"
              placeholder="Add Text"
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                submited && textValidation(e.target.value)
              }}
            />
          </div>

          {Object.keys(textError).map((key) => {
            return <div key={textError[key]}>{textError[key]}</div>
          })}
          <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
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
