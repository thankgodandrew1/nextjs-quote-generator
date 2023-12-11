import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SearchByTags = () => {
  const [tag, setTag] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false); 
  const quotesPerPage = 10;
  const  searchDivRef = useRef(null);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.quotable.io/quotes', {
        params: {
          tags: tag,
          author: authorName,
          limit: 550
        }
      });
      setSearchResults(response.data.results);
      setLoading(false);
      setSearchPerformed(true);
    } catch (error) {
      setError('Error fetching quotes. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tag || authorName) {
      fetchQuotes();
    }
  }, [tag, authorName, currentPage]);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // } )
  
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = searchResults.slice(indexOfFirstQuote, indexOfLastQuote);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (searchDivRef.current) {
      searchDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='my-4' ref={searchDivRef}>
      <h1 className='text-2xl text-center p-3 bg-white m-4 rounded-[10px]'>Search Quotes by Authors name (e.g. Blaise Pascal, Laozi, 
      John Locke, e.t.c.) or by Tags (e.g. Happiness, Famous Quotes, Life, e.t.c.)</h1>
      <p className='animate-pulse p-3 text-[18px]'>Ensure you get rid of the text in the tag box if you want to 
      search quotes based on a specific author, vice versa.</p>
      {/* Input fields for tag, author name */}
      <input
        type='text'
        placeholder='Enter tag name'
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className='border rounded-md p-2 mr-2'
      />
      <input
        type='text'
        placeholder='Enter author name'
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        className='border rounded-md p-2 mr-2'
      />
      
      {/* Search button */}
      <button onClick={() => {
        setCurrentPage(1);
        setSearchPerformed(false); // Reset searchPerformed when initiating a new search
      }} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {/* Display search results only if search is performed */}
      {searchPerformed && currentQuotes.length > 0 && (
        <div>
          {/* Display search results */}
          <h2 className='text-2xl font-bold mt-4'>Search Results:</h2>
          <ul>
            {currentQuotes.map((quote) => (
              <li className='bg-white p-5 m-3 rounded-[20px]' key={quote._id}>
                <p className='mb-3 text-lg'>&quot;{quote.content}&quot;</p>
                <p className='border-t-2 border-solid border-[#ccc] pt-3'>~ {quote.author}</p>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className='my-4'>
            <ul className='flex'>
              {[...Array(Math.ceil(searchResults.length / quotesPerPage)).keys()].map(
                (pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      onClick={() => handlePagination(pageNumber + 1)}
                      className={`px-3 py-1 mx-1 ${
                        pageNumber + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'
                      } rounded-md`}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchByTags;