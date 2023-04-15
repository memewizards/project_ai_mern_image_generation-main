import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import useCustomer from "../hooks/useCustomer";
import fs from 'fs';
import path from 'path';
import { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";


  const ImageGenerator = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn, tokenBalance } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    negativePrompt: '',
    photo: '',
    selectedckpt: '',
    width: 256,
    height: 256,
    steps: 10,
    seed: -1,
    cfg_scale: 3.0,
    batch_size: 4,
    sampling_index: '',
  });


  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  
const base64ToBlob = (base64) => {
  const base64Data = base64.replace(/^data:image\/(png|jpg);base64,/, '');
  const binary = atob(base64Data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: 'image/png' });
};

const downloadAllImages = async () => {
  if (form.photo && form.photo.length > 0) {
    const zip = new JSZip();

    const imagePromises = form.photo.map(async (url, index) => {
      const response = await fetch(url);
      const blob = await response.blob();
      zip.file(`image_${index + 1}.png`, blob);
    });

    await Promise.all(imagePromises);

    const zipFile = await zip.generateAsync({ type: 'blob' });
    saveAs(zipFile, 'images.zip');
  } else {
    alert('No images to download');
  }
};

  const emitTokenBalanceUpdate = (newBalance) => {
    const event = new CustomEvent("tokenBalanceUpdate", { detail: newBalance });
    window.dispatchEvent(event);
  };


  
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });

  // Check if the user has selected a ckpt other than the initial option
  if (name === "selectedckpt" && value !== "") {
    setselectedckpt(value);
  }
};

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const handleSuggestedNegativePrompt = () => {
    const randomNegativePrompt = getRandomNegativePrompt(form.negativePrompt);
    setForm({ ...form, negativePrompt: randomNegativePrompt });
  };  

  const handleSamplingChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};

const [ckptOptions, setCkptOptions] = useState([
  { label: "chikmix_V2.safetensors", value: "gzcmggtugp8cn7" },
  { label: "clarity_19.safetensors", value: "d8k962xmyakcfu" },
  { label: "deliberate_v2.safetensors", value: "5pgx8i4olimo3w" }
]);

const [sampleOptions, setSamplerIndex] = useState([
  { label: "Euler a", value: "Euler a" },
  { label: "Euler", value: "Euler" },
  { label: "LMS", value: "LMS" },
  { label: "Heun", value: "Heun" },
  { label: "DPM2", value: "DPM2" },
  { label: "DPM2 a", value: "DPM2 a" },
  { label: "DPM++ 2S a", value: "DPM++ 2S a" },
  { label: "DPM++ 2M", value: "DPM++ 2M" },
  { label: "DPM++ SDE", value: "DPM++ SDE" },
  { label: "DPM fast", value: "DPM fast" },
  { label: "DPM adaptive", value: "DPM adaptive" },
  { label: "LMS Karras", value: "LMS Karras" },
  { label: "DPM2 Karras", value: "DPM2 Karras" },
  { label: "DPM2 a Karras", value: "DPM2 a Karras" },
  { label: "DPM++ 2S a Karras", value: "DPM++ 2S a Karras" },
  { label: "DPM++ 2M Karras", value: "DPM++ 2M Karras" },
  { label: "DPM++ SDE Karras", value: "DPM++ SDE Karras" },
  { label: "DDIM", value: "DDIM" },
  { label: "PLMS", value: "PLMS" }
]);

const handleSliderInput = (name, value) => {
  // do something with the name and value variables
  console.log(`Name: ${name}, Value: ${value}`);
};



const generateImage = async () => {

  // Check if the user is logged in using authToken
  const authToken = localStorage.getItem("authToken");

  const res = await fetch("http://localhost:8080/profile", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    credentials: "include",
  });

  if (res.status === 404) {
    console.log("User is not logged in");
    return;
  }

  if (form.prompt) {
    if (props.tokenBalance <= 0) { // Add this check for token balance
      alert("Low token balance. Get 10 free tokens by signing up, or buy more tokens.");
      return;
    }
    
    try {
      setGeneratingImg(true);

      const authToken = localStorage.getItem('authToken');
      console.log('Token from local storage:', authToken);

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      };

      console.log('Request headers:', headers);

      const response = await fetch('http://localhost:8080/api/v1/runpod', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          prompt: form.prompt,
          negative_prompt: form.negativePrompt,
          selectedckpt: form.selectedckpt,
          width: form.width,
          height: form.height,
          steps: form.steps,
          seed: form.seed,
          cfg_scale: form.cfg_scale,
          sampler_index: form.sampling_index,
          batch_size: form.batch_size,
        }),
      });
      const data = await response.json();

      console.log("the response is", data)

      if (data.error) {
  throw new Error(data.error);
}

// Check if there are any images in the response
if (data.images && data.images.length > 0) {
  // Create an array to hold the object URLs of all images
  const imageUrls = data.images.map((image) => {
    const blob = base64ToBlob(image);
    return URL.createObjectURL(blob);
  });

  // Update the form.photo state with the new array of image URLs
  setForm({ ...form, photo: imageUrls });

  // Emit the tokenBalanceUpdate event
  const actualTokensSubtracted = data.tokensSubtracted;
const newBalance = props.tokenBalance - actualTokensSubtracted;

if (newBalance < 0) {
  console.error('Unexpected negative token balance:', newBalance);
}

emitTokenBalanceUpdate(newBalance);
props.getTokenBalance();
} else {
  throw new Error('No images were generated.');
}


} catch (err) {
  console.log("caught an alert", (err))
  alert(err);
} finally {
  console.log("finally...:", setGeneratingImg)
  setGeneratingImg(false);
}
} else {
  alert('Please provide proper prompt');
}
};


  const SliderInput = ({ label, name, min, max, value, step, onChange }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(step, newValue);
  };
  
};



const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.prompt && form.photo) {
    setLoading(true);
    console.log(" submission handling has begun");
    try {
      // Loop through each image in the form.photo array
      for (const photoUrl of form.photo) {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("prompt", form.prompt);
        formData.append("negativePrompt", form.negativePrompt); // Add this line
        formData.append("checkpoint", form.selectedckpt); // Add this line
        formData.append("cfg_scale", form.cfg_scale);
        formData.append("width", form.width);
        formData.append("height", form.height);
        formData.append("samplingMethod", form.sampling_index);
        formData.append("steps", form.steps);
        formData.append("seed", form.seed);

        // Convert the blob URL back into a File object
        const blobResponse = await fetch(photoUrl);
        const fileBlob = await blobResponse.blob();
        const file = new File([fileBlob], "generated-image.png", { type: "image/png" });

        formData.append("photo", file);

        const postResponse = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          body: formData,
        });

        await postResponse.json();
      }

      alert("Success");
      navigate("/");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  } else {
    alert("Please generate an image with proper details");
  }
};





return (
  <section className="max-w-7xl mx-auto">
    <div>
      <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
      <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
        Generate an imaginative image through Stable Diffusion AI and share it with the community
      </p>
     </div>

  

  <form className="mt-16 max-w-3xl" onSubmit={handleSubmit} enctype="multipart/form-data">
  <div className="flex flex-col gap-5">
    <div>
      <label htmlFor="selectedckpt" className="text-gray-900 font-medium">
        Checkpoint
      </label>
    </div>
      <div className="relative">
        <select
          name="selectedckpt"
          value={form.selectedckpt}
          onChange={handleChange}
          className="appearance-none w-full bg-gray-50 border border-gray-300 text-gray-900 py-3 px-4 pr- rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        >
          <option value="">Select a ckpt</option>
          {ckptOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.29289 12.2929C9.65338 11.9324 10.2206 11.9047 10.6129 12.2097L10.7071 12.2929L14.7071 16.2929C15.0676 16.6534 15.0953 17.2206 14.7903 17.6129C14.4854 18.0052 13.9182 18.0329 13.5259 17.7279L13.4142 17.6172L10 14.2033L6.58579 17.6172C6.19526 18.0077 5.56216 18.0077 5.17163 17.6172C4.7811 17.2267 4.7811 16.5936 5.17163 16.2031L5.29289 16.1179L9.29289 12.2929ZM9.29289 7.70711C9.65338 8.06759 10.2206 8.09532 10.6129 7.79032L10.7071 7.70711L14.7071 3.70711C15.0676 3.34662 15.0953 2.77939 14.7903 2.3871C14.4854 1.99481 13.9182 1.96708 13.5259 2.27208L13.4142 2.38284L10 5.79669L6.58579 2.38284C6.19526 1.99231 5.56216 1.99231 5.17163 2.38284C4.7811 2.77337 4.7811 3.40647 5.17163 3.797L5.29289 3.88225L9.29289 7.70711Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
      </div>

      

<div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-full flex justify-center items-center flex-wrap">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
    {form.photo ? (
      form.photo.map((image, index) => (
        <div key={`image-container-${index}`}>
          <img
            key={`image-${index}`}
            src={image}
            alt={form.prompt}
            className="w-full h-auto object-contain"
          />
        </div>
      ))
    ) : (
      <img
        src={preview}
        alt="preview"
        className="w-9/12 h-9/12 object-contain opacity-40"
      />
    )}
  </div>

  {generatingImg && (
    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
      <Loader />
    </div>
  )}
</div>

      <FormField
        labelName="Your Name"
        type="text"
        name="name"
        placeholder="Ex., john doe"
        value={form.name}
        handleChange={handleChange}
      />

      <FormField
        labelName="Prompt"
        type="text"
        name="prompt"
        placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
        value={form.prompt}
        handleChange={handleChange}
        isSurpriseMe
        handleSurpriseMe={handleSurpriseMe}
      />

      <FormField
        labelName="Negative Prompt"
        type="text"
        name="negativePrompt"
        placeholder="(deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation"
        value={form.negativePrompt}
        handleChange={handleChange}
        isSuggestedNegativePrompt
        handleSuggestedNegativePrompt={handleSuggestedNegativePrompt}

            

      /> 

              <div className="flex flex-col gap-5">
      
      <label htmlFor="sampling_index" className="text-gray-900 font-medium">
        Sampling method
      </label>
      </div>
      <div className="relative">
        <select
          name="sampling_index"
          value={form.sampling_index}
          onChange={handleSamplingChange}
          className="appearance-none w-full bg-gray-50 border border-gray-300 text-gray-900 py-3 px-4 pr- rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        >
          <option value="">Select a sampler</option>
          {sampleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
            </select>
            </div>

         <SliderInput
     label="Steps"
     name="steps"
     min={1}
     max={75}
     value={form.steps}
     step={1}
     onChange={handleSliderInput}
   />
   
   <div className="flex flex-col">
     <label htmlFor="range">Steps</label>
     <div className="flex items-center">
       <input
         type="range"
         name="steps"
         id="range"
         min={1}
         max={75}
         value={form.steps}
         step={1}
         onChange={handleChange}
         className="w-full mr-4"
       />
       <input
         type="number"
         value={form.steps}
         onChange={handleChange}
         min={1}
         max={75}
         className="w-16"
       />
     </div>
   </div>
   <SliderInput
     label="width"
     name="width"
     min={0}
     max={1024}
     value={form.width}
     step={64}
     onChange={handleSliderInput}
   />
   
   <div className="flex flex-col">
     <label htmlFor="range">Width</label>
     <div className="flex items-center">
       <input
         type="range"
         name="width"
         id="range"
         min={64}
         max={1024}
         value={form.width}
         step={64}
         onChange={handleChange}
         className="w-full mr-4"
       />
       <input
         type="number"
         value={form.width}
         onChange={handleChange}
         min={64}
         max={1024}
         step={64}
         className="w-16"
       />
     </div>
   </div>
   <SliderInput
     label="Height"
     name="height"
     min={1}
     max={1024}
     value={form.height}
     step={64}
     onChange={handleSliderInput}
   />
   
   <div className="flex flex-col">
     <label htmlFor="range">Height</label>
     <div className="flex items-center">
       <input
         type="range"
         name="height"
         id="range"
         min={64}
         max={1024}
         value={form.height}
         step={64}
         onChange={handleChange}
         className="w-full mr-4"
       />
       <input
         type="number"
         value={form.height}
         onChange={handleChange}
         min={64}
         max={1024}
         step={64}
         className="w-16"
       />
     </div>
   </div>
   

   <SliderInput
     label="cfg_scale"
     name="cfg_scale"
     min={1}
     max={30}
     value={form.cfg_scale}
     step={1}
     onChange={handleSliderInput}
   />
   
   <div className="flex flex-col">
     <label htmlFor="range">cfg_scale</label>
     <div className="flex items-center">
       <input
         type="range"
         name="cfg_scale"
         id="range"
         min={1}
         max={30}
         value={form.cfg_scale}
         step={1}
         onChange={handleChange}
         className="w-full mr-4"
       />
       <input
         type="number"
         value={form.cfg_scale}
         onChange={handleChange}
         min={1}
         max={30}
         className="w-16"
       />
     </div>
   </div>
   <SliderInput
     label="batch_size"
     name="batch_size"
     min={1}
     max={30}
     value={form.batch_size}
     step={1}
     onChange={handleSliderInput}
   />
   
   <div className="flex flex-col">
     <label htmlFor="range">batch_size</label>
     <div className="flex items-center">
       <input
         type="range"
         name="batch_size"
         id="range"
         min={1}
         max={30}
         value={form.batch_size}
         step={1}
         onChange={handleChange}
         className="w-full mr-4"
       />
       <input
         type="number"
         value={form.batch_size}
         onChange={handleChange}
         min={1}
         max={30}
         className="w-16"
       />
     </div>
   </div>

            <button
  onClick={downloadAllImages}
  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
>
  Download All Images
</button>

          
        

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-orange-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">This will post your images to the home page</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ImageGenerator;
