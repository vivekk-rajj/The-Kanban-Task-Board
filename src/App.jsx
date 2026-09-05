import React, { useEffect, useState } from 'react'
import Board from './components/Board'

const STORAGE_KEY = 'kanban_board_v1'

const initialData = {
  todo: [],
  inprogress: [],
  done: []
}

export default function App() {
  const [columns, setColumns] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : initialData
    } catch (e) {
      console.error('Failed to load from localStorage', e)
      return initialData
    }
  })

  const [query, setQuery] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
    } catch (e) {
      console.error('Failed to save to localStorage', e)
    }
  }, [columns])

  const addTask = (text, priority) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2,9)}`
    const task = { id, text, priority }
    setColumns(prev => ({ ...prev, todo: [task, ...prev.todo] }))
  }

  const updateTask = (columnId, taskId, patch) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: prev[columnId].map(t => t.id === taskId ? { ...t, ...patch } : t)
    }))
  }

  const deleteTask = (columnId, taskId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: prev[columnId].filter(t => t.id !== taskId)
    }))
  }

  const moveTask = (fromCol, toCol, taskId, index = 0) => {
    setColumns(prev => {
      const task = prev[fromCol].find(t => t.id === taskId)
      if (!task) return prev
      return {
        ...prev,
        [fromCol]: prev[fromCol].filter(t => t.id !== taskId),
        [toCol]: [task, ...prev[toCol]]
      }
    })
  }

  const replaceColumns = (newCols) => setColumns(newCols)

  return (
    <div className="app">
      <header>
        <h1>The Kanban Task Board</h1>
        <div className="controls">
          <input
            aria-label="search"
            placeholder="Search tasks..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </header>
      <main>
        <Board
          columns={columns}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          replaceColumns={replaceColumns}
          query={query}
        />
      </main>
      <footer>
        <small>Built with React + Vite — state persisted in localStorage.</small>
      </footer>
    </div>
  )
}
