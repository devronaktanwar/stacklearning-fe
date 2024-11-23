import newsletter from "../assets/newsletter.svg";
const Newsletter = () => {
  return (
    <div>
      <div className="w-full lg:w-[400px] border p-3 sm:p-5 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-medium text-sm">Stay updated with latest jobs</h2>
            <p className="text-[10px]">
              Apply on jobs on the go and recieve all your job application
              updates
            </p>
          </div>
          <div>
            <img src={newsletter} alt="img" className="w-14" />
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <input
            className="w-[280px] rounded-lg border px-3 py-2 outline-none text-xs"
            placeholder="Enter email"
          />
          <div>
            <button className="bg-primaryNew text-white text-xs px-4 py-2 rounded-full">
              Subscribe
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
