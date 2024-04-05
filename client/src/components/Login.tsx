import React from 'react'
import { GoEye } from "react-icons/go";
import { IoEyeOff } from "react-icons/io5";
import signinimg from '../assets/signin.png';

interface FormData {
    
    password: string;
 
    email: string;
  }
const Login: React.FC = () => {
    const [formData, setFormData] = React.useState<FormData>({
    password: '',
    email: '',
      });
    
      // Handle form input changes
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      // Toggle password visibility
      const [showPassword, setShowPassword] = React.useState<boolean[]>([false, false]);
    
      const togglePasswordVisibility = (index: number) => {
        const updatedVisibility = [...showPassword];
        updatedVisibility[index] = !updatedVisibility[index];
        setShowPassword(updatedVisibility);
      };
    
      // Handle form submission
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        

      }
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
          <div className="lg:w-1/2 p-8 flex justify-center items-center ">
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
                  type={showPassword[0] ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(0)}
                  className="absolute top-0 right-0 mr-3 mt-3"
                >
                  {showPassword[0] ? <GoEye /> : <IoEyeOff />}
                </button>
              </div>
              
           
              <div className="mb-4 gap-5 flex flex-col">
                <button
                  type="submit"
                  className="w-full bg-[#3A244A] hover:bg-[#744992] text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                >
                  Sign in
                </button>
                <button
                  type="submit"
                  className="w-full bg-[#ffffff] hover:bg-[#ebebeb] text-[#3A244A] font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline border-[#3A244A] border-2"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default Login