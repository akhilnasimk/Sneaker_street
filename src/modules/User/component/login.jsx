import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../../../Api_path/api";
import { toast } from "react-toastify";

function UserLogin() {
  console.log(JSON.parse(localStorage.getItem("Localuser")));
  let navig = useNavigate();
  let { User } = Api();
  let [loginD, setLoginD] = useState({ email: "", password: "", });
  let localuser=JSON.parse(localStorage.getItem("Localuser"))
  useEffect(() => {
    if (localuser.islogedin && localuser.isAdmin==false ) {
      navig("/products");
    }
    else if(JSON.parse(localStorage.getItem("Localuser")).islogedin==true && JSON.parse(localStorage.getItem("Localuser")).isAdmin==true ){
      navig("/AdminDash")
    }
  }, []);

  async function check() {
    if (loginD.email !== "" && loginD.password !== "") {
      let available = await axios.get(User + `?email=${loginD.email}&&password=${loginD.password}`);
      let b = available.data;
      console.log(b[0].isBlock);
      if (available.data.length != 0  && b[0].isBlock===false)  {
        let a = available.data;
        localStorage.setItem("Localuser", JSON.stringify({ islogedin: true, userId: a[0].id, isAdmin: a[0].isAdmin  }));
        console.log(JSON.parse(localStorage.getItem("Localuser")));
        toast.success("Login successful")
        if(a[0].isAdmin==true){
          navig("/AdminDash");
        }
        else{
          navig("/products");
        }
        
      } else if(b[0].isBlock==true){
        toast.error("You have been blocked by Admin");
      }else{
          toast.error("user not availabel");
      }
    } else {
      toast.error("fill the form ");
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-950">
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 my-auto bg-gray-900 md:bg-transparent relative md:static min-h-[50vh] sm:min-h-screen">
          <div className="md:hidden absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 flex animate-scrollCarousel">
              <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80')] bg-cover bg-center opacity-90"></div>
              <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-90"></div>
              <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80')] bg-cover bg-center opacity-90"></div>
              <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80')] bg-cover bg-center opacity-90"></div>
            </div>
            <div className="absolute inset-0 bg-black/70"></div>
          </div>

          <div className="w-full max-w-md relative z-10">
            <div className="flex justify-center mb-6">
              <div className="h-1 w-12 bg-purple-500 rounded-full"></div>
            </div>
            <h1 className="text-2xl font-bold text-center text-white mb-2">Welcome to <span className="text-purple-400">Sneaker_Street</span></h1>
            <p className="text-gray-400 text-center mb-8">Sign in to your account</p>

            <form className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">EMAIL</label>
                <input type="email" name="email" onChange={(e) => { setLoginD((prev) => ({ ...prev, [e.target.name]: e.target.value, })); }} className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-600" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">PASSWORD</label>
                <input type="password" name="password" onChange={(e) => { setLoginD((prev) => ({ ...prev, [e.target.name]: e.target.value, })); }} className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-600" placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between">
                <Link to={'/forgot_pass'}>
                  <button className="text-sm text-purple-400 hover:text-purple-300">Forgot password?</button>
                </Link>
              </div>
              <button type="button" onClick={check} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500">Login</button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6">Don't have an account? <Link to="/UserRegister" className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">Register</Link></p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 flex animate-scrollCarousel">
            <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80')] bg-cover bg-center opacity-90"></div>
            <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80')] bg-cover bg-center opacity-90"></div>
            <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80')] bg-cover bg-center opacity-90"></div>
            <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center opacity-90"></div>
            <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1600269453470-5a5caba5c4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center opacity-90"></div>
            <div className="min-w-full h-full bg-[url('https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80')] bg-cover bg-center opacity-90"></div>
          </div>

          <div className="absolute bottom-10 left-10 right-10 z-10 text-white">
            <p className="text-xl font-light mb-2">Leave your competition in the queue.</p>
            <p className="text-sm text-gray-300">Consistent speed and maintenance means you'll always prevail at checkout.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
      </div>

      <style global={true}>{`
        @keyframes scrollCarousel {
          0%, 25% { transform: translateX(0); }
          25.01%, 50% { transform: translateX(-100%); }
          50.01%, 75% { transform: translateX(-200%); }
          75.01%, 100% { transform: translateX(-300%); }
        }
        .animate-scrollCarousel { animation: scrollCarousel 12s infinite ease-in-out; }
      `}</style>
    </>
  );
}

export default UserLogin;