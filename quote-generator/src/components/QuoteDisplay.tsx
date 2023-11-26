import { useState } from 'react';

export default function QuoteDisplay({ quote, author, isLoading, onNewQuote }) {
  return (
    <div className="wrapper">
      <h1 className="text-2xl mb-4">Quote of the Day</h1>
      <div className="content text-center">
        <div className="quote-area flex items-center">
          <i className="fas fa-quote-left mr-2"></i>
          <p className="quote text-lg">{quote}</p>
          <i className="fas fa-quote-right ml-2"></i>
        </div>
        <div className="author mt-2">
          <span>__</span>
          <span className="name">{author}</span>
        </div>
      </div>
      <div className="buttons flex justify-center mt-4">
        <button
          onClick={onNewQuote}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          New Quote
        </button>
      </div>
      </div>
  );
};

