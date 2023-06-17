const { Schema, model } = require("mongoose");
const blogSchema = new Schema({
  username: String,
  title: String,
  content: String,
  category: String,
  id: String,
});

const blogModel = model("Blog", blogSchema);

module.exports = { blogModel };
