import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col items-center w-full px-4 py-4 space-y-2'>
            <div className="logo font-bold text-white text-2xl text-center">
                <span className='text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex flex-wrap justify-center items-center text-center text-sm'>
                Created with 
                <img className='w-5 mx-2 inline-block' src="icons/heart.png" alt="heart" /> 
                by Priya
            </div>
        </div>
    )
}


export default Footer
