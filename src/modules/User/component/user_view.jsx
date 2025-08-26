import React, { useState, useEffect, useContext } from "react";
import logo from "../../../assets/slogo.png";
import ads from "../../../assets/ads.mp4";
import axios from "axios";
import Api from "../../../Api_path/api";
import { Link, useNavigate } from "react-router-dom";
import {CartContext} from "../context/cartContext";
import { motion, AnimatePresence } from "framer-motion";
import {wishContext} from "../context/wishContext";
import {OrderContext} from "../context/BuyContext";
import { toast } from "react-toastify";

function ProductP() {
  // console.log(JSON.parse(localStorage.getItem("Localuser")))
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredP, setFilteredP] = useState(products);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchProduct,setSearchProduct] =useState([]);
  const { Product, User } = Api();
  const { cartS, setCartS } = useContext(CartContext);
  const { WishL, setWishL } = useContext(wishContext);
  const { OldOrder, setOldOrder } = useContext(OrderContext);
  let navig = useNavigate();

  useEffect(() => {
    
    async function fetchProducts() {
      let res = await axios.get(Product);
      setProducts(res.data);
      console.log(JSON.parse(localStorage.getItem("Localuser")).userId);
      let CarC = await axios.get(User + `/${JSON.parse(localStorage.getItem("Localuser")).userId}/?cart`);
      setCartS(CarC.data.cart);
      let Wish = await axios.get(User + `/${JSON.parse(localStorage.getItem("Localuser")).userId}`);
      setWishL(Wish.data.wishlist);
      setOldOrder(Wish.data.orders)
    }
    fetchProducts();
  }, [JSON.parse(localStorage.getItem("Localuser")).userId]);
  
  useEffect(() => {
    setFilteredP(products);
  }, [products]);

  const images = [
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sneaker-sale-ads-design-template-b618be55d7cae61775a59ace4b8d93d8_screen.jpg?ts=1686908726",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sneakers-ads-design-template-335c156483b70690b1e48f47fa125c99_screen.jpg?ts=1698748248",
    "https://templates.simplified.co/thumb/26c61013-6702-4b6c-9616-5a270b701161.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/fs/17dc1d147249747.62bec1ded4321.jpg",
    "https://i.pinimg.com/564x/1b/f1/bc/1bf1bcef57b5c0b02c57adfbd96f6b6a.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const getImageStyle = (index) => {
    const diff = (index - currentIndex + images.length) % images.length;
    let translateX = 0, scale = 1, opacity = 1, zIndex = 1;
    if (diff === 0) {
      translateX = 0; scale = 1.2; opacity = 1; zIndex = 3;
    } else if (diff === 1) {
      translateX = 250; scale = 0.9; opacity = 0.5; zIndex = 2;
    } else if (diff === images.length - 1) {
      translateX = -250; scale = 0.9; opacity = 0.5; zIndex = 2;
    } else {
      translateX = 0; scale = 0.8; opacity = 0; zIndex = 0;
    }
    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.7s ease-in-out",
      position: "absolute",
      width: "100%",
      maxWidth: "500px",
      height: "auto",
      maxHeight: "300px",
      objectFit: "cover",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    };
  };
  
  function filt(cate) {
    if (cate == "other") {
      console.log("otherrrr");
      const blocked = ["nike", "adidas", "puma", "newbalance"];
      setFilteredP(products.filter((val) => !blocked.includes(val.category)));
    } else if (cate == "all") {
      console.log("hi");
      setFilteredP(products);
    } else {
      setFilteredP(products.filter((val) => val.category == cate));
    }
  }

  function logout() {
    localStorage.setItem("Localuser", JSON.stringify({ islogedin: false, userId: "", isAdmin: "", }));
    navig("/Userlogin");
  }

  async function AddCart(id) {
    if (JSON.parse(localStorage.getItem("Localuser")).userId == "") {
      navig("/Userlogin");
    } else {
      let product = await axios.get(Product + `/${id}`);
      console.log(product.data);
      if (!cartS.find((val) => val.id == id)) {
        setCartS((prev) => [...prev, product.data]);
        let Produ = await axios.get(Product + `/${id}`);
        // console.log(JSON.parse(localStorage.getItem("Localuser")));
        let usrid = await JSON.parse(localStorage.getItem("Localuser"));
        let Usr = await axios.get(User + `/${usrid.userId}`);
        let Patch = await axios.patch(User + `/${usrid.userId}`, {
          cart: [...Usr.data.cart, Produ.data],
        });
        console.log(Patch.data);
        toast.success(`${product.data.name} has added to Cart`)
      } else {
        toast.error("item is already in the cart");
      }
    }
  }
  
  function iseligible(way) {
    console.log("working");
    if (JSON.parse(localStorage.getItem("Localuser")).islogedin) {
      navig(way);
    } else {
      navig("/Userlogin");
    }
  }
  
  async function addwish(id) {
    if (JSON.parse(localStorage.getItem("Localuser")).userId == "") {
      navig("/Userlogin");
    } else {
      let product = await axios.get(Product + `/${id}`);
      console.log(product.data);
      if (!WishL.find((val) => val.id == id)) {
        setWishL((prev) => [...prev, product.data]);
        let Produ = await axios.get(Product + `/${id}`);
        // console.log(JSON.parse(localStorage.getItem("Localuser")));
        let usrid = await JSON.parse(localStorage.getItem("Localuser"));
        let Usr = await axios.get(User + `/${usrid.userId}`);
        let Patch = await axios.patch(User + `/${usrid.userId}`, {
          wishlist: [...Usr.data.wishlist, Produ.data],
        });
        console.log(Patch.data);
        toast.success(`${product.data.name} has added to cart`)
      } else {
        toast.warning("item is already in the Wish");
      }
    }
  }
  function foo(val){
    console.log(val)
  }
  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between mt-3 ">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Sneaker Street Logo" className="w-36 h-24 object-contain" />
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-md mx-4 ">
            <div className="relative w-full group p-4 ">
              <input
                onFocus={() => setSearchFocused(true)}
                onChange={(e) =>
                  setSearchProduct(
                    products.filter((val) =>
                      val.name.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                  )
                }
                type="text"
                placeholder="Search sneakers..."
                className="w-full px-5 py-2.5 rounded-2xl border border-purple-500/50 bg-gradient-to-r from-black via-gray-900 to-black text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 group-hover:border-purple-400 shadow-lg shadow-purple-900/20"
              />
              <button className="absolute right-8 top-7  text-purple-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>


          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6 text-white">
            {/* Wishlist */}
            <button onClick={() => iseligible("/WishList")}>
              <div className="relative cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-purple-400 mr-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <AnimatePresence mode="popLayout">
                  {WishL.length >= 0 && (
                    <motion.span key={WishL.length} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 20, }} className="absolute -top-2 -right-3 bg-purple-600 text-xs rounded-full px-1.5 py-0.5">
                      {WishL.length == 0 ? 0 : WishL.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>

            {/* Cart */}
            <button onClick={() => iseligible("/Cart")}>
              <div className="relative cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-purple-400 mr-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <AnimatePresence mode="popLayout">
                  {cartS.length >= 0 && (
                    <motion.span key={cartS.length} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 20, }} className="absolute -top-2 -right-3 bg-purple-600 text-xs rounded-full px-1.5 py-0.5">
                      {cartS.length == 0 ? 0 : cartS.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
            
            {/* Orders */}
            <button onClick={() => iseligible("/Orders")}>
              <div className="relative cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-purple-400 mr-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z" />
                </svg>
                <AnimatePresence mode="popLayout">
                  {OldOrder.length >= 0 && (
                    <motion.span key={OldOrder.length} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 20, }} className="absolute -top-2 -right-3 bg-purple-600 text-xs rounded-full px-1.5 py-0.5">
                      {OldOrder.length == 0 ? 0 : OldOrder.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>

            {/* Profile + Logout Dropdown */}
            <div className="group relative">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-50 overflow-hidden">
                <button onClick={logout} className="w-full px-4 py-3 text-left text-white hover:bg-purple-600/50 flex items-center gap-2 transition-colors" disabled={JSON.parse(localStorage.getItem("Localuser")).islogedin == false}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="relative md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white hover:text-purple-400 transition-transform duration-300 hover:scale-110 flex items-center justify-center w-10 h-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden z-50 border border-gray-700">
                <ul className="text-white divide-y divide-gray-700">
                  <li className="flex items-center justify-between px-4 py-3 hover:bg-purple-600/30 cursor-pointer transition-colors">
                    Wishlist <span className="bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{WishL.length}</span>
                  </li>
                  <li className="flex items-center justify-between px-4 py-3 hover:bg-purple-600/30 cursor-pointer transition-colors">
                    Cart <span className="bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartS.length}</span>
                  </li>
                  <li className="flex items-center justify-between px-4 py-3 hover:bg-purple-600/30 cursor-pointer transition-colors">
                    Orders <span className="bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{OldOrder.length}</span>
                  </li>
                  <li>
                    <button className="w-full px-4 py-3 text-left hover:bg-purple-600/30 flex items-center gap-2 transition-colors" disabled={JSON.parse(localStorage.getItem("Localuser")).islogedin == false}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {searchFocused && searchProduct.length > 0 && (
  <div onClick={()=>setSearchFocused(true)} className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-black/95 border border-purple-500/30 rounded-lg shadow-xl z-50 mt-2">
    {searchProduct.slice(0, 5).map((product) => (
      <Link to={`/Pdetails/${product.id}`}>
        <div
        // onClick={()=>foo(val)} 
        key={product.id}
        className="flex items-center p-3 hover:bg-purple-600/20 cursor-pointer border-b border-gray-700 last:border-b-0"
      >
        <img 
          src={product.images} 
          alt={product.name}
          className="w-10 h-10 object-cover rounded mr-3"
        />
        <div>
          <p className="text-white text-sm">{product.name}</p>
          <p className="text-gray-400 text-xs">₹{product.price}</p>
        </div>
      </div>  
    </Link>
      
    ))}
  </div>
)}

      <div className="flex justify-center items-center  relative overflow-hidden h-[400px] mt-36">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`} style={getImageStyle(index)} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Premium Sneaker Collection</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button onClick={() => filt("nike")} className="px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-white/10 border border-white/20 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/20 hover:border-white/30 hover:text-white active:scale-[0.98] transition-all duration-200" type="button">Nike</button>
          <button onClick={() => filt("adidas")} className="px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-white/10 border border-white/20 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/20 hover:border-white/30 hover:text-white active:scale-[0.98] transition-all duration-200" type="button">Adidas</button>
          <button onClick={() => filt("puma")} className="px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-white/10 border border-white/20 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/20 hover:border-white/30 hover:text-white active:scale-[0.98] transition-all duration-200" type="button">Puma</button>
          <button onClick={() => filt("newbalance")} className="px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-white/10 border border-white/20 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/20 hover:border-white/30 hover:text-white active:scale-[0.98] transition-all duration-200" type="button">New Balance</button>
          <button onClick={() => filt("other")} className="px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-white/10 border border-white/20 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/20 hover:border-white/30 hover:text-white active:scale-[0.98] transition-all duration-200" type="button">Others</button>
          <button onClick={() => filt("all")} className="px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-white/10 border border-white/20 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/20 hover:border-white/30 hover:text-white active:scale-[0.98] transition-all duration-200" type="button">All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredP.map((product) => (
            <div key={product.id} className="bg-black/70 text-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-gray-700 hover:border-violet-500 shadow-lg hover:shadow-violet-500/20 relative">
              <button onClick={() => addwish(product.id)} className={`absolute top-2 right-2 z-10 bg-black/80 text-white p-1.5 rounded-full ${WishL.find((val) => val.id === product.id) ? "bg-red-500 text-white hover:bg-red-600" : "bg-black/80 text-white hover:bg-red-500 hover:text-white"}`} title="Add to Wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              {product.count <= 0 && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">SOLD OUT</div>
              )}
              <Link to={`/Pdetails/${product.id}`}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <img src={product.images} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
                </div>
              </Link>
              <div className="p-3 sm:p-4 flex flex-col items-center text-center">
                <h2 className="text-base sm:text-lg font-bold mb-1 line-clamp-1">{product.name}</h2>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 line-clamp-2">{product.description}</p>
                <p className="text-violet-400 text-base sm:text-lg font-bold mb-3">₹{product.price.toLocaleString()}</p>
                <button onClick={() => { AddCart(product.id); }} className={`w-full py-2 sm:py-2.5 px-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-1 ${cartS.find((val) => val.id == product.id) ||product.count <= 0? "bg-gray-600 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"} text-xs sm:text-sm`} disabled={cartS.find((val) => val.id == product.id) ||product.count <= 0}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartS.find((val) => val.id == product.id) ? "Already in the Cart" : product.count <= 0? "Item Sold Out": "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-10 px-4 relative">
        <div className="w-full overflow-hidden relative">
          <video src={ads} autoPlay muted loop playsInline className="w-full h-auto object-cover rounded-lg" style={{ maxHeight: "900px" }} />
        </div>
      </div>
    </div>
    
  );
}

export default ProductP;