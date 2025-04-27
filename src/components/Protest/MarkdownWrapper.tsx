'use client';

import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface Props {
  content: string;
}

const MarkdownWrapper = ({ content }: Props) => {
  return (
    <div className='shadow-md mx-auto rounded-md w-[90%] sm:w-[85%] min-w-[240px] flex items-center justify-center'>
      <MarkdownPreview
        source={content}
        style={{
          backgroundColor: 'white',
          color: 'black',
          width: '100%',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          fontSize: '	0.8rem',
        }}
        className='overflow-hidden md:text-base p-2 sm:w-[85%] text-zinc-600 '
      />
    </div>
  );
};

export default MarkdownWrapper;
