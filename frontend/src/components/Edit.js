import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState(null);
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState("");

    
    useEffect(() => {
        if (id) {
            const fetchUserDetails = async () => {
                
                    const response = await axios.get(`http://localhost:8000/users/user/${id}`);
                    const { name, phone, age, email } = response.data;
                    setName(name || "");
                    setPhone(phone || null);
                    setAge(age || null);
                    setEmail(email || "");
                
            };

            fetchUserDetails();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Enter Valid Email Address")
            return;  
        }

        const data = {
            name: name || undefined,  
            phone: phone || undefined,
            age: age || undefined,
            email: email || undefined,
        };

       
            if (id) {
                
                const response = await axios.put(`http://localhost:8000/users/${id}`, data);
                if (response.data.status === "ok") {
                    alert("User updated successfully");
                }
                navigate("/");
            }
        
    };

    return (
        <div>
            <h1>Edit user id: {id}</h1>
            <form className="mt-4 flex justify-center" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-4">
                        <div>
                            <label className="text-xl">Enter Name</label>
                        </div>
                        <div>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                type="text"
                                placeholder="Enter the name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div>
                            <label className="text-xl">Enter Email</label>
                        </div>
                        <div>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                type="text"
                                placeholder="Enter the email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div>
                            <label className="text-xl">Enter Mobile Number</label>
                        </div>
                        <div>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                type="number"
                                placeholder="9758XXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div>
                            <label className="text-xl">Enter Age</label>
                        </div>
                        <div>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                type="number"
                                placeholder="xx"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            type="submit"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Edit;
