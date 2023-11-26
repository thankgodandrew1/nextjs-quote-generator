import Image from 'next/image'
export default function Header() {
    return (
        <header className="py-4 bg-blue-500 text-white text-center">
          <div className="flex items-center justify-center">
            <Image width={10} height={100} src="/images/logo.png" alt="logo image" className=" mr-2 w-14" />
            <h1 className="text-3xl font-bold">Be Inspired</h1>
          </div>
        </header>
      );
    
}