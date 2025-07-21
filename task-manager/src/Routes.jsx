import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import TaskManager from './Components/TaskManager'
import ApiData from './Components/ApiData'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/tasks',
        element: <TaskManager />,
      },
      {
        path: '/api-data',
        element: <ApiData />,
      }
    ]
  }
])