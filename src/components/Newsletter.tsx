import { useState } from "react";
import newsletter from "../assets/newsletter.svg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { RiLoader5Line } from "react-icons/ri";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubscribe = async () => {
    if (!email) {
      setEmailError("Please enter valid email");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "https://stacklearning-be-h0pq.onrender.com/api/subscribe-newsletter",
        { email }
      );
      setEmail("");
      toast.success("Subscribed successfullly", {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
          fontSize: "12px",
        },
      });
    } catch (err: any) {
      toast.error(err.response.data.message, {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
          fontSize: "12px",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="w-full lg:w-[400px] border p-3 sm:p-5 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-medium text-sm">
              Stay updated with latest jobs
            </h2>
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(null);
            }}
            type="email"
          />
          {emailError && (
            <p className="text-[8px] text-red-500 leading-[0.25] ml-2">
              {emailError}
            </p>
          )}
          <div>
            <button
              className="bg-primaryNew text-white text-xs px-4 py-2 rounded-full"
              onClick={handleSubscribe}
            >
              {loading ? (
                <RiLoader5Line className="animate-spin" size={18} />
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
