export default function Loader() {
    return (
      <div className=' w-fit m-auto my-[9px] flex items-center justify-center mt-4 bg-white p-[10px]'>
        <div className='animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-8 w-8'></div>
        <p className='ml-2'>Loading...</p>
      </div>
    );
  }
  