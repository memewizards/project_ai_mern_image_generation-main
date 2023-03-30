import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
import { EventEmitter } from "events";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const selectedckpt = req.body.selectedckpt;
    const run_endpoint = `https://api.runpod.ai/v1/${selectedckpt}/run/`;
    const status_endpoint_template = `https://api.runpod.ai/v1/${selectedckpt}/status/`;

    // Get prompt and negative_prompt from the request
    const { prompt, negative_prompt } = req.body;

    const input = {
      input: {
        prompt: prompt.trim(),
        negative_prompt: negative_prompt.trim(),
        steps: parseInt(req.body.steps) || 12,
        width: parseInt(req.body.width) || 312,
        height: parseInt(req.body.height) || 512,
        restore_faces: true,
        cfg_scale: parseInt(req.body.cfg_scale) || 5,
        seed: parseInt(req.body.seed),
        sampler_index: req.body.sampler_index,
        batch_size: req.body.batch_size,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
    };

    const checkStatus = async (jobId) => {
      const statusEndpoint = `${status_endpoint_template}${jobId}`;
      try {
        const statusResponse = await fetch(statusEndpoint, { headers });
        const statusJson = await statusResponse.json();
        const status = statusJson.status;

        console.log(`[${status}]`);
        console.log(status_endpoint_template)
        console.log("Request Body:", JSON.stringify(input, null, 2));

        //the line below is the full response from the API
        //console.log(`[${status}] ${JSON.stringify(statusJson, null, 4)}`);

        if (status === "COMPLETED") {
          const output = statusJson.output;
          const images = [];

          for (let i = 0; i < output.images.length; i++) {
            const imageString = output.images[i];
            images.push(imageString); // Add the base64 image data to the images array
          }

          res.json({ images }); // Send the images array back to the client
          // console.log("what was sent to the client:");
          //console.log({ images });
        } else {
          setTimeout(() => checkStatus(jobId), 1000);
        }
      } catch (error) {
        console.error("There was an error:", error);
        res.status(500).send(error.message);
      }
    };

    const response = await fetch(run_endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(input),
    });

    const responseData = await response.json();
    const jobId = responseData.id;

    if (!jobId) {
      throw new Error("Job ID not found");
    }

    checkStatus(jobId);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export default router;
