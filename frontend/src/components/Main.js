import React from 'react'
import { useNavigate } from 'react-router-dom'

const Main = () => {

    const navigate = useNavigate();

    const handleAdmin = () => {
        navigate('/login')

    }

    const handleManager = () => {
        navigate('/manager/login')

    }

    const handleUser = () =>{
        navigate('/user/login')
    }

    return (
        <div className='flex justify-normal '>
            <div className="my-2">
                <button className="rounded-md bg-blue-600 px-4 py-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleManager()}>Manager Login</button>
            </div>
            <div className="my-2">
                <button className="rounded-md bg-green-600 px-6 py-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleAdmin()}>Admin Login</button>
            </div>
            <div className="my-2">
                <button className="rounded-md bg-yellow-600 px-6  py-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-yellow-700 focus:shadow-none active:bg-yellow-700 hover:bg-yellow-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleUser()}>User Login</button>
            </div>
        </div>
    )
}

export default Main