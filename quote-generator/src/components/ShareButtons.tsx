import React from 'react';
import { FaTwitter, FaFacebook, FaCopy, FaVolumeUp } from 'react-icons/fa';

export default function ShareButtons({ quoteContent, authorName }) {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteContent} - ${authorName}`;
  const isClient = typeof window !== 'undefined';

  let facebookShareUrl = '';
  if (isClient) {
    // Only access window object if running on the client-side
    facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
  }

  const copyToClipboard = () => {
    if (isClient) {
      navigator.clipboard.writeText(`${quoteContent} - ${authorName}`);
      // Visual feedback for successful copying
      alert('Quote copied to clipboard!');
    }
  };

  const speakQuote = () => {
    if (isClient) {
      const speech = new SpeechSynthesisUtterance(`${quoteContent} by ${authorName}`);
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className='mt-[20px] flex items-center'>
      {/* Social media share buttons with icons */}
      <a
        href={tweetUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-500 my-[0] mx-[5px] h-[47px] w-[47px] flex cursor-pointer
         items-center justify-center rounded-[50%] border-2 border-solid border-blue-500 hover:text-white hover:bg-blue-500'
      >
        <FaTwitter />
      </a>
      {isClient && (
        <a
          href={facebookShareUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-700 my-[0] mx-[5px] h-[47px] w-[47px] flex cursor-pointer
          items-center justify-center rounded-[50%] border-2 border-solid border-blue-700 hover:text-white hover:bg-blue-700'
        >
          <FaFacebook className='' />
        </a>
      )}

      {/* Copy quote button with icon */}
      <button
        onClick={copyToClipboard}
        className='text-gray-500 my-[0] mx-[5px] h-[47px] w-[47px] flex cursor-pointer
        items-center justify-center rounded-[50%] border-2 border-solid border-gray-500 hover:text-white hover:bg-gray-500'
      >
        <FaCopy className='' />
      </button>

      {/* Voice option button with icon */}
      <button
        onClick={speakQuote}
        className='text-purple-500 my-[0] mx-[5px] h-[47px] w-[47px] flex cursor-pointer
        items-center justify-center rounded-[50%] border-2 border-solid border-purple-500 hover:text-white hover:bg-purple-500'
      >
        <FaVolumeUp className='' />
      </button>
    </div>
  );
};
