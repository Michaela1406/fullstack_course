// Exercise 4.3: Helper functions and Unit Tests, step 1

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

// Exercise 4.4: Helper functions and Unit Tests, step 2
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

// Exercise 4.5: Helper functions and Unit Tests, step 3
const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return favorite.likes > item.likes ? favorite : item
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}