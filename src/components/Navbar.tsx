import { FC, useState } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className='border-b sticky top-0 bg-white z-50'>
      <nav className='w-[90%] m-auto flex justify-between items-center py-4 z-50 relative'>
        <div className='w-16 sm:w-24'>
          <img src={logo} alt="logo" className='w-full'/>
        </div>

        <div className='hidden md:flex gap-8 text-base font-medium'>
          <Link to='/'>Home</Link>
          <Link to='/job-board'>Jobs</Link>
        </div>

        <div className='md:hidden'>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='text-2xl'>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div className='hidden md:flex gap-6 text-sm font-medium'>
          <button className='border px-4 py-2 border-primaryNew rounded'>Login</button>
          <button className='border border-primaryNew px-4 py-2 bg-primaryNew rounded text-white'>Sign Up</button>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full  bg-white w-full transition-transform duration-300 ease-in-out z-40 md:hidden ${
          isMobileMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
        style={{ paddingTop: '5rem' }} 
      >
        <div className='flex flex-col items-center gap-4 py-6'>
          <Link to='/' onClick={() => setIsMobileMenuOpen(false)} className='text-lg'>Home</Link>
          <Link to='/job-board' onClick={() => setIsMobileMenuOpen(false)} className='text-lg'>Jobs</Link>
          <div className='flex flex-col gap-4 mt-2'>
            <button className='border px-4 py-2 border-primaryNew rounded'>Login</button>
            <button className='border border-primaryNew px-4 py-2 bg-primaryNew rounded text-white'>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
