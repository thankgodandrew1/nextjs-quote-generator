import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from "@/components/Layout";
import QuoteDisplay from "@/components/QuoteDisplay";
import { useState } from 'react';
import ErrorComponent from '@/components/Error';
import Loader from '@/components/Loader';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const handleRandomQuote = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      setErrorMessage('Failed to fetch quotes');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <QuoteDisplay
        quote={quote}
        author={author}
        isLoading={isLoading}
        onNewQuote={handleRandomQuote}
    />
    {isLoading && <Loader />}
    </Layout>

    );
}