import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-blue-500 py-4 text-gray-100 text-[18px] font-bold'>
      <div className='flex items-center justify-center px-4'>
        <h1>
          &copy;{currentYear} | ThankGod Andrew | WDD 430 | Updated: {new Date().toLocaleDateString()}
        </h1>
      </div>
    </footer>
  );
};

export default Footer;