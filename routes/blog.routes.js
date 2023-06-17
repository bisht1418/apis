const express = require("express");
const {
  getAllBlogs,
  postBlogs,
  getBlogsByPage,
  deleteBlog,
  searchBlogsByTitle,
} = require("../controllers/BlogController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const blogRoutes = express.Router();

blogRoutes.get("/blogs", authMiddleware, getAllBlogs);
blogRoutes.post("/blogs", authMiddleware, postBlogs);
blogRoutes.get("/blogs/search", authMiddleware, searchBlogsByTitle);
blogRoutes.delete("/blogs/:id", authMiddleware, deleteBlog);
blogRoutes.get("/blogs/page", authMiddleware, getBlogsByPage);

module.exports = { blogRoutes };
