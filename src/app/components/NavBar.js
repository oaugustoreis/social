// import { motion } from "motion/react"
"use client";
import { logout } from '../../api/api';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"; // Ensure this is correct
function NavBar({ setActiveComponent }) {
  const router = useRouter()
  const handleLogout = async () => {
    const log = await logout()
    router.push('/login')
  }
  return (
    <>
      <div className='my-3 flex items-center navMenu drop-shadow-md px-5 py-2 rounded-lg gap-4'>
        <motion.ul
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "Spring", duration: 0.1, delay: 0 }}
          className='flex space-x-4 '
        >
          {/* <li className='flex items-center py-1 px-3 rounded-md'>
            <button onClick={() => setActiveComponent('login')}>Login</button>
          </li> */}
          <li className='flex items-center py-1 px-3 rounded-md'>
            <button onClick={() => setActiveComponent('home')}>Home</button>
          </li>
          <li className='flex items-center py-1 px-3 rounded-md'>
            <button onClick={() => setActiveComponent('profile')}>Profile</button>
          </li>
          <li>
            <button onClick={handleLogout} className='bg-indigo-500 bg-red-500 text-white drop-shadow-md font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>Sair</button>
          </li>
        </motion.ul>
      </div>
    </>
  )

}
export default NavBar