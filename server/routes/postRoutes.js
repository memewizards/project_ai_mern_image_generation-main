import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // You can customize the destination

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(upload.array("photo"), async (req, res) => {
  try {
    const {
      name,
      prompt,
      negativePrompt,
      cfg_scale,
      width,
      height,
      samplingMethod,
      steps,
      checkpoint,
      seed,
    } = req.body;
    const files = req.files;

    // Loop through each file and upload to Cloudinary
    const photoUrlsPromises = files.map(async (file) => {
      const { path } = file;
      const photoUrl = await cloudinary.uploader.upload(path);
      return photoUrl.url;
    });

    const photoUrls = await Promise.all(photoUrlsPromises);

    const newPost = await Post.create({
      name,
      prompt,
      negativePrompt,
      cfg_scale,
      width,
      height,
      samplingMethod,
      steps,
      checkpoint,
      seed,
      photoUrls, // Store the array of URLs
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

export default router;
