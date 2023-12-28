"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {signIn,useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [user, setUser] = useState({email:"",password:""})
  const onChange = ({target:{name,value}})=>{
      setUser({...user,[name]:value})
  }

  const login = async (e) => {
    e.preventDefault();
    console.log("log");
    // console.log(user.email);
    // console.log(user.password);
    await signIn("email-password-credential", {
      email: user.email,
      password: user.password,
      redirect: false,
      callbackUrl: "/" 
    }).then((result)=>{
      console.log(result);
      if(result?.ok) router.push("/");
      if(result?.error) console.log(result?.error); toast.error(result?.error);
    });
  };

  useEffect(()=>{
    if(sessionStatus === "authenticated"){
      router.push("/");
    }
  },[sessionStatus,router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="flex text-3xl font-bold text-center text-gray-700 justify-center">
          <Image
            src="/smartcastLogo.svg"
            alt="smartcast"
            width={100}
            height={50}
            priority={true}
          />
        </h1>
        <form className="mt-6" onSubmit={login}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.email}
              onChange={onChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.password}
              onChange={onChange}
              required
              autoComplete="off"
            />
          </div>
          <Link
            href="/forget"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don{"'"}t have an account?{" "}
          {/* <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default Login;
