import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost, ImageGenerator, UserLogin, Account } from './page';


const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
  <div>
    <Link to="/">
      <img src={logo} alt="logo" className="w-28 object-contain" />
    </Link>
  </div>

  <div className="flex space-x-4">
    <Link to="/ImageGenerator" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
    <Link to="/UserLogin" className="font-inter font-medium bg-[#00FF00] text-white px-4 py-2 rounded-md">Login</Link>
  </div>
  </header>

    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/ImageGenerator" element={<ImageGenerator />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/Account/:customerId" element={<Account />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
