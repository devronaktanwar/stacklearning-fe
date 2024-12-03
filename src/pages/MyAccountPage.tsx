import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiLoader5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { MdKeyboardArrowRight } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";

const MyAccountPage = () => {
  const { user } = useUserContext();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  useEffect(() => {
    if (user) {
      setName(user.fullName);
      setEmail(user.emailAddress);
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://stacklearning-be-h0pq.onrender.com/api/update-user-details",
        {
          userId: user._id,
          fullName: name,
          emailAddress: email,
        }
      );
      if (response.data.isSuccess) {
        toast.success("Updated successfully", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });
      }
    } catch (err) {
      console.log("error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="sm:flex justify-center max-w-lg w-full sm:border mx-auto sm:mt-12 rounded-lg">
      <div className="w-full">
        <div className="px-4 pt-6 flex flex-col gap-4 sm:px-16 w-full">
          <div>
            <h2 className="font-medium text-sm">Personal Info</h2>
            <p className="text-xs text-gray-500">Update your personal info</p>
          </div>
          <div className="max-w-full sm:max-w-xs flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="name" className="text-xs font-normal">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email" className="text-xs font-normal">
                Email Address
              </Label>
              <Input
                type="text"
                id="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <button
                className="px-3 py-2 text-xs rounded bg-primaryNew text-white flex items-center justify-center w-20"
                onClick={handleSave}
              >
                {loading ? (
                  <RiLoader5Line size={16} className="animate-spin text-base" />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-6 flex flex-col gap-1 sm:px-16 w-full">
          <div
            className="flex justify-between items-center border-[1px] p-3 rounded-lg cursor-pointer hover:border-primaryNew transition"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
          >
            <h2 className="text-[12px] font-medium flex items-center gap-2">
              <LuKeyRound size={16} />
              Change password
            </h2>
            <div>
              <MdKeyboardArrowRight size={16} />
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              showPasswordFields ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-2 mt-3">
              <div className="w-full flex flex-col gap-1">
                <Label htmlFor="oldPassword" className="text-xs font-normal">
                  Old Password
                </Label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="outline-none border px-3 py-1 bg-transparent rounded text-base shadow-sm"
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <Label htmlFor="newPassword" className="text-xs font-normal">
                  New Password
                </Label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="outline-none border px-3 py-1 bg-transparent rounded text-base shadow-sm"
                />
              </div>
              <div className="mt-3">
                <button
                  className="px-3 py-2 text-xs rounded bg-primaryNew text-white flex items-center justify-center w-20"
                  // onClick={handleChangePassword}
                >
                  {loading ? (
                    <RiLoader5Line
                      size={16}
                      className="animate-spin text-base"
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
