import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ManagerLogin = () => {

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

      
      const response = await axios.post('http://localhost:8000/auth/login/manager', {
        email: formData.email,
        password: formData.password,
      } , {withCredentials: true});

      if (response.data) {
       
        const  token  = response.data;

        localStorage.setItem('managerToken', token);

        navigate('/manager')
       
      }
    } catch (err) {
      console.log("Error")
    }
  };

  return (
    <div className="manager-login">
      <h1>Manager Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default ManagerLogin;
