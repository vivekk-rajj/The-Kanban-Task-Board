import React from 'react'
import Column from './Column'
import { DndContext } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core'

export default function Board({ columns, addTask, updateTask, deleteTask, moveTask, replaceColumns, query }) {
  const sensors = useSensors(useSensor(PointerSensor))

  // Filtered view based on query
  const filter = (tasks) => {
    if (!query) return tasks
    const q = query.toLowerCase()
    return tasks.filter(t => t.text.toLowerCase().includes(q))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return
    const [fromColId, fromIndexStr] = active.id.split(':')
    const [toColId, toIndexStr] = over.id.split(':')
    if (!fromColId || !toColId) return

    const fromIndex = parseInt(fromIndexStr, 10)
    const toIndex = parseInt(toIndexStr, 10)

    if (fromColId === toColId) {
      // reorder within same column
      const next = { ...columns }
      next[fromColId] = arrayMove(next[fromColId], fromIndex, toIndex)
      replaceColumns(next)
    } else {
      // move between columns
      const task = columns[fromColId][fromIndex]
      if (!task) return
      const next = { ...columns }
      next[fromColId] = next[fromColId].filter((_, i) => i !== fromIndex)
      next[toColId] = [task, ...next[toColId]]
      replaceColumns(next)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="board">
        <SortableContext items={[] /* we handle sorting by ids per-column in Column */} strategy={verticalListSortingStrategy}>
          <Column
            id="todo"
            title="To Do"
            tasks={filter(columns.todo)}
            allTasks={columns.todo}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
          />
          <Column
            id="inprogress"
            title="In Progress"
            tasks={filter(columns.inprogress)}
            allTasks={columns.inprogress}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
          />
          <Column
            id="done"
            title="Done"
            tasks={filter(columns.done)}
            allTasks={columns.done}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
          />
        </SortableContext>
      </div>
    </DndContext>
  )
}
