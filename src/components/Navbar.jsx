import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white w-full'>
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-4 space-y-4 sm:space-y-0">
                
                {/* Logo */}
                <div className="logo font-bold text-2xl text-center sm:text-left">
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </div>

                {/* GitHub Button */}
                <button className='text-black bg-green-500 rounded-full flex items-center ring-white ring-1 px-4 py-1 hover:bg-green-400 transition'>
                    <img className='invert w-6 h-6 mr-2' src="/icons/github.svg" alt="github logo" />
                    <span className='font-bold'>GitHub</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar
