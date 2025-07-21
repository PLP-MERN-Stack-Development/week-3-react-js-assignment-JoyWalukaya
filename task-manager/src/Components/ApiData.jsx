import { useState, useEffect } from 'react'
import { fetchPosts } from '../api/jsonPlaceholder'
import Button from './Button'
import Card from './Card'

const ApiData = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      const { data: posts, total } = await fetchPosts(page, 5, searchTerm)
      setData(posts)
      setTotalPages(Math.ceil(total / 5))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [page, searchTerm])

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">API Data</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setPage(1)
          }}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {loading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}

      {!loading && !error && (
        <>
          <ul className="space-y-4">
            {data.length === 0 ? (
              <li className="text-gray-500 dark:text-gray-400 text-center py-4">
                No posts found
              </li>
            ) : (
              data.map(post => (
                <li key={post.id} className="border-b dark:border-gray-700 pb-4">
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{post.body}</p>
                </li>
              ))
            )}
          </ul>

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="secondary"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-gray-500 dark:text-gray-400">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Card>
  )
}

export default ApiData