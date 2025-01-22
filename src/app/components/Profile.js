"use client";
import { useEffect, useState } from 'react';
import { get_notes } from '../../api/api';
import React from 'react';

function ProfileCard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const status = "Disponível";

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const notes = await get_notes();
                setData(notes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return <div className='text-black flex items-center justify-center h-screen'>Loading...</div>;
    }

    if (error) {
        return <div className='text-black flex items-center justify-center h-screen'>Error: {error}</div>;
    }

    return (
        <div className='text-black flex items-center flex-col justify-center h-screen'>
            {
                data.map((note) => (
                    <div key={note.id} className="bg-white max-w-72 shadow-lg my-3 rounded-lg overflow-hidden">
                        <div className="p-4">
                            <div  className='mb-4'>
                                <p className="tracking-wide text-sm font-bold text-gray-700">{note.owner}</p>
                                <p className="text-3xl w-62 text-gray-900">{note.description}</p>
                                <p className="text-sm text-gray-600">{status}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ProfileCard;