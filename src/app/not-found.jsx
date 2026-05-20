import React from 'react';

const pageNotFound = () => {
    return (
        <div className='flex mx-auto'>
            <h1 className='text-4xl text-orange-500'>Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default pageNotFound;