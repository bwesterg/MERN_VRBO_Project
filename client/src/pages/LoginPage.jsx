// import {Link, Navigate} from "react-router-dom";
// import {useContext, useState} from "react";
// import axios from "axios";
// import {UserContext} from "../UserContext.jsx";
import React from 'react';

export default function LoginPage() {
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto">
                    <input type="email" placeholder="your@email.com" className="w-full border my-1 py-2 px-3 rounded-full" />
                    <input type="password" placeholder="password" className="w-full border my-1 py-2 px-3 rounded-full" />
                    <button className="bg-primary p-2 w-full text-white rounded-2xl">Login</button>
                </form>
            </div>
        </div>
    );
}