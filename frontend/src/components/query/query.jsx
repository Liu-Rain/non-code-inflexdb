import axios from 'axios';
import { QueryContext } from './queryContext';
import { useContext } from 'react';

export default () => {
   const parameter = useContext(QueryContext);
   console.log(parameter)
   return
}


/*
const Query = ({ cookies }) => {
    
    try {
        const url = "http://localhost:3000/query/"; // Ensure this matches your API's endpoint

        const response = axios.post(url, cookies, {
            withCredentials: true, // Enables sending cookies with the request if required by the server
            headers: {
                'Content-Type': 'application/json', // Ensure the server expects JSON
            },
        });
        if (response.status === 200) {

        }
    } catch (error) {
        // Error handling
        if (error.response) {
            console.error('Error Response Data:', error.response.data);
            console.error('Error Status Code:', error.response.status);
        } else {
            console.error('Error Message:', error.message);
        }
    }

    return (
      <div>
        <h2>Child Component</h2>
        <p>Message from Parent: {message}</p>
      </div>
    );
};

  





*/