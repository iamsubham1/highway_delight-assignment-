import React, { useState } from 'react';
import signupimg from '../assets/HD Assignment.png';
import Dropdown from './Dropdown';
import { GoEye } from "react-icons/go";
import { IoEyeOff } from "react-icons/io5";

// type for the form data
interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  contactMode: string;
  email: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    contactMode: '',
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
  const [showPassword, setShowPassword] = useState<boolean[]>([false, false]);

  const togglePasswordVisibility = (index: number) => {
    const updatedVisibility = [...showPassword];
    updatedVisibility[index] = !updatedVisibility[index];
    setShowPassword(updatedVisibility);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/2">
        <img
          src={signupimg}
          alt="Your Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form */}
      <div className="lg:w-1/2 p-8 flex justify-center items-center ">
        <form
          className="w-full max-w-sm px-8 py-6 border-[#ebebeb] border-2 rounded-xl filter"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-baseline">
            <h1 className="text-4xl text-[#3A244A]">
              Let us know <span className="text-[#D72638]">!</span>
            </h1>
            <a
              href="/login"
              className="text-[#3A244A] font-bold underline "
            >
              Sign <span className="text-[#D72638]">in</span>
            </a>
          </div>
          <div className="mb-4 mt-4">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="First Name"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Last Name"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword[0] ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              placeholder="Set Password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(0)}
              className="absolute top-0 right-0 mr-3 mt-3"
            >
              {showPassword[0] ? <IoEyeOff /> : <GoEye />}
            </button>
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword[1] ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              placeholder="Retype Password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(1)}
              className="absolute top-0 right-0 mr-3 mt-3"
            >
              {showPassword[1] ? <IoEyeOff /> : <GoEye />}
            </button>
          </div>
          <div className="mb-4">
            <Dropdown
              name="contactMode"
              options={['Email']}
              initialValue="Contact Mode&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-[#3A244A] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
