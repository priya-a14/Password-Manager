import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])
    const copytext = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text)

    }

    const Showpassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)

        if (ref.current.src.includes("icons/eyecross.png")) {

            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"

        }
    }
    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedPasswords = [...passwordArray, newPassword];

            // Update state and localStorage
            setpasswordArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

            // Reset the form
            setform({ site: "", username: "", password: "" });

            // Notify the user
            toast("Password saved successfully!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        } else {
            toast.error("Please fill in all fields with at least 3 characters.", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };

    const deletePassword = (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete this password..?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            // console.log(...passwordArray, form)
            toast('password deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }

    }
    const editPassword = (id) => {
        console.log("editing password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition=" Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className=" p-3  md:mycontainer min-h-[88.2vh]">
                <h1 className=' text-4xl text font-bold text-center '>
                    <span className='text-green-700  '>&lt;</span>
                    <span className=' text-white'>Pass</span>
                    <span className='text-green-700 '>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>


                <div className='flex flex-col p-4 text-black gap-8 items-center '>

                    <input value={form.site} onChange={handlechange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handlechange} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className='relative  '>

                            <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />




                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={Showpassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-2 items-center w-fit bg-green-600 hover:bg-green-500 rounded-full px-8 py-2 w-fit border-2 border-white'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">

                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className=' font-bold text-xl text-white py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white'> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden  mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-black text-center  '>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => { copytext(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">

                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                    <td className='py-2  border border-black text-center '><span>{item.username}
                                    </span>
                                        <div className='flex  items-center justify-center'>
                                            <div className='size-7 cursor-pointer lordiconcopy' onClick={() => { copytext(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">

                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-black text-center '><span>{item.password}</span>
                                        <div className=' flex  items-center justify-center'>
                                            <div className='size-7 cursor-pointer lordiconcopy' onClick={() => { copytext(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">

                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' justify-center py-2 border border-black text-center '>
                                        <span className='cursor pointer mx-1 ' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>

                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}



                </div>

            </div >
        </>

    )
}

export default Manager
