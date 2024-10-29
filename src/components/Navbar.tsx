import { FC } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

interface lNavbarProps{

}
const Navbar:FC<lNavbarProps> = () => {
  return (
    <div className='border-b sticky top-0 bg-white z-50'>
        <nav className='w-[80%] m-auto flex justify-between items-center'>
            <div className='w-24'>
                <img src={logo} alt="logo" className='w-full'/>
            </div>
            <div>
                <ul className='flex gap-8 text-base font-medium'>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/job-board'}>Jobs</Link></li>
                </ul>
            </div>
            <div className='flex gap-6 text-sm font-medium'>
                <button className='border px-4 py-2 border-primaryNew rounded' >Login</button>
                <button className='border border-primaryNew px-4 py-2 bg-primaryNew rounded text-white'>Sign Up</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar