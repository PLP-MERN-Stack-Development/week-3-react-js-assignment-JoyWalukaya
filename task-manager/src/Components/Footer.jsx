const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Task Manager. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer