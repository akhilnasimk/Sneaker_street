import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import {CartContext} from "../context/cartContext";
import Api from "../../../Api_path/api";
import axios from "axios";
import logo from "../../../assets/slogo.png";
import { toast } from "react-toastify";
import SecondNav from "../navbar/navbar";

function ProductDetails() {
  const navig = useNavigate();
  const {id} =useParams()
  const [detail, setDetail] = useState({});
  const { cartS, setCartS } = useContext(CartContext);
  const { Product, User } = Api();

  useEffect(() => {
    async function sett() {
      let a= await axios.get(Product+`/${id}`);
      console.log(a.data)
      setDetail(a.data);
    }
    sett();
  }, []);

  async function AddCart(id) {
    if (JSON.parse(localStorage.getItem("Localuser")).userId === "") {
      navig("/Userlogin");
    } else {
      const product = await axios.get(Product + `/${id}`);
      if (!cartS.find(val => val.id === id)) {
        setCartS(prev => [...prev, product.data]);
        const Produ = await axios.get(Product + `/${id}`);
        const usrid = JSON.parse(localStorage.getItem("Localuser"));
        const Usr = await axios.get(User + `/${usrid.userId}`);
        const Patch = await axios.patch(User + `/${usrid.userId}`, { cart: [...Usr.data.cart, Produ.data] });
        console.log(Patch.data);
        toast.success(`${product.data.name} has added to cart`)
      } else toast.warning("Item is already in the cart");
    }
  }

  return (
    <>
      <SecondNav></SecondNav>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 py-10">
        <div className="max-w-6xl w-full bg-gray-900 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
          <div className="flex items-center justify-center p-8 bg-gray-800 relative">
          
            <img src={detail.images} alt={detail.name} className="rounded-xl w-full h-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" />
            <button className="absolute top-6 right-6 p-3 bg-gray-700/70 rounded-full hover:bg-pink-500 transition-all shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{detail.name}</h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">{detail.description}</p>
              <div className="space-y-3 text-base">
                <p className="text-gray-400">Added on: <span className="font-medium">{detail.created_at}</span></p>
                <p className="text-gray-400">Category: <span className="font-medium capitalize">{detail.category}</span></p>
                <p className="text-gray-400">Stock:<span className={`${detail.count > 0 ? "text-green-400" : "text-red-400"} font-semibold`}>{detail.count > 0 ? `${detail.count} available` : "Out of Stock"}</span></p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-4xl font-extrabold text-yellow-400 mb-6">₹{detail.price}</p>
              {detail.count>0 ? (
                <>
                  <button onClick={() => AddCart(detail.id)} className="w-full py-4 text-lg bg-yellow-400 text-black rounded-2xl font-semibold hover:bg-yellow-500 transition-all shadow-lg">Add to Cart</button>
                  <Link to={"/Buynow"} state={[{ ...detail, quantity: 1 }]}>
                    <button className="w-full py-4 text-lg bg-pink-500 text-white rounded-2xl font-semibold hover:bg-pink-600 transition-all shadow-lg">Buy Now</button>
                  </Link>
                </>
              ) : (
                <button disabled className="w-full py-4 text-lg bg-gray-600 text-gray-300 rounded-2xl font-semibold cursor-not-allowed">Not Available</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
