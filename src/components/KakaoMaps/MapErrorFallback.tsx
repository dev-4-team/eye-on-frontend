export const MapErrorFallback = () => {
  return (
    <div className='flex flex-col h-[calc(100dvh-14vh)] items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg'>
      <div className='w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-10 h-10'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
          />
        </svg>
      </div>

      <div className='text-center'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2'>지도를 불러올 수 없습니다</h3>
        <p className='text-gray-500 max-w-md'>
          지도 서비스에 연결할 수 없습니다. 인터넷 연결을 확인하거나 잠시 후 다시 시도해주세요.
        </p>
      </div>

      <button
        onClick={() => window.location.reload()}
        className='mt-4 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-md flex items-center gap-2'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
          />
        </svg>
        다시 시도하기
      </button>
    </div>
  );
};
