const API_BASE_URL =  'http://localhost:8080'

interface FormData {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
  }
  
export const signup = async(formData:FormData)=>{

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                ...formData
            }),
        });

        if (!response.ok) {
            console.error('Network response was not ok');
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error:any) {
        console.error('Error ', error.message);
        return false; 
    }

}