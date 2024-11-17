import verified from '../assets/verified.png'
import location from '../assets/location.png'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Button } from './ui/button'
const FeatureBanner = () => {
  return (
    <div className='sm:py-24 py-12'>
        <div className="w-[95%] sm:w-[80%] m-auto p-8 flex justify-between bg-white items-center rounded flex-col sm:flex-row sm:gap-12 gap-6">
            <div>
            <Button className="sm:p-6 border-1 rounded-full bg-transparent border border-primaryNew text-primaryNew text-sm sm:text-lg hover:bg-primaryNew hover:text-white flex items-center space-x-2 group">
              Register Now
              <span className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-2">
                <FaArrowRightLong />
              </span>
            </Button>
            </div>
            <div className='flex sm:gap-12 flex-col sm:flex-row gap-4'>
                <div className='flex flex-col items-center justify-center'>
                    <img src={verified} alt="verified" className='w-12'/>
                    <h2 className='font-semibold text-center text-xs sm:text-base'>100 % FREE & Verified Jobs</h2>
                </div>
                <div className='flex flex-col items-center'>
                <img src={location} alt="location" className='w-12'/>
                <h2 className='font- sm:flex-row font-semibold text-center text-xs sm:text-base'>Best jobs in your locality</h2>
                </div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default FeatureBanner