import React from 'react'

const About = () => {
  return (
    <>
    <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-violet-200 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"> </div>
    <div className="px-2 md:py-0 md:myContainer">
             <h1 className='text-4xl py-2 font-bold text-center'>
          <span className='text-green-700'> &lt; </span>
           App description
          <span className='text-green-700'> &gt; </span>
        </h1>
      <div className='my-10 font-medium'><div className='my-5'>The Password Manager is a secure web application designed to store and manage user credentials, including usernames, passwords, and website URLs. The platform allows users to safely store their passwords in a centralized database, ensuring both security and convenience. The key technologies used to build the platform include React, Tailwind CSS for the frontend, Node.js with Express.js for the backend, and MySQL for the database.</div>
      <div> <h1 className='font-bold text-3xl my-1'>Tech Stack</h1>
      <ul >
     <li> <b>Frontend :</b> React.js with Tailwind CSS for responsive and clean UI design.</li>
     <li> <b>Backend :</b> Node.js with Express.js for creating API endpoints and handling requests. </li>
     <li><b> Database :</b> MySQL for storing user credentials, encrypted passwords, and website details.</li>
      </ul>
      </div></div>  
    </div>
    </>
  )
}

export default About
