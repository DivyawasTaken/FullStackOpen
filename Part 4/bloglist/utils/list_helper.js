
const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    const total = blogs.reduce((accum, current) => accum + current.likes, 0)
    if (blogs.length === 0) {
        return 0
    }
    return total
  }
  
  const favouriteBlog = (blogs) => {
    const blogwithMaxLikes = blogs.reduce((maxValue, current) => current.likes >= maxValue.likes ? current : maxValue)
    delete blogwithMaxLikes.id
    delete blogwithMaxLikes.url
    return blogwithMaxLikes

}


  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog

}