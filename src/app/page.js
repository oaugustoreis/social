"use client"; // 
import { useEffect, useState } from 'react';
import Profile from './components/Profile';
import { useRouter } from 'next/navigation';
import Homepage from './home/page';
import NavBar from './components/NavBar';
import { isAuthenticated } from '../api/api';
import { get_notes } from '../api/api';
import Loading from './components/Loading';
import CreateNote from "./components/CreateNote";

export default function Home() {
  const [data, setData] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [teste, setTeste] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await isAuthenticated();
        const notes = await get_notes();
        setData(notes);
        
        if (response) {
          setIsAuth(response);
        } else {
          throw new Error("Not authenticated");
        }
      } catch (error) {
        router.push("/login");
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);


  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Homepage />;
      case 'profile':
        return <Profile data={data} setData={setData} />;
      default:
        return <Homepage />;
    }
  };


  if (loading) {
    return <div className='text-black flex items-center justify-center h-screen'>
      <Loading />
    </div>;
  }


  return (
    <div className='flex flex-col items-center justify-around h-screen'>
      {renderComponent()}
      <div className='fixed bottom-1 w-80 right-5/6'>
        <CreateNote setData={setData} />
        <NavBar setActiveComponent={setActiveComponent} auth={isAuth} />
      </div>
    </div>
  );
}