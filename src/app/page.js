"use client"; // 
import { useState } from 'react';
import Profile from './components/Profile';
import Homepage from './home/page';
import NavBar from './components/NavBar';

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('home');

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

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {renderComponent()}
      <NavBar setActiveComponent={setActiveComponent} />
    </div>
  );
}