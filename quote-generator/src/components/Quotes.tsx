import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

interface Quote {
  _id: string;
  userId: string;
  content: string;
  categories: string[];
  tags: string[];
  author: string;
  createdAt: Date;
}

const Quotes = () => {
  const { user } = useUser();
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuoteContent, setNewQuoteContent] = useState('');
  const [newQuoteCategories, setNewQuoteCategories] = useState('');
  const [newQuoteTags, setNewQuoteTags] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthorName] = useState('');

  const fetchQuotes = useCallback(async () => {
    if (user) {
      try {
        const res = await fetch(`/api/quotes?userSub=${user.sub}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (res.ok) {
          const data = await res.json();
          setQuotes(data.quotes);
        } else {
          console.error('Failed to fetch quotes');
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleCreate = async () => {
    if (!user) {
      console.error('User is not authenticated');
      return;
    }
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userSub: user.sub,
          content: newQuoteContent,
          categories: newQuoteCategories.split(',').map((category) => category.trim()),
          tags: newQuoteTags.split(',').map((tag) => tag.trim()),
          author: newQuoteAuthor,
          createdAt: new Date(),
        }),
      });

      if (res.status === 201) {
        await fetchQuotes();
        setNewQuoteContent('');
        setNewQuoteCategories('');
        setNewQuoteTags('');
        setNewQuoteAuthorName('');
      } else {
        console.error('Failed to create quote');
      }
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  const handleEdit = async (quote: Quote) => {
    router.push(`/quote/${quote._id}/edit`);
  };

  const handleDelete = async (quoteId: string) => {
    try {
      const res = await fetch(`/api/quotes/${quoteId}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        await fetchQuotes();
      } else {
        console.error('Failed to delete quote');
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-6">Quotes</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {quotes.map((quote) => (
          <div key={quote._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{quote.content}</h2>
            <p><strong>Categories:</strong> {quote.categories.join(', ')}</p>
            <p><strong>Tags:</strong>{quote.tags.join(', ')}</p>
            <p><strong>Author:</strong> {quote.author}</p>
            <button onClick={() => handleEdit(quote)}>Edit</button>
            <button onClick={() => handleDelete(quote._id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Quote</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Quote Content"
            value={newQuoteContent}
            onChange={(e) => setNewQuoteContent(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Categories (comma-separated)"
            value={newQuoteCategories}
            onChange={(e) => setNewQuoteCategories(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={newQuoteTags}
            onChange={(e) => setNewQuoteTags(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={newQuoteAuthor}
            onChange={(e) => setNewQuoteAuthorName(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleCreate}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Quotes;