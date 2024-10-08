"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import bcrypt from "bcryptjs"

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:9000/auth/login", {
        email
      });
      
      const isValid = bcrypt.compareSync(password, response.data.password); 
      

      if (isValid) {
        toast(`Hi ${response.data.name}`);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="flex flex-col gap-2 p-6 bg-white rounded-sm shadow-md *:text-black">
        <input
          className="border p-2 w-[300px]"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="border p-2 w-[300px]"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="p-2 mt-6 text-white bg-green-500 rounded-md"
          onClick={() => login(email, password)}
        >
          Submit
        </button>
        <button
          onClick={() => router.push("/register")}
          className="mt-3 text-xs"
        >
          register
        </button>
      </div>
    </div>
  );
};

export default Page;
