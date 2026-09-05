import React, { useState } from 'react'
import TaskCard from './TaskCard'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'

function ColumnHeader({ title }) {
  return (
    <div className="column-header">
      <h2>{title}</h2>
    </div>
  )
}

export default function Column({ id, title, tasks, allTasks, addTask, updateTask, deleteTask, moveTask }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')

  const { setNodeRef } = useDroppable({ id: `${id}:0` })

  const handleAdd = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addTask(text.trim(), priority)
    setText('')
    setPriority('Medium')
  }

  return (
    <section className="column" ref={setNodeRef}>
      <ColumnHeader title={title} />

      <form className="add-form" onSubmit={handleAdd}>
        {id === 'todo' && (
          <>
            <input
              placeholder="Add new task..."
              value={text}
              onChange={e => setText(e.target.value)}
              aria-label={`Add task to ${title}`}
            />
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button type="submit">Add</button>
          </>
        )}
      </form>

      <div className="task-list">
        <SortableContext items={allTasks.map((t, i) => `${id}:${i}`)} strategy={verticalListSortingStrategy}>
          {allTasks.map((task, index) => (
            <TaskCard
              key={task.id}
              id={`${id}:${index}`}
              columnId={id}
              task={task}
              index={index}
              updateTask={updateTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
            />
          ))}
        </SortableContext>
      </div>
    </section>
  )
}
