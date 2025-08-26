import React, { useContext, useEffect } from "react";
import {wishContext} from "../context/wishContext";
import { Link } from "react-router-dom";
import logo from "../../../assets/slogo.png"; 
import axios from "axios";
import Api from "../../../Api_path/api";
import SecondNav from "../navbar/navbar";

function WishList() {
  const { WishL, setWishL } = useContext(wishContext);
  const {User}=Api();
  useEffect(() => {
    console.log(WishL);
  }, [WishL]);

  const removeFromWishlist = async (id) => {
    await setWishL(WishL.filter((item) => item.id !== id));
    const newWish= await axios.patch(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`,{wishlist:WishL.filter((item) => item.id !== id)});
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-12 lg:px-24 py-24">
    <SecondNav></SecondNav>
    <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg mt-16">
      Wish List
    </h1>
    {WishL.length === 0 ? (
      <p className="text-center text-gray-400">Your wishlist is empty!</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {WishL.map((product) => (
          <div
            key={product.id}
            className="bg-black/50 border border-gray-700 rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl hover:shadow-violet-600/30 transition transform hover:-translate-y-2"
          >
            <img
              src={product.images}
              alt={product.name}
              className="w-56 h-56 object-contain mb-6"
            />
            <h2 className="font-bold text-xl text-center">{product.name}</h2>
            <p className="text-gray-400 text-sm mb-3 text-center">
              {product.description}
            </p>
            <p className="text-violet-400 font-semibold mb-6 text-lg">
              ₹{product.price}
            </p>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="w-full px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-white font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
}

export default WishList;
