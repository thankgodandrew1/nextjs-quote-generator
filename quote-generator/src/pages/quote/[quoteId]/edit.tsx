import { useState, useEffect, ChangeEvent } from 'react';
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

const EditQuote = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quote, setQuote] = useState<Quote | null>(null);
  const [updatedQuote, setUpdatedQuote] = useState<Partial<Quote>>({
    content: '',
    categories: [],
    tags: [],
    author: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/quotes/${id}`) 
        .then((res) => res.json())
        .then((data) => {
          setQuote(data.quote);
          setUpdatedQuote(data.quote);
        })
        .catch((error) => {
          console.error('Error fetching quote:', error);
        });
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuote),
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