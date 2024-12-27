import { RiLoader5Fill } from "react-icons/ri";

const CircularLoader = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="border inline-block p-2 rounded-full bg-white shadow">
          <RiLoader5Fill size={32} className="animate-spin text-primaryNew" />
        </div>
      </div>
    </div>
  );
};

export default CircularLoader;
