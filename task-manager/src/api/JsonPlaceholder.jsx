export const fetchPosts = async (page = 1, limit = 5, search = '') => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}&q=${search}`
  )
  if (!response.ok) throw new Error('Failed to fetch posts')
  return {
    data: await response.json(),
    total: parseInt(response.headers.get('x-total-count')) || 0
  }
}