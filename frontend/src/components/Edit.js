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

    const token = localStorage.getItem("adminToken");

  

   

    const navigate = useNavigate();
    const { id } = useParams();

  
    const [name, setName] = useState("");
    const [phone, setPhone] = useState(null);
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState("");
    const [defaultAddress, setDefaultAddress] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [editAddress, setEditAddress] = useState("");

    


    useEffect(() => {

        if (id) {
            const fetchUserDetails = async () => {
                const response = await axios.get(`http://localhost:8000/users/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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
            const response = await axios.put(`http://localhost:8000/users/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Saved Successfully", toastOptions);
            setTimeout(() => {
                navigate(`/profile/${id}`);
            }, 2000);
        }
    };

    const handleAddAddress = () => {
        if (newAddress.trim()) {
            setAddresses([...addresses, newAddress.trim()]);
            setNewAddress("");
        }
    };

    const openEditModal = (index) => {
        setEditAddress(addresses[index]);
        setCurrentEditIndex(index);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setEditAddress("");
        setCurrentEditIndex(null);
    };

    const handleSaveEdit = () => {
        if (editAddress.trim()) {
            const updatedAddresses = [...addresses];
            updatedAddresses[currentEditIndex] = editAddress.trim();
            setAddresses(updatedAddresses);
            closeEditModal();
        }
    };

    const handleDeleteAddress = (index) => {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
        if (addresses[index] === defaultAddress) {
            setDefaultAddress("");
        }
    };

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div>
            <h1>Edit user id: {id}</h1>
            <div  className=" flex justify-end mr-2">
                <button className="rounded-md bg-blue-600 py-2 px-4 mr-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleLogOut()}>Log Out</button>
            </div>
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
                        <div className=" flex space-x-80 mb-4">
                            <label className="text-xl font-bold">Existing Addresses</label>
                            <label className="text-xl font-bold">Select Default</label>
                        </div>

                        <ul>
                            {addresses.map((address, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span className="mb-4 w-full">{index + 1}. {address}</span>
                                    <div className=" flex ">
                                        <input
                                            type="radio"
                                            checked={defaultAddress === address}
                                            onChange={() => setDefaultAddress(address)}
                                        />

                                        <div className=" flex ">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteAddress(index)}
                                                className="bg-red-500 hover:bg-red-700 text-white ml-2 mb-2 font-bold py-1 px-3 rounded-full"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openEditModal(index)}
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold mb-2 px-6 rounded-full ml-2"
                                            >
                                                Edit
                                            </button>
                                        </div>
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


            {isModalOpen && (
                <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-1/2 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Edit Address</h2>
                        <textarea
                            className="h-20 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            type="text"
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-blue-500 text-white font-bold py-1 px-4 rounded"
                                onClick={() => handleSaveEdit()}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-400 text-white font-bold py-1 px-4 rounded"
                                onClick={() => closeEditModal()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Edit;
