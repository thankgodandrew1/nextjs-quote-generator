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

export default function Quotes() {
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
    // console.log('Deleting quote ID', quoteId)
    try {
      const shouldDelete = window.confirm('Are you sure you want to delete this quote?');

      if (shouldDelete) {
        if (!user) {
          console.error('User is not authenticated');
          return;
        }
  
        const res = await fetch(`/api/quotes?id=${quoteId}&userSub=${user.sub}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (res.status === 200) {
          await fetchQuotes();
        } else {
          console.error('Failed to delete quote');
        }
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="mt-8 bg-gradient-to-r from-blue-300 to-blue-400 p-6 rounded-[14px] m-3">
        <h2 className="text-2xl font-semibold mb-4">Create New Quote</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Quote Content"
            required
            value={newQuoteContent}
            onChange={(e) => setNewQuoteContent(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Categories (comma-separated)"
            required
            value={newQuoteCategories}
            onChange={(e) => setNewQuoteCategories(e.target.value)}
            className="border p-2 rounded"
          />
          <input 
            type="text"
            placeholder="Tags (comma-separated)"
            required
            value={newQuoteTags}
            onChange={(e) => setNewQuoteTags(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            required
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
      <h2 className="text-3xl font-semibold mb-6 p-3 text-center w-fit rounded-[10px] mt-[20px] bg-blue-200">{user? user.name : 'user'}&apos;s Quotes</h2>
    
    {quotes.length === 0 ? (
      <p>Hello {user ? user.name : 'user'}, you are yet to create a quote. Create one!</p>
    ) : (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {quotes.map((quote) => (
          <div key={quote._id} className="border shadow-lg p-4 rounded-[7px] bg-gradient-to-r from-blue-400 to-blue-500">
            <h2 className="text-xl font-semibold mb-2">&quot;{quote.content}&quot;</h2>
            <p><strong>Categories:</strong> {quote.categories.join(', ')}</p>
            <p><strong>Tags:</strong> {quote.tags.join(', ')}</p>
            <p><strong>Author:</strong> {quote.author}</p>
            <button onClick={() => handleEdit(quote)} className='bg-blue-500 relative w-[80px] font-semibold hover:bg-blue-600 text-white px-4 py-2 rounded'>Edit</button>
            <button onClick={() => handleDelete(quote._id)} className="bg-red-500 w-[80px] ml-3 font-semibold absolute hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
          </div>
        ))}
      </div>
    )}
    </div>
  );
};
