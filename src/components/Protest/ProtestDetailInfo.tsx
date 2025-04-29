interface Props {
  name: string;
  info: string;
}

const ProtestDetailInfo = ({ name, info }: Props) => {
  return (
    <div className='w-full'>
      <p className='mx-auto w-[90%] sm:w-[85%] min-w-[240px] text-zinc-600 text-sm'>{name}</p>
      <p className='p-2 mx-auto rounded-md w-[90%] sm:w-[85%] min-w-[240px] bg-background-white shadow-md text-xs sm:text-sm'>
        <span>{info}</span>
      </p>
    </div>
  );
};

export default ProtestDetailInfo;
