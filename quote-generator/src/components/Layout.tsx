import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black"  style={{ backgroundImage: 'url("images/home-bg1.jpg")',
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Header />
      <main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
      <Footer />
    </div>
  );
};


