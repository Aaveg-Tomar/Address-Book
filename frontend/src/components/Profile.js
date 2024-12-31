import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const token = localStorage.getItem("adminToken");
    

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchUserDetails = async () => {
                const response = await axios.get(`http://localhost:8000/users/user/${id}` , {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setUserDetails(response.data);
                console.log(response);
            };

            fetchUserDetails();
        }
    }, [id]);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleHome = () => {
        navigate('/home');
    };

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container p-6">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="user-info mb-6">
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Phone:</strong> {userDetails.phone}</p>
                <p><strong>Age:</strong> {userDetails.age}</p>
            </div>

            <div >
                <h3 className="text-xl font-semibold mb-4">Addresses</h3>
                {userDetails.addresses && userDetails.addresses.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">#</th>
                                <th className="py-2 px-4 border-b text-left">Address</th>
                                <th className="py-2 px-4 border-b text-left">Default</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDetails.addresses.map((address, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                                >
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{address}</td>
                                    <td className="py-2 px-4 border-b">
                                        {index === 0 && <span className="text-green-500 font-bold">Default</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No addresses available</p>
                )}
            </div>

            <div className=' flex justify-center'>
            <div className="  mr-2 my-2">
                <button className="rounded-md bg-amber-600 px-8 py-4 border border-transparent text-center text-base text-slate-800 transition-all shadow-md hover:shadow-lg focus:bg-amber-700 focus:shadow-none active:bg-amber-700 hover:bg-amber-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleEdit(userDetails._id)}>Edit</button>
            </div>
            <div className="  mr-2 my-2">
                <button className="rounded-md bg-green-600 px-6 py-4 border border-transparent text-center text-base text-slate-800 transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleHome()}>Home</button>
            </div>
            </div>
        </div>
    );
};

export default Profile;
