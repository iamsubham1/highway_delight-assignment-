import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const VerifyOtp = (email:any) => {

    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        console.log(email);
      const response = await fetch('http://localhost:8080/api/auth/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email.email, receivedOtp: otp }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert('incorrect OTP');
        setIsLoading(false);
        throw new Error(data.msg || 'Failed to verify OTP');
        
      }
      console.log(data);
     
      navigate('/home');

    } catch (error:any) {
      console.error('internal server error', error.message);
    
      
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };
  if (isLoading) {
    return (
        <div className="w-[100vw] h-[100vh] bg-white"><div className="spinner-border" role="status" id='spinner'>
            <span className="visually-hidden"></span>
        </div></div>)
}

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 text-center">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
              className="w-full border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter OTP"
              disabled={isLoading} 
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-[#3A244A] hover:bg-[#744992] text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              disabled={isLoading} 
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
