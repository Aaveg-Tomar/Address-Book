import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const From = () => {

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken')

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(phone)) {
            toast.error('Enter valid phone number', toastOptions);
            return;
        }



        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter Valid Email Address", toastOptions)
            return;
        }


        const data = {
            name,
            phone,
            age,
            email,
            addresses : [address],
            password,
        };

        try {
            const response = await axios.post('http://localhost:8000/users', data , {
                headers : {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.data.status === 'ok') {
                toast.success('User details saved:', toastOptions);

                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                console.log('Error saving user details');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/');
    }



    return (
        <>

            <div className=' mt-3 mb-3 flex font-extrabold justify-center text-4xl'>Add User</div>
            <button className="rounded-md bg-blue-600 py-2 px-4 mr-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleLogOut()}>Log Out</button>
            <form className=' mt-4  flex justify-center' onSubmit={handleSubmit}>
                <div>
                    <div className=' mb-4'>
                        <div>
                            <label className=' text-xl'>Enter Name</label>
                        </div>
                        <div>
                            <input className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                                type="text"
                                placeholder="Enter the name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className=' mb-4'>
                        <div ><label className=' text-xl'>Enter Email</label></div>
                        <div>
                            <input className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                                type="text"
                                placeholder="Enter the email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className=' mb-4'>
                        <div  ><label className=' text-xl'>Enter Mobile Number</label></div>
                        <div>
                            <input className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                                type="number"
                                placeholder="9758XXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className=' mb-4'>
                        <div><label className=' text-xl'>Enter Age</label></div>
                        <div>
                            <input className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                                type="number"
                                placeholder="xx"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                            />
                        </div>

                    </div>

                    <div className=' mb-4'>
                        <div><label className=' text-xl'>Enter Password</label></div>
                        <div>
                            <input className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className='mb-4'>
                        <div>
                            <label className='text-xl'>Enter Address</label>
                        </div>
                        <div>
                            <textarea
                                className="h-20 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Submit</button>
                    </div>
                </div>

            </form>

            <ToastContainer />
        </>
    );
}

export default From;
