'use client';

import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface MarkdownWrapperProps {
    content: string;
}

const MarkdownWrapper = ({ content }: MarkdownWrapperProps) => {
    return (
        <div className='px-2 py-2 shadow-md mx-auto rounded-md w-[85%] min-w-[240px] flex items-center justify-center'>
            <MarkdownPreview
                source={content}
                style={{ backgroundColor: 'white', color: 'black', fontSize: '12px', width: '90%' }}
            />
        </div>
    );
};

export default MarkdownWrapper;
