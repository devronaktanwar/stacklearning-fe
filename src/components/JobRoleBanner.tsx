import graduation from "../assets/graduation.svg";
import pg from "../assets/pg.svg";
import diploma from "../assets/diploma.svg";
import Design from "./Design";
import { IoIosArrowForward } from "react-icons/io";
const JobRoleBanner = () => {
  const qualifications = [
    { title: "Frontend Developer", description: "View Jobs", icon: graduation },
    { title: "Backend Developer", description: "View Jobs", icon: pg },
    { title: "Java Developer", description: "View Jobs", icon: diploma },
    { title: "Full Stack Developer", description: "View Jobs", icon: graduation },
    { title: "UI/UX Designer", description: "View Jobs", icon: pg },
    { title: "Digital Marketer", description: "View Jobs", icon: diploma },
    { title: "SEO", description: "View Jobs", icon: graduation },
    { title: "Human Resource", description: "View Jobs", icon: pg },
  ];
  return (
    <div className="">
      <div className="w-[95%] sm:w-[80%] m-auto p-8 bg-white border-[1px] rounded-lg">
        <h2 className="font-semibold text-center text-xl sm:text-2xl">
        What kind of a role do you want?
        </h2>
        <Design />
        <div className="flex sm:mt-12 gap-x-12 gap-y-6 justify-center flex-wrap mt-6">
          {qualifications.map((qualification, index) => (
            <div
              key={index}
              className="w-[300px] border px-4 py-6 rounded-lg flex flex-col gap-2 cursor-pointer hover:scale-105 transition hover:shadow-lg"
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

export default JobRoleBanner;
