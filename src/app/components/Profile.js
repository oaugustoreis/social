"use client";
import React from 'react';

function ProfileCard() {
    const name = "Jhon Doe";
    const username = "@jhondoe_123";
    const status = "Disponível";
    return (
        <div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-cover w-64 bg-center h-56 p-4" style={{ backgroundImage: "url('https://placehold.co/400')" }}>
                    <div className="flex justify-end">
                        <button className="p-2 rounded-full bg-white text-black">
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <p className="tracking-wide text-sm font-bold text-gray-700">{username}</p>
                    <p className="text-3xl text-gray-900">{name}</p>
                    <p className="text-sm text-gray-600">{status}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;