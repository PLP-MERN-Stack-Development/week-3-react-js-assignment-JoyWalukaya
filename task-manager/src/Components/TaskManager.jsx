import { useState } from 'react'
import Button from './Button'
import Card from './Card'
import useLocalStorage from '../hooks/LocalStorage'

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [newTaskText, setNewTaskText] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
      }])
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEditing = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: editText } : task
    ))
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(newTaskText)
    setNewTaskText('')
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <Button type="submit" variant="primary">
            Add
          </Button>
        </div>
      </form>

      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks found
          </li>
        ) : (
          filteredTasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700">
              <div className="flex items-center gap-3 flex-grow">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => saveEdit(task.id)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                    className="flex-grow px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`flex-grow ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
                    onDoubleClick={() => startEditing(task)}
                  >
                    {task.text}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => startEditing(task)}
                  disabled={editingId === task.id}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {tasks.filter(t => !t.completed).length} tasks remaining
      </div>
    </Card>
  )
}

export default TaskManager