import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiLoader5Line } from "react-icons/ri";
import toast from "react-hot-toast";

const MyAccountPage = () => {
  const { user } = useUserContext();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
              fontSize:"12px"
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
    <div className="">
      <div className="p-4 flex flex-col gap-4 sm:px-16">
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
              value={name}
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
              value={email}
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
    </div>
  );
};

export default MyAccountPage;
