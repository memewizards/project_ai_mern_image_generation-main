import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

// Inside the router.post("/", async (req, res) => { ... });


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
    
    const checkStatus = async (jobId, userEmail, startTime = Date.now()) => {
      const statusEndpoint = `${status_endpoint_template}${jobId}`;
      try {
        const statusResponse = await fetch(statusEndpoint, { headers });
        const statusJson = await statusResponse.json();
        const status = statusJson.status;

        console.log(`[${status}]`);
        console.log(status_endpoint_template);
        console.log("Request Body:", JSON.stringify(input, null, 2));

        if (status === "COMPLETED") {
          const output = statusJson.output;
          const images = [];

          for (let i = 0; i < output.images.length; i++) {
            const imageString = output.images[i];
            images.push(imageString); // Add the base64 image data to the images array
          }

          res.json({ images }); // Send the images array back to the client

          const elapsedTime = (Date.now() - startTime) / 1000;
          const baseTokens = 0.1;
          const tokensToSubtract = baseTokens + elapsedTime * 0.1;

          try {
            const authToken = req.headers.authorization;

            await fetch(`http://localhost:8080/subtract-tokens-ijge23tGe`, {
              method: "POST",
              headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                email: userEmail,
                tokensToSubtract: tokensToSubtract,
              }),
            });

            console.log(`Tokens subtracted: ${tokensToSubtract}`);
          } catch (error) {
            console.error("Error while subtracting tokens:", error);
          }
        } else if (status === "FAILED") {
          res.send("The job failed. Tokens are returned to your balance."); // Return a message to the client if the job failed
        } else {
          setTimeout(() => checkStatus(jobId, userEmail, startTime), 1000);
        }
      } catch (error) {
        console.error("There was an error:", error);
        res.status(500).send(error.message);
      }
    };


try {
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

  const userEmail = req.user.email; // Get the user email from the request user object
  checkStatus(jobId, userEmail); // Pass the userEmail to the checkStatus function
} catch (error) {
  console.error(error);
  res.status(500).send(error.message);
}

} catch (error) { console.error(error); res.status(500).send(error.message); }  });

export default router;
