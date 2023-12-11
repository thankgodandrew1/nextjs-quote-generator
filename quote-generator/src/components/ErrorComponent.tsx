import React from 'react';

const ErrorComponent = ({ error }) => {
  return (
    <div className='my-4 text-red-600 text-xl bg-white w-fit p-3 animate-pulse rounded-[10px] '>
      <p>{error}</p>
    </div>
  );
};

export default ErrorComponent;