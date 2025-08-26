import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../Api_path/api";
import { ProductContext } from "../AdminContext/ProductC";
import { OrderContext } from "../AdminContext/OrderC";
import TopProducts from "./DashComponents/Chart1";
import OrderStatusChart from "./DashComponents/RoundChart";
import HourlySalesChart from "./DashComponents/DailyChart";
import UserDetails from "./DashComponents/UserGoodWilling";

function AdminDash() {
  let navig=useNavigate();
  let {Products,setProducts}=useContext(ProductContext);
  let {Order,setOrder,Sales}=useContext(OrderContext)
  let [users,setUsers]=useState([])
  let {User}=Api();
  useEffect(()=>{
      async function getusers() {
        let res=await axios.get(User);
        let totalUser=res.data.filter(val=>val.id!=JSON.parse(localStorage.getItem("Localuser")).userId);
        setUsers(totalUser)
      }
      getusers();
  },[])
  
  return (
    <div className="p-6 lg:p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
  {/* Enhanced background elements with animations */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
    
    {/* Floating particles */}
    {[...Array(15)].map((_, i) => (
      <div key={i} className="absolute rounded-full animate-float" style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 10 + 2}px`,
        height: `${Math.random() * 10 + 2}px`,
        backgroundColor: i % 3 === 0 ? 'rgba(120, 119, 198, 0.3)' : i % 3 === 1 ? 'rgba(236, 72, 153, 0.3)' : 'rgba(6, 182, 212, 0.3)',
        animationDuration: `${Math.random() * 10 + 10}s`,
        animationDelay: `${Math.random() * 5}s`
      }}></div>
    ))}
  </div>

  {/* Header */}
  <div className="mb-8 relative z-10">
    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
      Sneaker Street
    </h1>
    <p className="text-base text-gray-400 mt-2">Dashboard Overview</p>
  </div>

  {/* Stats Grid - Top 4 cards (enlarged) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
    {[
      { 
        title: "Total Products", 
        value: Products.length, 
        icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", 
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-500/10",
        shadowColor: "shadow-blue-500/25",
        route: "/AllProducts",
        buttonColor: "bg-blue-600 hover:bg-blue-500"
      },
      { 
        title: "Total Users", 
        value: users.length, 
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", 
        gradient: "from-emerald-500 to-teal-500",
        bg: "bg-emerald-500/10",
        shadowColor: "shadow-emerald-500/25",
        route: "/Users",
        buttonColor: "bg-emerald-600 hover:bg-emerald-500"
      },
      { 
        title: "Net Sales", 
        value: "$ "+Sales, 
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", 
        gradient: "from-purple-500 to-pink-500",
        bg: "bg-purple-500/10",
        shadowColor: "shadow-purple-500/25",
        route: "/SalesReport",
        buttonColor: "bg-purple-600 hover:bg-purple-500"
      },
      { 
        title: "Total Orders", 
        value: Order.length, 
        icon: "M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16 5 16H17M17 13V16",
        gradient: "from-amber-500 to-orange-500",
        bg: "bg-amber-500/10",
        shadowColor: "shadow-amber-500/25",
        route: "/AllOrders",
        buttonColor: "bg-amber-600 hover:bg-amber-500"
      }
    ].map((stat, index) => (
      <div key={index} className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 hover:scale-[1.02] ${stat.shadowColor} group relative overflow-hidden`}>
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 from-white to-transparent"></div>
        
        <div className="flex items-center mb-4">
          <div className={`rounded-xl ${stat.bg} p-3 mr-4 border border-slate-600 group-hover:scale-110 transition-transform duration-300`}>
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">{stat.title}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        </div>
        <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden mb-3">
          <div className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000`} style={{width: `${Math.floor(Math.random() * 40) + 60}%`}}></div>
        </div>
        <button
          onClick={() => navig(stat.route)}
          className={`w-full py-2 ${stat.buttonColor} text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center group/button relative overflow-hidden`}
        >
          <span className="relative z-10">See More</span>
          <svg className="w-4 h-4 ml-1 group-hover/button:translate-x-1 transition-transform duration-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    ))}
  </div>

  {/* Main Content Grid - 2 cards per row */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
    
    {/* Recent Orders Table Card */}
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
          <button
            onClick={() => navig("/AllOrders")}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center"
          >
            View All
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-700/60 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {Order.slice(0, 5).map((order, index) => (
              <tr key={index} className="hover:bg-slate-700/30 transition-colors duration-200 group/row">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white group-hover/row:text-purple-300 transition-colors">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 group-hover/row:text-white transition-colors">{order.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full transition-all duration-200 ${
                      order.status === 'Delivered' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30 group-hover/row:bg-green-500/30 group-hover/row:shadow-sm group-hover/row:shadow-green-500/20' 
                        : order.status === 'Processing' 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover/row:bg-blue-500/30 group-hover/row:shadow-sm group-hover/row:shadow-blue-500/20'
                        : order.status === 'Pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover/row:bg-amber-500/30 group-hover/row:shadow-sm group-hover/row:shadow-amber-500/20'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30 group-hover/row:bg-red-500/30 group-hover/row:shadow-sm group-hover/row:shadow-red-500/20'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white group-hover/row:text-purple-300 transition-colors">
                  ${order.product.reduce((total, val) => total + val.price * val.quantity, 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-slate-700/50 bg-slate-800/20">
        <span className="text-sm text-slate-400">Showing {Math.min(5, Order.length)} of {Order.length} orders</span>
      </div>
                {/* Hourly Sales Chart */}
    <HourlySalesChart/>
    </div>
    
    {/* Top Products Card */}
    <TopProducts></TopProducts>
    

    
    {/* Order Status Chart */}
    <OrderStatusChart/>
    <UserDetails></UserDetails>
  </div>

  {/* Add these styles for animations */}
  <style>{`
    @keyframes float {
      0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
      50% { transform: translateY(-10px) rotate(5deg); opacity: 1; }
      100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
    }
    @keyframes pulse-slow {
      0% { opacity: 0.4; }
      50% { opacity: 0.7; }
      100% { opacity: 0.4; }
    }
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-float { animation: float 8s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    .animate-gradient { 
      background-size: 200% auto;
      animation: gradient 3s linear infinite; 
    }
  `}</style>
</div>
  );
}

export default AdminDash;