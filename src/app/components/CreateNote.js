"use client"
import { motion } from "motion/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Plus from './Plus'
import { useState } from 'react'


export default function CreateNote() {

    const [open, setOpen] = useState(false)
    const [note, setNote] = useState('')
    const createNote = () => {
        console.log('Create note: ', note)
    }

    return (
        <div className='text-black flex items-center justify-center relative'>
            {
                open ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.2,
                            scale: { type: "spring", visualDuration: 0.2, bounce: 0.2 },
                        }}
                        className="absolute z-10 bottom-1" // Adicionando position absolute e z-index
                    >
                        <div className='bg-white max-w-96 shadow-lg rounded-lg overflow-hidden'>
                            <div className='p-2 create flex items-center justify-center'>
                                <div className='flex items-center justify-around '>
                                    <button onClick={() => setOpen(false)} className="rounded-full text-white p-3 font-bold flex items-center justify-center rounded">
                                        <FontAwesomeIcon icon={faXmark} className='text-md text-black ' />
                                    </button>
                                    <input onChange={(e) => setNote(e.target.value)} type="text" className="p-2 outline-none" placeholder="Create new note" />
                                    <button onClick={createNote} className="btn rounded-full text-white p-3 font-bold flex items-center justify-center rounded ">
                                        <FontAwesomeIcon icon={faPaperPlane} className='text-md ' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="w-60 flex relative justify-end">
                        <Plus setOpen={setOpen} />
                    </div>
                )
            }
        </div>
    )
}