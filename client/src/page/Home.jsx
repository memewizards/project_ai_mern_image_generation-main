import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef, useCallback } from 'react';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post, index) => <Card key={post._id || index} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('latest');

const loadMoreRef = useRef();

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const [showWarning, setShowWarning] = useState(true);

 const fetchPosts = async (skip = 0) => {
  setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/v1/post?skip=${skip}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (skip === 0) {
          setAllPosts(result.data.reverse());
        } else {
          setAllPosts((prevPosts) => [...prevPosts, ...result.data.reverse()]);
        }
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      fetchPosts();
    }, []);

    
    
    useEffect(() => {
  const sortedPosts = sortPosts(allPosts);
  setAllPosts(sortedPosts);
}, [sortBy]);

    const handleSortChange = (e) => {
  setSortBy(e.target.value);
};

const sortPosts = (posts) => {
  if (!Array.isArray(posts)) {
    return [];
  }

  if (sortBy === 'highest-rated') {
    return [...posts].sort((a, b) => b.upvotes - a.upvotes);
  } else if (sortBy === 'latest') {
    return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return posts;
};
    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);

      setSearchTimeout(
        setTimeout(() => {
          const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
          setSearchedResults(searchResult);
        }, 500),
      );
    };

    const closeWarning = (redirectTo) => {
    setShowWarning(false);
    if (redirectTo) {
      history.push(redirectTo);
    }
  };

   // IntersectionObserver callback
 const observerCallback = useCallback(
  (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && allPosts) {
      fetchPosts(allPosts.length);
    }
  },
  [allPosts]
);

  // Set up IntersectionObserver on mount
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { threshold: 1.0 });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [observerCallback]);


   return (
    <>
      {showWarning && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md text-center">
            <p className="text-xl font-bold mb-4">WARNING: This page is currently unmoderated and may contain NSFW content. </p>
            <p className="text-xl font-bold mb-4">Are you at least 18 years old?</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowWarning(false)}>Yes</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate('/blog')}>No</button>
            </div>
          </div>
        </div>
      )}

      <section className={`max-w-7xl mx-auto ${showWarning ? 'blur' : ''}`}>
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Welcome to Humble Diffusion</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Welcome to the community feed.</p>
        </div>

        <div className="mt-8">
  <label htmlFor="sort-by" className="block text-[#666e75] font-medium">Sort by</label>
  <select
    name="sort-by"
    id="sort-by"
    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#6469ff] focus:border-[#6469ff] sm:text-sm rounded-md"
    value={sortBy}
    onChange={handleSortChange}
  >
    <option value="latest">Latest</option>
    <option value="highest-rated">Highest Rated</option>
  </select>
</div>

        <div className="mt-16">
          <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchText ? searchedResults : allPosts}
                    title={searchText ? "No Search Results Found" : "No Posts Yet"}
                  />  
                ) : (
                  <RenderCards
                    data={allPosts}
                    title="No Posts Yet"
                  />
                )}
                {!searchText && <div ref={loadMoreRef} className="h-1 w-full"></div>}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
