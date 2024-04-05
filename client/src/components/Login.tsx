import React, { useState } from 'react';
import { GoEye } from "react-icons/go";
import { IoEyeOff } from "react-icons/io5";
import signinimg from '../assets/signin.png';
import { useNavigate } from 'react-router-dom';

interface FormData {
    password: string;
    email: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loggedIn ,isLoggedIn] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        password: '',
        email: '',
    });
    const [error, setError] = useState<string | null>(null);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Toggle password visibility
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          

            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
          
            if (!response.ok) {
                throw new Error(data.msg || 'Failed to login');
            }
            isLoggedIn(true);
     

            setTimeout(() => {
                navigate('/home'); 
            }, 1500);
         
     
            console.log('Login successful:', data);
        } catch (error:any) {
            console.error('Error logging in:', error.message);
            setError(error.message);
        }
    };

  
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
                <img
                    src={signinimg}
                    alt="Your Image"
                    className="object-cover w-full h-full"
                />
            </div>
          
            {/* Form */}
      
            <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center ">
            {loggedIn ? <p className="text-green-600 text-sm mb-4 ml-12 font-semibold ">logged in</p> : error && <p className="text-red-500 text-sm mb-4 ml-12 font-semibold relative">{error}</p> }
                <form
                    className="w-full max-w-lg px-8 py-6 border-[#ebebeb] border-2 rounded-xl filter h-[60vh] flex flex-col justify-center"
                    onSubmit={handleSubmit}
                >
                    <div className="flex justify-between items-baseline">
                        <h1 className="text-5xl text-[#3A244A]">
                            Fill what we know <span className="text-[#D72638]">!</span>
                        </h1>
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border py-4 px- text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-0 right-0 mr-3 mt-3"
                        >
                            {showPassword ? <IoEyeOff /> : <GoEye />}
                        </button>
                    </div>

                    

                    <div className="mb-4 flex flex-col gap-4">
                        <button
                            type="submit"
                            className="w-full bg-[#3A244A] hover:bg-[#744992] text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                        >
                            Sign in
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-[white] hover:bg-[#e7e7e7] text-[#3A244A] font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline border-2 border-[#3A244A]"
                            onClick={()=>navigate('/')}
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
