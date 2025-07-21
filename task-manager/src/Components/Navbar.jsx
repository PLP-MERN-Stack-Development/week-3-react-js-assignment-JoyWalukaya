import { Link } from 'react-router-dom'
import Button from './Button'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-8">
            <Link 
              to="/tasks" 
              className="flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Tasks
            </Link>
            <Link 
              to="/api-data" 
              className="flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
            >
              API Data
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <span className="text-yellow-300">☀️</span>
              ) : (
                <span className="text-gray-700">🌙</span>
              )}
            </button>
            <Button variant="secondary" size="sm">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar