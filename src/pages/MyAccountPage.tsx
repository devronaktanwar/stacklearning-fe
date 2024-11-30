import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserContext } from "@/context/UserContext"
import { useEffect, useState } from "react"

const MyAccountPage = () => {
    const{user}=useUserContext()
    const[name,setName]=useState<string>("")
    const[email,setEmail]=useState<string>("")
    useEffect(() => {
        if (user) {
          setName(user.fullName);
          setEmail(user.emailAddress);
        }
      }, [user]);
  return (
    <div className="">
        <div className="p-4 flex flex-col gap-4 sm:px-16">
            <div>
                <h2 className="font-medium text-sm">Personal Info</h2>
                <p className="text-xs text-gray-500">Update your personal info</p>
            </div>
            <div className="max-w-full sm:max-w-xs flex flex-col gap-2">
                <div className="w-full">
                    <Label htmlFor="name" className="text-xs font-normal">Name</Label>
                    <Input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="w-full">
                    <Label htmlFor="email" className="text-xs font-normal">Email Address</Label>
                    <Input type="text" id="email"value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <button className="px-3 py-2 text-xs rounded bg-primaryNew text-white">Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyAccountPage