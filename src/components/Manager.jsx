import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    // Fetch saved passwords from the backend when the component mounts
    const fetchPasswords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/passwords');
        setPasswordArray(response.data.data || []); // Ensure we set to an empty array if no data is returned
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    fetchPasswords();
  }, []);

  const showPassword = () => {
    passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
    ref.current.src = ref.current.src.includes("/cross.png") ? "/eye.svg" : "/cross.png";
  };

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      try {
        const response = await axios.post('http://localhost:5000/api/passwords', form);
        setPasswordArray(prev => [...prev, { ...form, id: response.data.id }]); // Use the ID returned from the server
        setForm({ site: "", username: "", password: "" });
      } catch (error) {
        alert("Error saving password:", error);
      }
    } else {
      alert("Invalid data");
    }
  };

  const deletePassword = async (id) => {
    if (confirm("Do you really want to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/api/passwords/${id}`);
        setPasswordArray(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting password:", error);
      }
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(item => item.id === id);
    if (passwordToEdit) {
      setForm(passwordToEdit);
      setPasswordArray(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-violet-200 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]" />
      <div className="px-2 md:py-0 md:myContainer">
        <h1 className='text-4xl py-2 font-bold text-center'>
          <span className='text-green-700'> &lt; </span>
          PassSaver
          <span className='text-green-700'> &gt; </span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
        <div className='flex flex-col p-4 text-black gap-5 items-center'>
          <input value={form.site} onChange={handleChange} placeholder="Enter website URL" className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='site' id='site' />
          <div className="flex flex-col md:flex-row w-full justify-between gap-5">
            <input value={form.username} onChange={handleChange} placeholder="Enter Username" className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='username' id='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name='password' id='password' />
              <span className="absolute right-[3px] top-[3px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} className='p-1' width={26} src="/eye.svg" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center bg-green-200 rounded-full px-4 py-2 w-fit hover:bg-blue-200 font-bold gap-2'>
            <lord-icon src="https://cdn.lordicon.com/sbnjyzil.json" trigger="hover" />
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-xl py-3 font-serif text-blue-900'>Saved passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show 😓</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-blue-950 text-white'>
                <tr>
                  <th className='py-2'>Website</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-blue-100 font-medium'>
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className='border border-white py-2 text-center'>
                     {item.site}
                    </td>
                    <td className='border border-white py-2 text-center'>{item.username}</td>
                    <td className='border border-white py-2 text-center'>{item.password}</td>
                    <td className='border border-white py-2 text-center'>
                      <span className='flex justify-center items-center gap-2 cursor-pointer'>
                        <span onClick={() => editPassword(item.id)}>
                          <img src="/edit.svg" alt="Edit" />
                        </span>
                        <span onClick={() => deletePassword(item.id)}>
                          <img src="/delete.svg" alt="Delete" />
                        </span>
                      </span>
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
