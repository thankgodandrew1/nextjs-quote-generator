import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import QuoteDisplay from '../components/QuoteDisplay';
import SearchByTags from '../components/SearchByTags';
import ShareButtons from '../components/ShareButtons';
import Loader from '../components/Loader';
import ErrorComponent from '../components/ErrorComponent';
import { useUser } from '@auth0/nextjs-auth0/client';


const Index = () => {
  const {user, isLoading, error} = useUser();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('')
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchRandomQuote = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Error fetching quote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);
  return (
    <Layout>
      {user ? (
      <main className='p-4 font-mono'>
        {errorMessage && <ErrorComponent error={errorMessage} />}
        {loading && <Loader />}
        <section className='flex items-center justify-center flex-col'>
          <QuoteDisplay
            quote={quote}
            author={author} 
            loading={loading} 
            onNewQuote={fetchRandomQuote}
          >
            <ShareButtons quoteContent={quote ? quote : 'Loading...'} authorName={author ? author : 'Unknown'} />
          </QuoteDisplay>
        </section>
        <section className='bg-blue-300 rounded-xl m-14 p-14'>
          <SearchByTags />
        </section>
      </main> ) : (
        <div
          className="font-mono h-screen bg-cover rounded-[15px] bg-center flex items-center justify-center text-center"
          style={{ backgroundImage: 'url("images/home-bg1.jpg")' }}
        >
          <div className="bg-gray-100 opacity-80 rounded-xl p-8 animate-pulse ">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Be Inspired</h2>
            <p className="mb-8 text-[18px] font-bold">
              Please log in to view inspirational quotes and enjoy personalized features!
            </p> 
            <a href="/api/auth/login" className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">Log In</a>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;