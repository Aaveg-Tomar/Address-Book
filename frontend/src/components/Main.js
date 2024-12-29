import React from 'react'
import { useNavigate } from 'react-router-dom'

const Main = () => {

    const navigate = useNavigate();

    const handleAdmin = () => {
        navigate('/home')

    }

    const handleManager = () => {
        navigate('/manager')

    }

    return (
        <div>
            <div className="my-2">
                <button className="rounded-md bg-blue-600 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleManager()}>Manager Login</button>
            </div>
            <div className="my-2">
                <button className="rounded-md bg-green-600 px-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={() => handleAdmin()}>Admin Login</button>
            </div>
        </div>
    )
}

export default Main