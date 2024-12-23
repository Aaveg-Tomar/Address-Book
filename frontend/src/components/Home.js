import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await axios.get("http://localhost:8000/users");
            setUserDetails(response.data);
        };

        fetchUserDetails();
    }, []);

    const handleDelete = async () => {
        if (userIdToDelete) {
            const response = await axios.delete(`http://localhost:8000/users/${userIdToDelete}`);
            if (response.status === 200) {
               
                setUserDetails(userDetails.filter((user) => user._id !== userIdToDelete));
                setShowModal(false); 
            }
        }
    };

    const handleDeleteClick = (id) => {
        setUserIdToDelete(id);
        setShowModal(true); 
    };

    const handleProfileClick = (id) =>{
        navigate(`/profile/${id}`);
    }

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="bg-green-200 min-h-[200vh]  min-w-fit py-5">
            <h1 className="mt-3 mb-3 flex font-extrabold justify-center text-4xl">User Details</h1>
            <button className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => navigate("/form")}>Add User</button>

            <table className="w-full text-center mr-2 table-auto border-collapse border border-gray-400 mt-4">
                <thead className="bg-yellow-800 text-white">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>

                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.map((user, index) => (
                        <tr
                            key={user._id}
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"} hover:bg-gray-500`}
                        >
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                            
                            <td className="border border-gray-300 px-4 py-2">
                                <div className="flex justify-center">
                                    <div className="mr-2 my-2">
                                        <button className="rounded-md bg-amber-600 px-4 border border-transparent text-center text-sm text-slate-800 transition-all shadow-md hover:shadow-lg focus:bg-amber-700 focus:shadow-none active:bg-amber-700 hover:bg-amber-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleEdit(user._id)}>Edit</button>
                                    </div>
                                    <div className="my-2">
                                        <button className="rounded-md bg-red-600 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleDeleteClick(user._id)}>Delete</button>
                                    </div>
                                    <div className="my-2">
                                        <button className="rounded-md bg-green-600 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleProfileClick(user._id)}>Show Profile</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
                        <p>Are you sure you want to delete this user?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setShowModal(false)} 
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
