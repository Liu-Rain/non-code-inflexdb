import React, { useState } from 'react';
import axios from 'axios';

//const marketplaceUrl = process.env.MARKETPLACE_URL || "http://localhost:4000";


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Username:', username, 'Password:', password);
        // Example data to send
        const auth = {
            username: username,
            password: password,
        };
    
        try {
            const url = "http://localhost:3000/login/"; // Ensure this matches your API's endpoint
            const response = await axios.post(url, auth, {
                withCredentials: true, // Enables sending cookies with the request if required by the server
                headers: {
                    'Content-Type': 'application/json', // Ensure the server expects JSON
                },
            });

            // Log the response
            console.log('Response Status:', response.status);
            console.log('Response Data:', response.data);

            // Handle success logic (e.g., redirecting the user or updating UI)
        } catch (error) {
            // Error handling
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Error Status Code:', error.response.status);
            } else {
                console.error('Error Message:', error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <h1 className="title">Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label className="label">Username:</label>
                    <input
                        className="input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label className="label">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <button type="submit" className="button">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
