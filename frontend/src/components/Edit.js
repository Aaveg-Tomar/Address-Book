import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const Edit = () => {

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState(null);
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState("");
    const [defaultAddress, setDefaultAddress] = useState("");

    useEffect(() => {
        if (id) {
            const fetchUserDetails = async () => {
                const response = await axios.get(`http://localhost:8000/users/user/${id}`);
                const { name, phone, age, email, addresses } = response.data;
                setName(name || "");
                setPhone(phone || null);
                setAge(age || null);
                setEmail(email || "");
                setAddresses(addresses || []);
                setDefaultAddress(addresses[0] || "");
            };

            fetchUserDetails();
        }
    }, [id]);

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

        const updatedAddresses = [...addresses];
        if (defaultAddress) {
            const index = updatedAddresses.indexOf(defaultAddress);
            if (index !== -1) {

                updatedAddresses.unshift(updatedAddresses.splice(index, 1)[0]);
            }
        }

        const data = {
            name: name || undefined,
            phone: phone || undefined,
            age: age || undefined,
            email: email || undefined,
            addresses: updatedAddresses || [],
        };

        if (id) {
            const response = await axios.put(`http://localhost:8000/users/${id}`, data);
            if (response.data.status === "ok") {
                alert("User updated successfully");
            }
            navigate("/");
        }
    };

    const handleAddAddress = () => {
        if (newAddress.trim()) {
            setAddresses([...addresses, newAddress.trim()]);
            setNewAddress("");
        }
    };

    const handleDeleteAddress = (index) => {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
        if (addresses[index] === defaultAddress) {
            setDefaultAddress("");
        }
    };

    return (
        <div>
            <h1>Edit user id: {id}</h1>
            <form className="mt-4 flex justify-center" onSubmit={handleSubmit}>
                <div className="w-1/2">
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

                    <div className="mb-4">
                        <div>
                            <label className="text-xl">Enter Address</label>
                        </div>
                        <div>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                type="text"
                                placeholder="Enter new address"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
                            onClick={handleAddAddress}
                        >
                            Add Address
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="text-xl">Existing Addresses</label>
                        <ul>
                            {addresses.map((address, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span className="mb-2 w-full">{index + 1}. {address}</span>
                                    <div>
                                        <input
                                            type="radio"
                                            checked={defaultAddress === address}
                                            onChange={() => setDefaultAddress(address)}
                                        />
                                        <label className="ml-2">Default</label>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteAddress(index)}
                                            className="bg-red-500 hover:bg-red-700 text-white ml-2 mb-2 font-bold py-1 px-3 rounded-full"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </li>

                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            type="submit"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </form>

            <ToastContainer/>
        </div>
    );
};

export default Edit;
