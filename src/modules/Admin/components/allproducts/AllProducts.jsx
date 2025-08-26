import React, { useContext, useEffect, useState } from "react";
import Api from "../../../../Api_path/api";
import axios from "axios";
import ProductModal from "./popUp"; 
import { ProductContext } from "../../AdminContext/ProductC";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
    let {Product}=Api()
    let navig=useNavigate()
    let {Products,setProducts}=useContext(ProductContext);
    let [filtP, setFiltP] = useState([])
    let [selectedProduct, setSelectedProduct] = useState(null)
    let [isModalOpen, setIsModalOpen] = useState(false)
    let [page,setPage]=useState(5)
    useEffect(()=>{
        setFiltP(Products);
    },[Products])
    function Catogory(e){
        if (e.target.value === "All Categories") {
            setFiltP(Products);
        } else {
            setFiltP(Products.filter(val => val.category.toLowerCase() === e.target.value.toLowerCase()));
        }
    }

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };
    async function handleDelete(id){
        setProducts(Products.filter(val=>val.id!=id));
        res=await axios.delete(Product+`/${id}`);
        console.log(res.data);
    }
    return (
        <div className="p-6 lg:p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 lg:mb-10">
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Sneaker Street
                    </h1>
                    <p className="text-base text-gray-400 mt-2">Product Management</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 lg:mb-10 space-y-4 sm:space-y-0">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Products</h2>
                    <button
                    onClick={()=>navig("/AddProduct")}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-500/20 text-lg">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Product
                    </button>
                </div>
                
                {/* Filters and Search */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6 lg:p-8 mb-8 lg:mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-5 lg:space-y-0">
                        <div className="relative flex-1 lg:mr-8">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input 
                                onChange={(e) => {
                                    setFiltP(Products.filter(val => val.name.toLowerCase().includes(e.target.value.toLowerCase())))
                                }}
                                type="text" 
                                placeholder="Search products..." 
                                className="block w-full pl-12 pr-5 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-white placeholder-gray-400 transition-all duration-300 text-base" 
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <select onChange={Catogory} className="px-5 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-white transition-all duration-300 text-base">
                                <option value="All Categories">All Categories</option>
                                <option value="nike">Nike</option>
                                <option value="adidas">Adidas</option>
                                <option value="puma">Puma</option>
                                <option value="newbalance">New Balance</option>
                                <option value="diadora">Diadora</option>
                            </select>
                            <select className="px-5 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-white transition-all duration-300 text-base">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Products Table */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border-2 border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th className="px-6 lg:px-8 py-5 text-left text-base font-medium text-gray-400 uppercase tracking-wider">Product</th>
                                    <th className="px-6 lg:px-8 py-5 text-left text-base font-medium text-gray-400 uppercase tracking-wider">Category</th>
                                    <th className="px-6 lg:px-8 py-5 text-left text-base font-medium text-gray-400 uppercase tracking-wider">Price</th>
                                    <th className="px-6 lg:px-8 py-5 text-left text-base font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 lg:px-8 py-5 text-left text-base font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filtP.slice(0,page).map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-700/30 transition-colors duration-200">
                                        <td className="px-6 lg:px-8 py-5">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-16 w-16">
                                                    {product.images ? (
                                                        <img 
                                                            src={product.images} 
                                                            alt={product.name}
                                                            className="h-16 w-16 rounded-xl object-cover border-2 border-gray-600"
                                                        />
                                                    ) : (
                                                        <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border-2 border-gray-600">
                                                            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-5">
                                                    <div className="text-base font-medium text-white">{product.name}</div>
                                                    <div className="text-sm text-gray-400">Stock: {product.count}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 lg:px-8 py-5 text-base text-gray-300 capitalize">{product.category}</td>
                                        <td className="px-6 lg:px-8 py-5">
                                            <span className="text-base font-semibold text-white">${product.price}</span>
                                        </td>
                                        <td className="px-6 lg:px-8 py-5">
                                            <span className={`px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-xl ${
                                                product.isActive 
                                                    ? 'bg-green-500/20 text-green-400 border-2 border-green-500/30' 
                                                    : 'bg-red-500/20 text-red-400 border-2 border-red-500/30'
                                            }`}>
                                                {product.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 lg:px-8 py-5 text-base font-medium">
                                            <div className="flex space-x-4">
                                                <button 
                                                    onClick={() => handleEditClick(product)}
                                                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-500/10"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                onClick={()=>handleDelete(product.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors duration-200 p-2 rounded-lg hover:bg-red-500/10">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 011.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                <td colSpan="5" className="px-6 lg:px-8 py-5 text-center flex justify-center gap-4">
                                    {/* Next Button */}
                                    <button 
                                    onClick={() => setPage(prev => prev + 5)}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                                    >
                                    Next <i className="fas fa-arrow-right ml-2"></i>
                                    </button>

                                    {/* Hide Button */}
                                    <button 
                                    onClick={() => setPage(5)} // Example: reset / hide list
                                    className="px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-xl border border-gray-600 hover:bg-gray-700 hover:text-white transition-all duration-300"
                                    >
                                    <i className="fas fa-eye-slash mr-2"></i> Hide
                                    </button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            <ProductModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />

            {/* Background decorative elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-transparent rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}