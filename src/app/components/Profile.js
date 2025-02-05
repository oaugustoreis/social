"use client";
import { motion } from "motion/react"
import { format, set } from 'date-fns';
import styles from "./Profile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { pt } from 'date-fns/locale';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditNote from './EditNote'
function ProfileCard({ data, setData }) {

    

    const router = useRouter();
    const [openModal, setOpenModal] = useState(false)
    const [note, setNote] = useState(null)
    const [id, setId] = useState(null)
    const [status, setStatus] = useState(null)
    const editNote = async (id, description, status) => {
        try {
            setOpenModal(true)
            setNote(description)
            setStatus(status)
            setId(id)
        } catch (error) {
            console.error('Error editing note:', error);
        }
    }
    if (!Array.isArray(data)) {
        return <p>No notes available.</p>;
    }
    return (
        <div className='text-black flex py-2 justify-center items-center flex-col h-5/6'>
            {
                openModal && (
                    <EditNote setOpenModal={setOpenModal} id={id} note={note} setData={setData} status={status} />
                )
            }
            <div className={`flex flex-wrap w-5/6 overflow-auto justify-center hide-scrollbar`}>
                {
                    data.map((note) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.2,
                                scale: { type: "spring", visualDuration: 0.2, bounce: 0.2 },
                            }}
                            key={note.id} className="mx-3">
                            <div className="bg-white w-60 shadow-lg my-3 rounded-lg">
                                <div className="py-2 px-4">
                                    <div className='mb-2'>
                                        <div className="flex items-center justify-between">
                                            <p className="tracking-wide text-md font-bold text-gray-700">@{note.owner_name}</p>
                                            <button type="button" className=" rounded-md transition hover:bg-gray-200 p-1 px-2" onClick={() => editNote(note.id, note.description, note.status)}>
                                                <FontAwesomeIcon icon={faPenToSquare} className='text-xl ' />
                                            </button>
                                        </div>
                                        <p className="text-3xl w-full overflow-hidden text-ellipsis text-gray-900">{note.description}</p>
                                        <p className="text-sm text-gray-600">
                                            {format(new Date(note.data), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: pt })}
                                        </p>

                                    </div>
                                </div>
                                
                            </div>
                            <div className="flex flex-col gap-4 items-center justify-around">

                            </div>
                        </motion.div>
                    ))
                }
            </div >
        </div >
    );
}

export default ProfileCard;