import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [userDetails, setUserDetails] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserDetails = async () => {
            
                const response = await axios.get("http://localhost:8000/users");
                setUserDetails(response.data);
            
        };

        fetchUserDetails();
    }, []);


    const handleDelete = async (id) => {
        
            const response = await axios.delete(`http://localhost:8000/users/${id}`);
            if (response.status === 200) {
                alert("User deleted successfully");
                setUserDetails(userDetails.filter((user) => user._id !== id));
            }
        
    };


    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div>
            <h1 className=' mt-3 mb-3 flex font-extrabold justify-center text-4xl'>User Details</h1>
            <button className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => navigate("/form")}>Add User</button>
            <table className=" w-full text-center mr-2  table-auto border-r-gray-900" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>
                                <div className=" flex justify-center">
                                    <div className="mr-2 my-2">
                                        <button className="rounded-md bg-amber-600  px-4 border border-transparent text-center text-sm text-slate-800 transition-all shadow-md hover:shadow-lg focus:bg-amber-700 focus:shadow-none active:bg-amber-700 hover:bg-amber-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleEdit(user._id)}>Edit</button>
                                    </div>
                                    <div className="my-2">
                                        <button className="rounded-md bg-red-600  px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
