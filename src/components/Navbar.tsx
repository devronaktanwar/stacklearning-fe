import { FC, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { GrHomeRounded } from "react-icons/gr";
import { PiBagSimpleBold } from "react-icons/pi";
import { IoMdLogIn } from "react-icons/io";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const navigate=useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="border-b sticky top-0 bg-white z-50">
      <nav className="w-[90%] m-auto flex justify-between items-center py-4 z-50 relative">
        <div className="w-16 sm:w-24">
          <img src={logo} alt="logo" className="w-full" />
        </div>

        <div className="hidden md:flex gap-8 text-base font-medium">
          <Link to="/">Home</Link>
          <Link to="/job-board">Jobs</Link>
        </div>

        <div className="md:hidden relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl"
          >
            <HiOutlineMenuAlt1 />
          </button>
          <div className="absolute right-8">
            {isMobileMenuOpen && (
              <MobileNav
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            )}
          </div>
        </div>

        <div className="hidden md:flex gap-6 text-sm font-medium">
          <button className="border px-4 py-2 border-primaryNew rounded" onClick={()=>navigate('/login')}>
            Login
          </button>
          <button className="border border-primaryNew px-4 py-2 bg-primaryNew rounded text-white" onClick={()=>navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  );
};
interface lMobileNavProps {
  setIsMobileMenuOpen: (val: boolean) => void;
  isMobileMenuOpen: boolean;
}
const MobileNav: FC<lMobileNavProps> = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}) => {
  const navigate = useNavigate();
  return (
    <div className="border px-5 py-2 text-sm bg-white rounded-xl">
      <div className="flex flex-col">
        <div
          className="flex items-center gap-4 border-b pb-2"
          onClick={() => {
            navigate("/");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <GrHomeRounded />
          <p>Home</p>
        </div>
        <div
          className="flex items-center gap-4 pt-2 border-b pb-2"
          onClick={() => {
            navigate("/job-board");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <PiBagSimpleBold />
          <p>Jobs</p>
        </div>
        <div
          className="flex items-center gap-4 pt-2"
          onClick={() => {
            navigate("/login");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <IoMdLogIn />
          <p>Login</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
