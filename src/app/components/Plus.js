"use client"
import { motion } from "motion/react"
export default function Plus({ setOpen }) {
    return (
        /* From Uiverse.io by catraco */
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.2,
                scale: { type: "spring", visualDuration: 0.2, bounce: 0.2 },
            }}
            className="flex items-center justify-center p-2 btn rounded-full shadow-lg">
                
            <button onClick={() => setOpen(true)}
                title="Add New"
                className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    className="stroke-zinc-100 fill-none  group-active:stroke-zinc-200  group-active:duration-0 duration-300"
                >
                    <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        strokeWidth="1.5"
                    ></path>
                    <path d="M8 12H16" strokeWidth="1.5"></path>
                    <path d="M12 16V8" strokeWidth="1.5"></path>
                </svg>
            </button>

        </motion.div>
    )
}