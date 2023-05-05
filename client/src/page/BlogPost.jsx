import React from 'react';

const BlogPost = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-semibold mb-6">Welcome to Dream Brain AI!</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-gray-700 mb-4">
          Welcome to Dream Brain AI. your go-to destination for stunning AI-generated art. If you're a fan of AI art generation, you're in for a treat. Our platform offers an incredible collection of 400 high-quality images for only 10$ - that's half the price of a mid-journey.

With Stable Diffusion, you'll have access to dozens of checkpoints to help you create your perfect AI-generated image. And the best part? We don't have an NSFW filter, so you can let your creativity run wild.

Our platform is incredibly easy to use, even for beginners. You'll be generating beautiful AI art in no time. And once you've created your masterpiece, you can share it with our vibrant community of like-minded artists.

Join Dream Brain today and experience the thrill of creating stunning AI-generated art. Sign up now and start exploring our incredible collection of images! 

          
          <p className="text-gray-700 mb-4">
          -Big D       
          </p>
         

        </p>
        <p className="text-gray-700 mb-4">
          By generating images on this site you agree to the terms and conditions of creativeml-openrail-m.
        </p>

        <p className="text-2xl font-semibold mb-3">
          Features:

        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Create images up to 1024x1024</li>
          <li>Use any prompts you want</li>
          <li>Change sampling method, steps, cfg scale, batch and dimensions.</li>
          <li>2X more images for the same price as MidJourney</li>
          <li>Dozens of models and checkpoints to choose from.</li>
          <li>Restore face is on by default.</li>
          </ul>
        <p className="text-gray-700 mb-4">This site is currently in beta. In the next phase of development we will add the following features:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Custom User profile URLs.</li>
          <li>User profile image collections.</li>
          <li>Follow a user</li>
          <li>Homepage custom feed that shows images from users you follow.</li>
          <li>A homepage feed that shows trending images.</li>
          <li>A rating system for images.</li>
          <li>The ability to leave comments and replies on images.</li>
          <li>10 free weekly tokens</li>
          <li>New login options for non-google users.</li>
          <li>Profile customization options</li>
          <li>Generation info included in png file metadata </li>
          <li>NSFW filters and custom filters</li>
          <li>The ability to see which checkpoints are actively running for quicker job times at a lower token cost.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-3">FAQ:</h2>
        <dl className="text-gray-700">
          <dt className="font-semibold mb-1">Q: Is it free?</dt>
          <dd className="ml-4 mb-2">A: You get 10 free tokens when you sign up.</dd>
          <dt className="font-semibold mb-1">Q: What makes this app different from Midjourney or Dalle?</dt>
          <dd className="ml-4 mb-2">
            A: This app allows you to generate 200% more images for the same cost and gives you dozens of models to choose
            from.
          </dd>
          <dt className="font-semibold mb-1">Q: How to buy tokens?</dt>
          <dd className="ml-4 mb-2">A: You may purchase tokens via secure stripe checkout via the account page.</dd>
          <dt className="font-semibold mb-1">Q: Can I cancel my subscription?</dt>
          <dd className="ml-4 mb-2">
            A: you may cancel your subscription at any time. Press the "manage billing" button on your account page.
          </dd>
        </dl>
        <p className="text-2xl font-semibold mb-3">
          Known bugs:

        </p>
        <li>Large batches at a high resolution may fail. You won't be charged if that happens.  </li>
      </div>
    </div>
  );
};

export default BlogPost;
