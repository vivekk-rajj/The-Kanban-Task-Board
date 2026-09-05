import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function TaskCard({ id, columnId, task, index, updateTask, deleteTask, moveTask }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(task.text)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  const saveEdit = () => {
    const v = value.trim()
    if (!v) return
    updateTask(columnId, task.id, { text: v })
    setEditing(false)
  }

  return (
    <div ref={setNodeRef} className={`task-card priority-${task.priority.toLowerCase()}`} style={style} {...attributes} {...listeners}>
      <div className="task-top">
        <div className="task-text" onDoubleClick={() => { setEditing(true); setValue(task.text) }}>
          {editing ? (
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={e => e.key === 'Enter' && saveEdit()}
              autoFocus
            />
          ) : (
            <span>{task.text}</span>
          )}
        </div>
        <div className="task-actions">
          <button onClick={() => deleteTask(columnId, task.id)} aria-label="Delete">🗑️</button>
        </div>
      </div>

      <div className="task-bottom">
        <span className="priority">{task.priority}</span>
        <div className="move-buttons">
          {columnId !== 'todo' && <button onClick={() => moveTask(columnId, 'todo', task.id)}>← To Do</button>}
          {columnId !== 'inprogress' && <button onClick={() => moveTask(columnId, 'inprogress', task.id)}>→ In Progress</button>}
          {columnId !== 'done' && <button onClick={() => moveTask(columnId, 'done', task.id)}>✔ Done</button>}
        </div>
      </div>
    </div>
  )
}
