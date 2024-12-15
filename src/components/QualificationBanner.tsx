import graduation from "../assets/graduation.svg";
import pg from "../assets/pg.svg";
import diploma from "../assets/diploma.svg";
import { IoIosArrowForward } from "react-icons/io";
import Design from "./Design";

// Qualification data array
const qualifications = [
  { title: "Graduate", description: "View Jobs", icon: graduation },
  { title: "Post Graduate", description: "View Jobs", icon: pg },
  { title: "Diploma", description: "View Jobs", icon: diploma },
];

const QualificationBanner = () => {
  return (
    <div className="sm:py-24 py-12">
      <div className="w-[95%] sm:w-[80%] m-auto p-8  rounded-lg">
        <h2 className="font-semibold text-center text-xl sm:text-2xl">
          What is your Qualification?
        </h2>
        <Design/>
        <div className="flex sm:mt-12 gap-x-12 gap-y-6 justify-center flex-wrap mt-6">
          {qualifications.map((qualification, index) => (
            <div
              key={index}
              className="w-[300px] sm:w-[250px] border px-4 py-6 rounded-lg flex flex-col gap-2 cursor-pointer hover:scale-105 transition hover:shadow-lg"
            >
              <div>
                <img src={qualification.icon} alt={qualification.title} />
              </div>
              <h2 className="font-semibold">{qualification.title}</h2>
              <div className="flex w-full justify-between items-center">
                <p className="text-sm">{qualification.description}</p>
                <IoIosArrowForward />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QualificationBanner;
