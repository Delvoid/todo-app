import { useState, useEffect } from 'react'

const AddTask = ({ addTask, tasks, prioritiesDefault, categoriesDefault }) => {
  const [categoriesList, setCategoriesList] = useState(categoriesDefault)
  const [prioritiesList, setPrioritiesList] = useState(prioritiesDefault)
  // FORM
  const [submited, setSubmited] = useState(false)
  const [text, setText] = useState('')
  const [category, setCategory] = useState('DEFAULT')
  const [categoryError, setCategoryError] = useState({})
  const [priority, setPriority] = useState('DEFAULT')
  const [priorityError, setPriorityError] = useState({})
  const [textError, setTextError] = useState({})

  useEffect(() => {
    setTextError(textError)
  }, [textError])

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmited(true)

    const isValid = formValidation()
    const task = {
      id: generateId(16),
      text,
      category,
      priority,
      completed: false,
      creadted_at: new Date(),
    }

    if (isValid) {
      addTask(task)
      setText('')
      setCategory('DEFAULT')
      setPriority('DEFAULT')
      setSubmited(false)
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

    let textValid = textValidation(text)
    let categoryValid = categoryValidation(category)
    let priorityValid = priorityValidation(priority)

    isValid = textValid && categoryValid && priorityValid

    return isValid
  }

  const textValidation = (text) => {
    let isValid = true
    const textError = {}
    if (text.trim().length < 3) {
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

  const categoryValidation = (select) => {
    let isValid = true
    const categoryError = {}
    if (select === 'DEFAULT') {
      categoryError.default = 'Please select a category'
      isValid = false
    }

    setCategoryError(categoryError)

    return isValid
  }
  const priorityValidation = (select) => {
    let isValid = true
    const priorityError = {}
    if (select === 'DEFAULT') {
      priorityError.default = 'Please select a priority'
      isValid = false
    }

    setPriorityError(priorityError)

    return isValid
  }
  return (
    <form className={`addTask slide-in`} onSubmit={onSubmit}>
      <div className="add-input gap20">
        <div className="form__group">
          <input
            type="text"
            placeholder="What are you planning?"
            className={`form__input ${Object.keys(textError).length > 0 ? 'error_input' : ''}`}
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              submited && textValidation(e.target.value)
            }}
          />
          {Object.keys(textError).map((key) => {
            return (
              <div className="error_text" key={textError[key]}>
                {textError[key]}
              </div>
            )
          })}
        </div>
        <div>
          <button className="add-button">Create</button>
        </div>
      </div>

      <div className="selects add-input gap20">
        <select
          name="categories"
          id="categories"
          className={`form__select ${Object.keys(categoryError).length > 0 ? 'error_input' : ''}`}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            submited && categoryValidation(e.target.value)
          }}
        >
          <option value="DEFAULT" disabled hidden>
            Choose category
          </option>
          {Object.keys(categoriesList).map((key, i) => {
            return (
              <option key={i} value={i}>
                {categoriesList[key].name}
              </option>
            )
          })}
        </select>
        <select
          name="priorities"
          id="priorities"
          className={`form__select ${Object.keys(priorityError).length > 0 ? 'error_input' : ''}`}
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value)
            submited && priorityValidation(e.target.value)
          }}
        >
          <option className="text-primary" value="DEFAULT" disabled hidden>
            Choose priority
          </option>

          {Object.keys(prioritiesList).map((key, i) => {
            return (
              <option key={i} value={i}>
                {prioritiesList[key].name}
              </option>
            )
          })}
        </select>
      </div>
      <div className="selectErrors">
        <div className="categoryError">
          {Object.keys(categoryError).map((key) => {
            return (
              <div className="error_text" key={categoryError[key]}>
                {categoryError[key]}
              </div>
            )
          })}
        </div>
        <div className="categoryError">
          {Object.keys(priorityError).map((key) => {
            return (
              <div className="error_text" key={priorityError[key]}>
                {priorityError[key]}
              </div>
            )
          })}
        </div>
      </div>
    </form>
  )
}

export default AddTask
