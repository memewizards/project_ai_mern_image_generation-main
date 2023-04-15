import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  negativePrompt: { type: String, required: true },
  checkpoint: { type: String, required: true },
  steps: { type: Number, required: true },
  samplingMethod: { type: String, required: true },
  cfg_scale: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  photoUrls: { type: [String], required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  seed: { type: Number, default: -0 },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
