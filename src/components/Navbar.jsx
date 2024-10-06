//using rafce keyword to create an arrow function after installing es7/react/redux extension
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="myContainer flex justify-between items-center px-4 py-5 h-14">

        <div className='logo font-bold text-2xl'>
         <span className='text-green-700'> &lt; </span>
            PassSaver
            <span className='text-green-700'> &gt; </span>
        </div>

      <ul className='flex flex-row gap-10  '>
      <NavLink className={(e)=>{return e.isActive ?"red":" "}} to="/"><li>Home</li></NavLink>
        <NavLink className={(e)=>{return e.isActive ?"red":" "}} to="/about"><li>About</li></NavLink>
        <NavLink className={(e)=>{return e.isActive ?"red":" "}} to="/Contact"><li>Contact</li></NavLink>
      </ul>
            <button>
              <a href="https://github.com/priya-a14" target="_blank"><img src="/github.svg" alt="" className='invert'/></a>
            </button>

      </div>
    </nav>
  )
}

export default Navbar
