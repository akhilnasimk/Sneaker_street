import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Api from "../../../../Api_path/api";
import { UserContext } from "../../AdminContext/UserC";

export default function ManageUser() {
    let {User}=Api()
    const {user,setUser} = useContext(UserContext)
    const [filteredUser, setSearchTerm] = useState(user);
    const [filterStatus, setFilterStatus] = useState("all");
    useEffect(()=>{
        setSearchTerm(user)
    },[user])
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    
    const calculateTotalSpent = (orders) => {
        return orders.reduce((total, order) => {
            if (order.product && Array.isArray(order.product)) {
                return total + order.product.reduce((orderTotal, item) => 
                    orderTotal + (item.price * item.quantity), 0
                );
            }
            return total;
        }, 0);
    };
    
    async function handleBlock(Id,Bstatus){
        setUser(prev=>prev.map(val=>val.id==Id?{...val,isBlock:!Bstatus}:val));
        let res=await axios.patch(User+`/${Id}`,{isBlock:!Bstatus});
        console.log(res.data);
    }

    async function HandleAdmin(id,Astatus) {
        // console.log(Astatus);
        setUser(prev=>prev.map(val=>val.id==id?{...val,isAdmin:!Astatus}:val));
        let res=await axios.patch(User+`/${id}`,{isAdmin:!Astatus});
    }
    function handleSearch(e){
        setSearchTerm(user.filter(val=>val.name.includes(e.target.value.toLowerCase())))
    }

    function handleFilter(value){
        // console.log(user)
        setFilterStatus(value)
        if(value=="all"){
            setSearchTerm(user)
        }
        else if(value=="admin"){
            setSearchTerm(user.filter(val=>val.isAdmin==true));
        }
        else if(value=="blocked"){
            setSearchTerm(user.filter(val=>val.isBlock==true))
        }else{
            setSearchTerm(user.filter(val=>val.isBlock==false))
        }
    }
    return (
        <div className="p-6 lg:p-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                        User Management
                    </h1>
                    <p className="text-lg text-gray-400 mt-3">Manage all registered users</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Total Users</p>
                                <p className="text-white font-bold text-2xl">{user.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg flex items-center justify-center border border-gray-600">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Active Users</p>
                                <p className="text-green-400 font-bold text-2xl">{user.filter(u => !u.isBlock).length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg flex items-center justify-center border border-gray-600">
                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Blocked Users</p>
                                <p className="text-red-400 font-bold text-2xl">{user.filter(u => u.isBlock).length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg flex items-center justify-center border border-gray-600">
                                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Admin Users</p>
                                <p className="text-yellow-400 font-bold text-2xl">{user.filter(u => u.isAdmin).length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-lg flex items-center justify-center border border-gray-600">
                                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-8 mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-5 lg:space-y-0">
                        {/* Search Bar */}
                        <div className="relative flex-1 lg:mr-8">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-7 w-7 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search users by name, email, or ID..."
                                className="block w-full pl-14 pr-6 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-lg text-white placeholder-gray-400 transition-all duration-300"
                                onChange={(e) =>handleSearch(e)}
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="flex space-x-4">
                            <select
                                className="px-6 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-lg text-white transition-all duration-300"
                                value={filterStatus}
                                onChange={(e) => handleFilter(e.target.value.toLowerCase())}
                            >
                                <option value="all">All Users</option>
                                <option value="active">Active Only</option>
                                <option value="blocked">Blocked Only</option>
                                <option value="admin">Admins Only</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                    {filteredUser.map((userData) => (
                        <div
                            key={userData.id}
                            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-8 hover:border-gray-600 transition-all duration-300 group"
                        >
                            {/* User Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                            <span className="text-white font-bold text-xl">
                                                {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                                            </span>
                                        </div>
                                        {(userData.isAdmin === true || userData.id === 1) && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-gray-800">
                                                <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                            {userData.name || 'No Name'} :<span className="text-xl font-bold text-amber-600 group-hover:text-cyan-400 transition-colors">{userData.id==1?"Main Admin":null}</span>
                                        </h3>
                                        <p className="text-gray-400 text-sm">ID: {userData.id}</p>
                                    </div>
                                </div>
                                
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    userData.isBlock 
                                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                                }`}>
                                    {userData.isBlock ? 'Blocked' : 'Active'}
                                </span>
                            </div>

                            {/* User Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm">
                                    <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                    <span className="text-gray-300 truncate">{userData.email}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-400">Joined {formatDate(userData.created_at)}</span>
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-3 bg-gray-700/40 rounded-lg border border-gray-600">
                                    <div className="text-lg font-bold text-blue-400">{userData.orders ? userData.orders.length : 0}</div>
                                    <div className="text-xs text-gray-400">Orders</div>
                                </div>
                                <div className="text-center p-3 bg-gray-700/40 rounded-lg border border-gray-600">
                                    <div className="text-lg font-bold text-green-400">
                                        ${userData.orders ? calculateTotalSpent(userData.orders).toFixed(0) : '0'}
                                    </div>
                                    <div className="text-xs text-gray-400">Spent</div>
                                </div>
                                <div className="text-center p-3 bg-gray-700/40 rounded-lg border border-gray-600">
                                    <div className="text-lg font-bold text-purple-400">{userData.wishlist ? userData.wishlist.length : 0}</div>
                                    <div className="text-xs text-gray-400">Wishlist</div>
                                </div>
                            </div>

                            {/* Cart Items Preview */}
                            {userData.cart && userData.cart.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-300">Cart Items</span>
                                        <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                                            {userData.cart.length}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {userData.cart.length > 0 ? `${userData.cart.length} items in cart` : 'Cart is empty'}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                {userData.id!=1?<>
                                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl text-sm font-medium hover:from-cyan-500 hover:to-blue-500 transition-all duration-300">
                                        View Details
                                    </button>
                                    <button
                                        onClick={()=>handleBlock(userData.id,userData.isBlock)}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                            userData.isBlock
                                                ? 'bg-green-600 hover:bg-green-500 text-white'
                                                : 'bg-red-600 hover:bg-red-500 text-white'
                                        }`}>
                                        {userData.isBlock ? 'Unblock' : 'Block'}
                                    </button>
                                </>:null}

                                { ( userData.id!=1?
                                    <button
                                        onClick={()=>HandleAdmin(userData.id,userData.isAdmin)}
                                        className="px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl text-sm font-medium transition-all duration-300">
                                        {userData.isAdmin==true ? 'Remove Admin' : 'Make Admin'}
                                    </button>:
                                    null
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {user.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">No Users Found</h3>
                        <p className="text-gray-400">Users will appear here when they register.</p>
                    </div>
                )}
            </div>
        </div>
    );
}