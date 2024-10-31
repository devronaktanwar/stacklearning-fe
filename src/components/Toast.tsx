import  { FC } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { twMerge } from 'tailwind-merge';

interface lToastProps{
    isSuccess:boolean;
    message:string;
}
const Toast:FC<lToastProps> = ({isSuccess,message}) => {
  return (
    <div className={twMerge('absolute top-36 right-12 px-4 py-2 text-white rounded',isSuccess?'bg-green-700':'bg-red-700')}>
        <div className='flex gap-2 items-center'>
            {isSuccess ? <FaCircleCheck/>:<RxCrossCircled/>}
            <p className='text-sm'>{message}</p>
        </div>
    </div>
  )
}

export default Toast