"use client"; // Ensure this component is rendered on the client side
import Link from 'next/link';
import Profile from './components/Profile';
import { motion } from "motion/react"

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='my-3 flex items-center navMenu drop-shadow-md px-5 py-2 rounded-lg gap-4'>
        <motion.ul
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "Spring", duration: 0.1, delay: 0 }}
          className='flex space-x-4 '
        >
          <li className='flex items-center py-1 px-3 rounded-md'>
            <Link href="/login">
              Login
            </Link>
          </li>
          <li className='flex items-center py-1 px-3 rounded-md'>
            <Link href="/home">
              Home
            </Link>
          </li>
          <li>
            <button className='bg-indigo-500 bg-red-500 text-white drop-shadow-md font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>Sair</button>
          </li>
        </motion.ul>
      </div>
      <Profile />
    </div>
  );
}