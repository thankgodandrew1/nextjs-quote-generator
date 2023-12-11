import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';
import Head from 'next/head';

interface LayoutProps {
    children: ReactNode;
}

export const siteTitle = 'Home | Be Inspired';

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black"  style={{ backgroundImage: 'url("images/home-bg1.jpg")',
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <Head>
            <title>
                {siteTitle}
            </title>
        </Head>
      <Header />
      <main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
      <Footer />
    </div>
  );
};


