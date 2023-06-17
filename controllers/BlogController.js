const { blogModel } = require("../models/blog.model");

const postBlogs = async (req, res) => {
  try {
    const blogs = new blogModel(req.body);
    await blogs.save();
    res.json({ message: "sucessfully added", blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogsByPage = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  try {
    const blogs = await blogModel.find().skip(skip).limit(limit);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findOneAndDelete({ _id: id });
    if (blog) {
      res.json({ message: "Blog deleted successfully" });
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

const searchBlogsByTitle = async (req, res) => {
  const title = req.query.title;

  try {
    const blogs = await blogModel.find({
      title: { $regex: title, $options: "i" },
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

module.exports = {
  getAllBlogs,
  postBlogs,
  getBlogsByPage,
  deleteBlog,
  searchBlogsByTitle,
};
