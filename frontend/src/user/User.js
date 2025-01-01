import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const navigate = useNavigate();


  const token = localStorage.getItem("userToken");
  const email = localStorage.getItem('userEmail')


  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchUserDetails = async () => {
        const response = await axios.get(`http://localhost:8000/users/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
            email: `${email}`,
          },
        });
        setUserDetails(response.data.userDetails);
        console.log(response);
      };

      fetchUserDetails();
    }
  }, [token]);

 
  if (!userDetails) {
    return <div>Loading...</div>;
  }
  
  const handleLogOut = () =>{
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className="profile-container p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className=" flex justify-end"> 
                <button className="rounded-md bg-blue-600 py-2 px-4 mr-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleLogOut()}>Log Out</button>
            </div>
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

      
    </div>
  );
};

export default User;