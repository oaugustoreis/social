"use client"; // 
import { useEffect, useState } from 'react';
import Profile from './components/Profile';
import { useRouter } from 'next/navigation';
import Homepage from './home/page';
import NavBar from './components/NavBar';
import { isAuthenticated } from '../api/api';
import Loading from './components/Loading';
import CreateNote from "./components/CreateNote";

export default function Home() {

  const [activeComponent, setActiveComponent] = useState('home');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState("false");

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await isAuthenticated();
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
        return <Profile />;
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
    <div className='flex flex-col items-center justify-center h-screen'>
      {renderComponent()}
      <CreateNote/>
      <NavBar setActiveComponent={setActiveComponent} auth={isAuth} />
    </div>
  );
}