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
    res
      .status(500)
      .json({
        success: false,
        message: "Fetching posts failed, please try again",
      });
  }
});

router.route("/").post(upload.single("photo"), async (req, res) => {
  try {
    const { name, prompt } = req.body;
    const { path } = req.file;
    const photoUrl = await cloudinary.uploader.upload(path);

    const newPost = await Post.create({
      name,
      prompt,
      photoUrls: [photoUrl.url], // Store the URL as an array
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
