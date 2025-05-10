import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copytext = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            theme: "dark"
        });
        navigator.clipboard.writeText(text);
    };

    const Showpassword = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            ref.current.src = "icons/eyecross.png";
        } else {
            passwordRef.current.type = "password";
            ref.current.src = "icons/eye.png";
        }
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedPasswords = [...passwordArray, newPassword];
            setpasswordArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            setform({ site: "", username: "", password: "" });
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
        if (confirm("Do you really want to delete this password..?")) {
            const updated = passwordArray.filter(item => item.id !== id);
            setpasswordArray(updated);
            localStorage.setItem("passwords", JSON.stringify(updated));
            toast('Password deleted', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark"
            });
        }
    };

    const editPassword = (id) => {
        const toEdit = passwordArray.find(i => i.id === id);
        setform(toEdit);
        setpasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="p-3 md:max-w-screen-lg mx-auto min-h-[88.2vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    <span className='text-white'>Pass</span>
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-2' type="text" name="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handlechange} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-2' type="text" name='username' />
                        <div className='relative w-full'>
                            <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-2' type="password" name='password' />
                            <span className='absolute right-2 top-[4px] cursor-pointer' onClick={Showpassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex items-center gap-2 bg-green-600 hover:bg-green-500 rounded-full px-6 py-2 border-2 border-white'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Save
                    </button>
                </div>

                {/* Passwords Table */}
                <div className="passwords overflow-x-auto">
                    <h2 className='font-bold text-xl text-white py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white'>No passwords to show</div>}
                    {passwordArray.length > 0 && (
                        <table className="min-w-full table-auto border-collapse rounded-md mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2 px-4 text-left'>Site</th>
                                    <th className='py-2 px-4 text-left'>Username</th>
                                    <th className='py-2 px-4 text-left'>Password</th>
                                    <th className='py-2 px-4 text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 px-4 border border-black'>
                                            <div className='flex items-center gap-2'>
                                                <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                <div className='cursor-pointer' onClick={() => copytext(item.site)}>
                                                    <lord-icon style={{ width: "25px", height: "25px" }} src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 px-4 border border-black'>
                                            <div className='flex items-center gap-2'>
                                                <span>{item.username}</span>
                                                <div className='cursor-pointer' onClick={() => copytext(item.username)}>
                                                    <lord-icon style={{ width: "25px", height: "25px" }} src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 px-4 border border-black'>
                                            <div className='flex items-center gap-2'>
                                                <span>{item.password}</span>
                                                <div className='cursor-pointer' onClick={() => copytext(item.password)}>
                                                    <lord-icon style={{ width: "25px", height: "25px" }} src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 px-4 border border-black'>
                                            <div className='flex gap-2 justify-center'>
                                                <span onClick={() => editPassword(item.id)} className='cursor-pointer'>
                                                    <lord-icon src="https://cdn.lordicon.com/exymduqj.json" trigger="hover" style={{ width: "25px", height: "25px" }} />
                                                </span>
                                                <span onClick={() => deletePassword(item.id)} className='cursor-pointer'>
                                                    <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: "25px", height: "25px" }} />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;