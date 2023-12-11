import { useState } from 'react';

export default function QuoteDisplay({ quote, author, loading, onNewQuote, children }) {
  return (
    <div className='w-[605px]  p-[40px] bg-white rounded-[20px] min-h-[50vh]'>
      <h1 className='text-4xl font-semibold text-center mb-4'>Quote of the Day</h1>
      <div className='text-center'>
        <div className='flex justify-center'>
          <p className='text-2xl text-center break-words'>&quot;{quote}&quot;</p>
        </div>
        <div className='mt-5 flex text-lg italic justify-end'>
          <span className='mt-[-7px] mr-[5px]'>__</span>
          <span className='name'> {author}</span>
        </div>
      </div>
      <div className='buttons flex  justify-between mt-4 border-t-2  border-solid border-t-[#ccc]'>
        {children}
        <button
          onClick={onNewQuote}
          className='px-[22px] py-[2px] text-[16px] bg-blue-500 border-none 
          text-white rounded-[30px] m-[10px] font-semibold hover:bg-blue-600 focus:outline-none'
        >
          New Quote
        </button>
      </div>
      </div>
  );
};

