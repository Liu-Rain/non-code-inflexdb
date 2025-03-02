import axios from 'axios';
import { QueryContext } from './queryContext';
import { useContext, useState, useEffect } from 'react';


export default (flows) => {
    const [list, setList] = useState("")
    const {Cookies, Bucket} = flows
    useEffect(() => {
        const handleSubmit = async () =>{
    
            try {
                const url = "http://localhost:3000/meansurementquery/"; // Ensure this matches your API's endpoint
    
                const response = await axios.post(url, {cookies: Cookies, bucket: Bucket}, {
                    withCredentials: true, // Enables sending cookies with the request if required by the server
                    headers: {
                        'Content-Type': 'application/json', // Ensure the server expects JSON
                        
                    },
                });
                console.log(response.data.data);
                if (response.status === 200) {
                    setList(response.data.data)
                }
            } catch (error) {
                // Error handling
    
                if (error.response) {
                    //console.error('Error Response Data:', error.response.data);
                    //console.error('Error Status Code:', error.response.status);
                } else {
                    //console.error('Error Message:', error.message);
                }
    
            }
        };
        handleSubmit();
    },[flows])

    return list

    

    

}

