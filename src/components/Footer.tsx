import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <div className='py-12 bg-primaryNew'>
      <div className='w-[80%] m-auto flex justify-between items-center'>
        <div className='flex items-center gap-4'><img src={logo} alt="stacklearning" className='w-16 bg-white inline-flex rounded-full' /><h2 className='text-white font-semibold text-lg'>StackJobs</h2></div>
        <div className='flex gap-4 text-white'>
            <Link to={'/'}>Home</Link>
            <Link to={'/'}>Home</Link>
            <Link to={'/'}>Home</Link>
            <Link to={'/'}>Home</Link>
            <Link to={'/'}>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
