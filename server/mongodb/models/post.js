import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photoUrls: { type: [String], required: true },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
