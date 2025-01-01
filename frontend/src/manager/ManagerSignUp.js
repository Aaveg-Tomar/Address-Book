import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ManagerSignUp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:8000/auth/signup/manager', {
        email: formData.email,
        password: formData.password,
        role: 'manager',
      });

      if (response.status === 201) {
        navigate('/manager/login')

      }
    } catch (err) {
      console.log("Error")
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Manager SignUp</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>


          <div>
            <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm/6 font-medium text-gray-900">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required className="block w-full mb-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SignUp</button>
          </div>


        </form>
      </div>
    </div>
  );
};

export default ManagerSignUp;
