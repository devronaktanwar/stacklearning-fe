import pencil from "../assets/pencil.svg";
import { IoIosArrowForward } from "react-icons/io";

const QualificationBanner = () => {
  return (
    <div className="py-24">
      <div className="w-[80%] m-auto p-8 bg-white">
        <h2 className="text-2xl font-semibold text-center">
          What is your Qualification?
        </h2>
        <div className="flex mt-12 gap-12 justify-center">
          <div className="basis-1/5 border px-4 py-6 rounded-lg flex flex-col gap-2">
            <div>
              <img src={pencil} alt="pencil" />
            </div>
            <h2 className="font-semibold">Graduate</h2>
            <div className="flex w-full justify-between items-center">
              <p className="text-sm">View Jobs</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="basis-1/5 border px-4 py-6 rounded-lg flex flex-col gap-2">
            <div>
              <img src={pencil} alt="pencil" />
            </div>
            <h2 className="font-semibold">Graduate</h2>
            <div className="flex w-full justify-between items-center">
              <p className="text-sm">View Jobs</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="basis-1/5 border px-4 py-6 rounded-lg flex flex-col gap-2">
            <div>
              <img src={pencil} alt="pencil" />
            </div>
            <h2 className="font-semibold">Graduate</h2>
            <div className="flex w-full justify-between items-center">
              <p className="text-sm">View Jobs</p>
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationBanner;
