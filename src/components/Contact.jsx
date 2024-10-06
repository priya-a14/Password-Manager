import React from 'react'

const Contact = () => {
  return (
       <>
         <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-violet-200 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"> </div>
         <div className="px-2 md:py-0 md:myContainer">
             <h1 className='text-4xl py-2 font-bold text-center'>
          <span className='text-green-700'> &lt; </span>
           Contact us 
          <span className='text-green-700'> &gt; </span>
        </h1>
        <p className='text-green-900 text-lg text-center'>We're here to solve your queries</p>
        <table className=" my-20 table-auto w-full rounded-md overflow-hidden mb-10 ">
  <thead className='bg-blue-950 text-white'>
    <tr className>
      <th colSpan={3} className='py-2 text-2xl'>Contact details</th>
    </tr>
  </thead>
  <tbody className='bg-blue-100'>
    <tr>
      <th className='border border-white py-2 text-center text-xl font-mono'>Phone number </th>
      <td className='border border-white py-2 text-center font-mono'> 8129xxxxxx</td>
     </tr>
    <tr>
      <th className='border border-white py-2 text-center text-xl font-mono'>Email-ID</th>
      <td className='border border-white py-2 text-center font-mono'><a href="https://mail.google.com">priya782525@gmail.com</a></td>
    </tr>
    <tr>
      <th className='border border-white py-2 text-center text-xl font-mono'>Linked-ID</th>
      <td className='border border-white py-2 text-center font-mono'><a href="https://www.linkedin.com/in/priya-7a5246299/">Priya.</a></td>
    </tr>
  </tbody>
</table>
        </div>
    </>
  )
}

export default Contact
