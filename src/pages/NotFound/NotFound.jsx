import React from 'react';

const NotFound = () => {
    return (
        <div className='p-5 px-12 min-h-[100vh] flex justify-center items-center flex-col'>
            <h1 className="text-4xl font-bold text-center text-gray-800">Page Not Found</h1>
            <p className="text-lg text-center text-gray-600 mt-4">Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
