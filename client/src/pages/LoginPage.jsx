// import {Link, Navigate} from "react-router-dom";
// import {useContext, useState} from "react";
// import axios from "axios";
// import {UserContext} from "../UserContext.jsx";
import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        No Account? <Link className="underline text-black" to={'/register'}>Register</Link> </div>
                </form>
            </div>
        </div>
    );
}