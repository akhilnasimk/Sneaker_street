import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import user from "../context/contextU";
import axios from "axios";
import Api from "../../../Api_path/api";
import { toast } from "react-toastify";
function Register() {
  let [res, setRes] = useState({});
  let { User } = Api();
  let userData = useContext(user);
  let navi = useNavigate();
  let [con, setCon] = useState("");
  let [userT, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    isBlock: false,
    cart: [],
    orders: [],
    wishlist: [],
    created_at: Date.now(),
  });
  function change(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function sett() {
    let res = await axios.post(User, userT);
    setRes(res.data);
    console.log("new user added ");
  }
  function add(e) {
    e.preventDefault();
    let userAvailable = false;
    userData.map((val) => {
      val.email == userT.email
        ? (userAvailable = true)
        : (userAvailable = userAvailable);
    });
    if (userAvailable) {
      alert("User with this email already exist ");
    } else {
      if (userT.name != "" && userT.email != "" && userT.password != "") {
        if (userT.password == con) {
          console.log(userT);
          console.log(con);
          console.log(userData);
          sett();
          navi("/Userlogin");
        } else {
          toast.error("password is wrong")
        }
      } else {
        toast.error("User doest exist");
      }
    }
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 flex animate-scrollCarousel">
          <div className="min-w-full h-screen bg-[url('https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80')] bg-cover bg-center opacity-90"></div>
          <div className="min-w-full h-screen bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-90"></div>
          <div className="min-w-full h-screen bg-[url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80')] bg-cover bg-center opacity-90"></div>
        </div>
        <div className="absolute bottom-10 left-10 right-10 z-10 text-white">
          <p className="text-xl font-light mb-2">
            Leave your competition in the queue.
          </p>
          <p className="text-sm text-gray-300">
            Consistent speed and maintenance means you'll always prevail at
            checkout.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      <div className="w-full md:w-1/2 bg-gray-950 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="h-1 w-12 bg-purple-500 rounded-full"></div>
          </div>

          <h1 className="text-2xl font-bold text-center text-white mb-2">
            Join <span className="text-purple-400">Sneaker_Street</span>
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Create your account for exclusive access
          </p>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                FULL NAME
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={(e) => change(e)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-600"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={(e) => change(e)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-600"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={(e) => change(e)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                CONFIRM PASSWORD
              </label>
              <input
                id="confirmPassword"
                type="password"
                onChange={(e) => setCon(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-700 rounded bg-gray-800"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="button"
              onClick={(e) => add(e)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
