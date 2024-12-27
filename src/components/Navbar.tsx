import { FC, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { GrHomeRounded } from "react-icons/gr";
import { PiBagSimpleBold } from "react-icons/pi";
import { IoMdLogIn } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { useUserContext } from "@/context/UserContext";
import { twMerge } from "tailwind-merge";
interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const { user } = useUserContext();

  return (
    <div className="sticky top-0 bg-white border-b z-50">
      <nav className="w-[85%] m-auto flex justify-between items-center  z-50 relative">
        <div
          className="w-16 sm:w-24 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-full" />
        </div>

        <div className="hidden md:flex gap-8 text-base  items-center">
          <Link to="/" className="font-medium">
            Home
          </Link>
          <Link to="/job-board" className="font-medium">
            Jobs
          </Link>
          {user.isLoggedIn && (
            <div className="flex gap-2 items-center cursor-pointer">
              <p className="text-sm">
                Hi, {user?.fullName && user?.fullName.split(" ")[0]}
              </p>
              <div>
                <FaRegUserCircle
                  size={22}
                  onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
                />
                <div className="absolute right-4 top-[84px]">
                  <div
                    className={twMerge(
                      isDesktopMenuOpen
                        ? " translate-0 scale-100"
                        : "-translate-y-10  translate-x-20 scale-0",
                      "transition-transform duration-300"
                    )}
                  >
                    <DesktopNav
                      isDesktopMenuOpen={isDesktopMenuOpen}
                      setIsDesktopMenuOpen={setIsDesktopMenuOpen}
                      user={user}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="md:hidden relative flex gap-2 items-center">
          {user.isLoggedIn && (
            <p className="text-sm">
              Hi, {user?.fullName && user?.fullName.split(" ")[0]}
            </p>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl"
          >
            <HiOutlineMenuAlt1 />
          </button>
          <div className="absolute right-6 top-8">
            <div
              className={twMerge(
                isMobileMenuOpen
                  ? " translate-0 scale-100"
                  : "-translate-y-20  translate-x-20 scale-0",
                "transition-transform duration-300"
              )}
            >
              <MobileNav
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                user={user}
              />
            </div>
          </div>
        </div>

        {!user.isLoggedIn && (
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <button
              className="border px-4 py-2 border-primaryNew rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="border border-primaryNew px-4 py-2 bg-primaryNew rounded text-white"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};
interface lMobileNavProps {
  setIsMobileMenuOpen: (val: boolean) => void;
  isMobileMenuOpen: boolean;
  user: any;
}
const MobileNav: FC<lMobileNavProps> = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  user,
}) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsMobileMenuOpen(!isMobileMenuOpen);
    window.location.reload();
  };
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
        {user.isLoggedIn && (
          <div
            className="flex items-center gap-4 pt-2 border-b pb-2"
            onClick={() => {
              navigate("/my-account");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <FaRegUserCircle />
            <p className="text-nowrap">My account</p>
          </div>
        )}
        {!user.isLoggedIn ? (
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
        ) : (
          <div className="flex items-center gap-4 pt-2" onClick={handleLogout}>
            <IoMdLogIn />
            <p>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface lDesktopNavProps {
  setIsDesktopMenuOpen: (val: boolean) => void;
  isDesktopMenuOpen: boolean;
  user: any;
}
const DesktopNav: FC<lDesktopNavProps> = ({
  setIsDesktopMenuOpen,
  isDesktopMenuOpen,
  user,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsDesktopMenuOpen(!isDesktopMenuOpen);
    window.location.reload();
  };
  return (
    <div className="border px-5 py-3 text-sm bg-white rounded-xl shadow-lg">
      <div className="flex gap-3 pb-2 items-center">
        <div className=" bg-[#deffd9] h-9 w-9 flex justify-center items-center rounded-full shadow">
          {(user.fullName && user.fullName.slice(0, 1)) || "C"}
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm">{user.fullName}</h2>
          <p className="text-xs text-gray-500">{user.emailAddress}</p>
        </div>
      </div>
      <div className="flex flex-col">
        {user.isLoggedIn && (
          <div
            className="flex items-center gap-4 pt-1 border-b pb-1"
            onClick={() => {
              navigate("/my-account");
              setIsDesktopMenuOpen(!isDesktopMenuOpen);
            }}
          >
            <FaRegUserCircle />
            <p className="text-nowrap hover:underline">My account</p>
          </div>
        )}
        <div className="flex items-center gap-4 py-1" onClick={handleLogout}>
          <IoMdLogIn />
          <p className="hover:underline">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
