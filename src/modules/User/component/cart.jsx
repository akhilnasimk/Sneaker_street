import { useContext, useEffect, useLayoutEffect, useState } from "react"
import {CartContext} from "../context/cartContext"
import logo from "../../../assets/slogo.png"
import Api from "../../../Api_path/api"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import SecondNav from "../navbar/navbar"

function Cart(){
    let {User}=Api();
    let {cartS,setCartS} =useContext(CartContext)
    let navig=useNavigate()
    let [total,setTotal]=useState([])
    useEffect(() => {
        if (cartS && cartS.length > 0) { //cheking ig context hav value 
            const newCart = cartS.map(val => (                        //creating a new object with contexts properties and new key quantity 
              {...val,quantity: total.find(item => item.id === val.id)?.quantity || 1})); //while creating we need to check if some of the object had a prevous quantiy else go with 1
            setTotal(newCart);  //setting new object to total 
        } else {
            setTotal([]);
        }
    }, [cartS]); //when the cart context changes this will work

    useEffect(()=>{
      if(!JSON.parse(localStorage.getItem("Localuser")).islogedin){
        navig("/userLogin")
      }
    },[])

    async function removeFromCart(id){
        console.log(id)
        const newCart = cartS.filter(val=>val.id!=id);
        setCartS(newCart);
        setTotal(prev => prev.filter(val=>val.id!=id)); // Also update total state
        
        let val= await axios.patch(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`,{
          cart: newCart
        })
        console.log(val)
    }

    function incre(id){
        setTotal((prev)=>prev.map((val)=>{ //maping through the prev object 
            if(val.id==id &&val.count> val.quantity){ //finding the object that changed quantity 
              // console.log(val);
                return {...val, quantity: val.quantity + 1};  //change the old quantily +1 (spreading is importent )
            }
            return val; //else return old object 
        }))
    }

    function decre(id){
        setTotal((prev)=>prev.map((val)=>{
            if(val.id==id && val.quantity > 1){
                return {...val, quantity: val.quantity - 1};
            }
            return val;
        }))
    }

    const calculateSubtotal = () => {
        return total.reduce((sum, product) => sum + (product.price * product.quantity), 0); //to get total we reduce loop through the object and add up the product.price * quanity if 100 is 3 quantity total will add 300
    }

    return(
        <>
     <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-12 lg:px-24 py-6">
  <SecondNav></SecondNav>

  {/* Spacer for fixed navbar */}
  <div className="h-24 mt-16"></div>

  {/* Main Content */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Left: Cart Items */}
    <div className="lg:col-span-2">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center md:text-left">
        Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {total.map((product) => (
          <div key={product.id} className="bg-gray-900 rounded-xl p-5 border border-gray-700 hover:border-violet-500 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
            <Link to={`/Pdetails/${product.id}`}>
            <div className="aspect-square w-full bg-gray-800 rounded-xl mb-4 overflow-hidden">
              <img src={product.images} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            </Link>
            <h2 className="text-xl font-bold mb-3">{product.name}</h2>
            <p className="text-gray-400 text-sm mb-5 line-clamp-2">{product.description}</p>

            {/* Price + Quantity + Remove */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-violet-400 font-bold text-lg">${product.price.toLocaleString()}</span>
                <div className="text-sm text-gray-400">Total: ${(product.price * product.quantity).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => decre(product.id,product)} disabled={product.quantity <= 1 } className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-gray-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed">−</button>
                <span className="w-6 text-center font-semibold">{product.quantity}</span>
                <button onClick={() => incre(product.id)} disabled={product.count <=product.quantity} className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-gray-700 active:scale-95 transition">+</button>
              </div>
            </div>

            {/* Remove Button */}
            <button onClick={() => removeFromCart(product.id)} className="mt-4 w-full bg-red-600 py-2 rounded-lg font-bold hover:bg-red-700 transition active:scale-95">
              Remove from Cart
            </button>
          </div>
        ))}

        {total.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-xl">Your cart is empty</p>
            <Link to="/products" className="inline-block mt-4 px-6 py-3 bg-violet-600 rounded-lg hover:bg-violet-700 transition">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>

    {/* Right: Summary - Fixed only on large screens */}
    <div className="lg:col-span-1">
      <div className="lg:fixed lg:top-28 lg:w-[320px] xl:w-[360px] w-full mt-12">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-300">
              <span className="text-lg">Items ({total.reduce((sum, p) => sum + p.quantity, 0)})</span>
              <span className="text-lg font-bold">€{calculateSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-lg">Shipping</span>
              <span className="text-green-400 text-lg">Free</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t border-gray-700 pt-4">
              <span>Total</span>
              <span>€{calculateSubtotal().toLocaleString()}</span>
            </div>
          </div>
          <Link to={'/Buynow'} state={total}>
          <button className="w-full bg-violet-600 py-4 rounded-xl font-bold text-lg hover:bg-violet-700 transition active:scale-95" disabled={total.length === 0}>
            {total.length === 0 ? 'Cart Empty' : 'Buy Now'}
          </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default Cart