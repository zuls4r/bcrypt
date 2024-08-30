"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async (name, email, password) => {

    const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const response = await axios.post("http://localhost:9000/auth/register", {
        name,
        email,
        password:hashedPassword
      });
      toast.success(response.data.message);
      console.log(response.data.newUser);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="flex flex-col gap-2 p-6 bg-white rounded-sm shadow-md *:text-black">
        <input
          className="border p-2 w-[300px]"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          className="p-2 mt-6 text-white bg-blue-500 rounded-md"
          onClick={() => register(name, email, password)}
        >
          sign up
        </button>
        <button onClick={() => router.push("/")} className="mt-3 text-xs">
          login
        </button>
      </div>
    </div>
  );
};

export default Page;
