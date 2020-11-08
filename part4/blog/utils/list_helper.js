const _ =require("lodash")

const dummy = (blogs) => {
  if (Array.isArray(blogs)) return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach((blog) => {
    total += blog.likes;
  });
  return total;
};

const favoriteBlog = (blogs) => {
  let idMax = 0,
    max = 0;
  blogs.forEach((blog) => {
    if (blog.likes >= max) {
      max = blog.likes;
      idMax = blog._id;
    }
  });

  const blog = blogs.find((blog) => blog._id === idMax);
  return { title: blog.title, author: blog.author, likes: blog.likes };
};

const mostBlogs  = (blogs) => {
  let numBlog=_(blogs).groupBy('author')
    .map((items, a)=>{
      return{ 
        author: a,
        blogs: _.map(items, 'authors').length
      }
  }).value()

  return _.maxBy(numBlog,'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
