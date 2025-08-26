import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../AdminContext/OrderC";
import axios from "axios";
import Api from "../../../../Api_path/api";
;

export default function OrderPage() {
    let {User}=Api();
  let { Order, setOrder } = useContext(OrderContext);
  let [ProductFilter,setProductFilter]=useState([]);
  useEffect(() => {
    setProductFilter(Order);
  },[Order]);


  const updateOrderStatus =  (orderId, newStatus,user) => {
    async function getuserCart() {
        // console.log(orderId);
        let res=await axios.get(User+`/${user}`);
        // // console.log(res.data.orders);
        let oldOrder=res.data.orders
        let newOrder= await oldOrder.map(val=>val.id==orderId?{...val,status:newStatus}:val);
        // // console.log(newOrder);
        setOrder((prev)=>prev.map(val=>val.id==orderId?{...val,status:newStatus}:val)); //updating context
        let final=await axios.patch(User+`/${user}`,{orders:newOrder}); //updating database 
        // console.log(final.data);
    }
    getuserCart();
  };


  function search(e){
        setProductFilter(Order.filter(val=>val.name.includes(e.target.value)));
  }

  function filter(e){
    e.preventDefault();
    console.log(e.target.value);
    if(e.target.value=="all"){
        setProductFilter(Order);
    }
    else{
        setProductFilter(Order.filter(val=>val.status==e.target.value));
        console.log(Order.filter(val=>val.status==e.target.value));
    }
  }


  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "fas fa-clock";
      case "processing":
        return "fas fa-cog";
      case "delivered":
        return "fas fa-check-circle";
      case "cancelled":
        return "fas fa-times-circle";
      default:
        return "fas fa-question";
    }
  };

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
          Sneaker Street
        </h1>
        <p className="text-lg text-gray-400 mt-3">Order Management Dashboard</p>
      </div>
  
      {/* Orders Count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 space-y-4 sm:space-y-0">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">Orders</h2>
        <div className="text-xl text-gray-300">
          Total Orders:{" "}
          <span className="font-bold text-purple-400">{Order.length}</span>
        </div>
      </div>
  
      {/* Filters and Search */}
      <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-8 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-5 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 lg:mr-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-7 w-7 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              onChange={(e)=>search(e)}
              type="text"
              placeholder="Search orders by ID, customer, or product..."
              className="block w-full pl-14 pr-6 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-lg text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>
  
          {/* Dropdown Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <select
            onChange={(e)=>filter(e)}
            className="px-6 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-lg text-white transition-all duration-300">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select className="px-6 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-lg text-white transition-all duration-300">
              <option>All Dates</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      </div>
  
      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {ProductFilter.map((order) => (
          <div
            key={order.id}
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-8"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  OrderId: {order.id}
                </h3>
                <p className="text-base text-gray-400">
                  Order Date: {order.orderdate}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`px-4 py-2 rounded-full text-base border mb-3 ${getStatusClass(
                    order.status
                  )}`}
                >
                  <i className={`${getStatusIcon(order.status)} mr-2`}></i>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
  
                {/* MODERN SELECT */}
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.id, e.target.value, order.userId)
                  }
                  className="px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white text-base focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition-all cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
  
            {/* Customer */}
            <div className="flex items-center mb-5">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mr-4 border border-gray-600">
                <svg
                  className="w-7 h-7 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white text-lg">{order.name}</h4>
                <p className="text-base text-gray-400">{order.email}</p>
              </div>
            </div>
  
            {/* Products */}
            <div className="mb-5 space-y-4">
              {order.product.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-gray-700/40 rounded-lg border border-gray-600 flex items-center gap-4"
                >
                  {/* Image */}
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-500">
                    <img
                      src={product.images}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
  
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-200 font-medium text-lg">
                        {product.name}
                      </span>
                      <span className="text-white text-lg">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-base text-gray-400">
                      <span>Qty: {product.count}</span>
                      <span>
                        Size: {Math.floor(Math.random() * (18 - 7 + 1)) + 7}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Footer */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-white">
                $
                {order.product
                  .reduce((total, p) => total + p.price * p.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
}
