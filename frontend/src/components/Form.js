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

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(phone)) {
            toast.error('Enter valid phone number' , toastOptions);
            return;
        }



        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter Valid Email Address" , toastOptions)
            return;
        }


        const data = {
            name,
            phone,
            age,
            email,
        };

        try {
            const response = await axios.post('http://localhost:8000/users', data);

            if (response.data.status === 'ok') {
                console.log('User details saved:', response.data.user);
                navigate('/')
            } else {
                console.log('Error saving user details');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };



    return (
        <>

            <div className=' mt-3 mb-3 flex font-extrabold justify-center text-4xl'>Add User</div>
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

                    <div className='flex justify-center'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Submit</button>
                    </div>
                </div>
                
            </form>

            <ToastContainer/>
        </>
    );
}

export default From;
