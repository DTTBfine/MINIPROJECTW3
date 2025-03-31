import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='relative min-h-screen bg-gradient-to-br from-blue-500  to-white w-full m-auto flex flex-col items-center justify-start'>
            <Outlet />
        </div>
    );
}

export default Home;