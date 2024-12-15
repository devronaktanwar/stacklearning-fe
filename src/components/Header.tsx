import HeaderSearchBar from "./HeaderSearchBar";

const Header = () => {
  return (
    <div className="lg:py-36 py-16 bg-[#0596680f]">
      <div className="w-[95%] md:w-[80%] m-auto">
        <div className="flex flex-col items-center gap-4 justify-center">
          <h1 className="leading-tight text-2xl sm:text-[44px] font-semibold text-center text-[#161c2d]">
            Unleash your{" "}
            <span className="sm:text-[48px] text-primaryNew">talent,</span>
            <br />
            <span className="sm:text-[48px] text-primaryNew">seize</span> the
            opportunity
          </h1>
          <p className="text-sm sm:text-lg text-center text-secondaryNew max-w-xl">
            Jobs, Careers, and Opportunities Await. Connecting exceptional
            talent with top companies.
          </p>
        </div>
        <div className="mt-6">
          <HeaderSearchBar/>
        </div>
        <div className="flex justify-center text-secondaryNew mt-6 lg:text-sm text-xs text-center">
          <p><span className="font-medium">Popular Searches</span> : Designer, Developer, Web, IOS, PHP Senior Engineer</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
