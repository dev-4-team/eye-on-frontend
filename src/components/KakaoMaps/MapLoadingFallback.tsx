const MapLoadingFallback = () => {
  return (
    <div className='flex h-[calc(100dvh-14vh)] items-center justify-center relative overflow-hidden bg-gray-100 rounded-lg'>
      <div className='relative z-10 bg-white rounded-full p-5 shadow-xl'>
        <div className='w-16 h-16 border-4 border-red-400 border-t-transparent rounded-full animate-spin'></div>
      </div>
      <div className='absolute bottom-8 left-0 right-0 text-center text-gray-600 font-medium'>
        지도 데이터를 불러오는 중입니다...
      </div>
    </div>
  );
};

export default MapLoadingFallback;
