import React, { useState, useEffect } from 'react'

const Categories = ({ tasks, categories, filter, setFilter }) => {
  const [catStats, setCatStats] = useState([])

  useEffect(() => {
    setCatStats(getCatStats())
  }, [])
  useEffect(() => {
    setCatStats(getCatStats())
  }, [tasks])

  const getCatStats = () => {
    const stats = categories.map((cat, i) => {
      let complete = 0

      const count = tasks.filter((task) => {
        if (Number(task.category) === +i && task.completed === true) complete++
        return Number(task.category) === +i
      }).length

      let category = {
        name: cat.name,
        taskCount: count,
        completePer: count > 0 ? Math.floor((complete / count) * 100) : 0,
        color: cat.color,
      }

      return category
    })
    return stats
  }
  const completePer = (catI) => {
    let complete = 0
    const filtered = tasks.filter((task) => {
      if (Number(task.category) === +catI && task.completed === true) complete++
      return Number(task.category) === +catI
    })
    console.log(filtered)
    console.log(complete)
    return Math.floor((complete / filtered.length) * 100)
  }

  const handleFilter = (i) => {
    if (filter === i) return setFilter('')
    setFilter(i)
  }
  return (
    <section id="categories">
      <header className="text-primary tasks-header" onClick={() => getCatStats()}>
        Categories
      </header>

      <div className="categories">
        {catStats &&
          catStats.map((cat, i) => (
            <div
              className={`category ${filter === String(i) ? 'active' : ''}`}
              key={i}
              onClick={() => handleFilter(String(i))}
            >
              <div className="text-primary">{cat.taskCount} Tasks</div>
              <div className="category-text">{cat.name}</div>
              <div className="progress-bar">
                <div
                  className="progress-percent-purple"
                  style={{ backgroundColor: cat.color, width: cat.completePer + '%' }}
                ></div>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Categories
