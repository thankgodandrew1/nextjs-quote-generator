import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {

  const {user} = useUser();
  const [showDropdown, setShowDropDown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropDown(!showDropdown);
  };

  return (
    <header className="font-sans py-4 bg-blue-500 text-white text-center">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            width={40}
            height={40}
            src="/images/logo.png"
            alt="logo image"
            className="w-10 h-10 mr-2 ml-2 rounded shadow-2xl"
          />
          <h1 className="text-3xl font-bold">Be Inspired</h1>
        </div>
        {user ? (
          <div className="lg:flex items-center block">
            
            <Link className='mr-[20px] bg-blue-700 p-2 rounded-[8px] transition-colors duration-300 hover:bg-blue-600' href="/">Home
            </Link>
            <Link className='mr-[20px] bg-blue-700 p-2 rounded-[8px] transition-colors duration-300 hover:bg-blue-600' href="/quotes">Create Quotes
            </Link> 
            <span className="mr-2">Welcome, {user.name}</span>
            <div className="relative inline-block text-left">
              <button onClick={handleDropdownToggle} className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white focus:outline-none">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 6.293a1 1 0 011.414 0L10 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className={`${
                  showDropdown ? 'block' : 'hidden'
                } origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 
                ring-black ring-opacity-5 focus:outline-none font-semibold`}
              >
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    href="/api/auth/logout"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}