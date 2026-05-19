// Exercise 4.3: Helper functions and Unit Tests, step 1

const dummy = (blogs) => {
    return 1
  }

// Exercise 4.4: Helper functions and Unit Tests, step 2
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}