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
    <div className="min-h-screen flex flex-col">
        <Head>
            <title>
                {siteTitle}
            </title>
        </Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};


