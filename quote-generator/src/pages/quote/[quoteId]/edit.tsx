import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

interface Quote {
  _id: string;
  userId: string;
  content: string;
  categories: string[];
  tags: string[];
  author: string;
  createdAt: Date;
}

const EditQuote = () => {
  const { user } = useUser();
  const router = useRouter();
  const { quoteId } = router.query;
  const [quote, setQuote] = useState<Quote | null>(null);
  const [updatedQuote, setUpdatedQuote] = useState<Partial<Quote>>({
    content: '',
    categories: [],
    tags: [],
    author: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && quoteId) {
          // console.log('ID:', quoteId);
          const response = await fetch(`/api/quotes?quoteId=${quoteId}&userSub=${user.sub}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          if (!response.ok) {
            throw new Error(`Errors fetching quote: ${response.statusText}`)
          }
          const data = await response.json();
          // console.log('Fetched quote:', data);
          
          // Update only specific fields of updatedQuote using spread operator
          if (data && data.quote) {
            setQuote(data.quote);
            setUpdatedQuote({
              content: data.quote.content,
              categories: data.quote.categories,
              tags: data.quote.tags,
              author: data.quote.author,
            });
          };
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };
    fetchData();
  }, [user, quoteId]);

  const handleUpdate = async () => {
    try {
      if (!quoteId || !user) {
        console.error('Quote ID or user is undefined');
        return;
      }
  
      const res = await fetch(`/api/quotes?quoteId=${quoteId}&userSub=${user.sub}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: quoteId, ...updatedQuote }),
      });
  
      if (res.status === 200) {
        router.push('/quotes');
      } else {
        console.error('Failed to update quote');
      }
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedQuote({ ...updatedQuote, [name]: value });
  };

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const { value } = e.target;
    setUpdatedQuote({
      ...updatedQuote,
      [fieldName]: value.split(',').map((item: string) => item.trim()),
    });
  };

  if (quote === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-6">Edit Quote</h1>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Quote Content:</label>
          <input
            type="text"
            name="content"
            value={updatedQuote.content || ''}
            onChange={handleChange}
            className="border rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Categories:</label>
          <input
            type="text"
            name="categories"
            value={updatedQuote.categories?.join(', ') || ''}
            onChange={(e) => handleArrayChange(e, 'categories')}
            className="border rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Tags:</label>
          <input
            type="text"
            name="tags"
            value={updatedQuote.tags?.join(', ') || ''}
            onChange={(e) => handleArrayChange(e, 'tags')}
            className="border rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Author Name:</label>
          <input
            type="text"
            name="author"
            value={updatedQuote.author || ''}
            onChange={handleChange}
            className="border rounded-md px-4 py-2"
          />
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditQuote;