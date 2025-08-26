import axios from "axios";
import Api from "../../../../Api_path/api";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductContext } from "../../AdminContext/ProductC";

const ProductModal = ({ isOpen, onClose,product }) => {
  let {Products,setProducts}=useContext(ProductContext)
  let {Product}=Api();
  let [edited,setEdited]=useState({
    id:0,
    name:"",
    description:"",
    price:0,
    count:0,
    category:"",
    images:"",
    isActive:true,
    created_at:""
  })
  useEffect(() => {
    if (product) {
      setEdited({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        count: product.count,
        category: product.category,
        images: product.images,
        isActive: product.isActive,
        created_at: product.created_at,
      });
    }
  }, [product]);
  async function Handlesubmit(){
    let newcont=await Products.map((val,ind,arr)=>{
      if(val.id==product.id){
        return arr[ind]=edited;
      }
      else{
        return val
      }
    })
    setProducts(newcont);
     let res=await axios.put(Product+`/${product.id}`,edited)
     console.log(res);
     onClose();
  }
  function handlechange(e) {
    const { name, value, type } = e.target;
    setEdited(prev => ({
      ...prev,
      [name]: type === "number" &&Number(value)>0? Number(value) : value
    }));
  }

  function handleAvailable(e){
    if(e.target.value){
      e.target.value=="Active"?setEdited((prev)=>({...prev,isActive:true})):setEdited((prev)=>({...prev,isActive:false}))
      
    }
    else{
      setEdited((prev)=>({...prev,isActive:product.isActive}))
    }
  }
  function remove(){
    alert("Removed item");
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Edit Product</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Image Placeholder */}
          <div className="flex justify-center">
            <div className="h-40 w-40 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border-2 border-gray-600">
              <img
              src={product.images}>
              </img>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Product Name</label>
              <input
                onChange={(e)=>handlechange(e)}
                name="name"
                defaultValue={product.name}
                type="text"
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-all duration-300"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Category</label>
              <input
                onChange={(e)=>handlechange(e)}
                name="category"
                defaultValue={product.category}
                type="text"
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-all duration-300"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Price ($)</label>
              <input
                onChange={(e)=>handlechange(e)}
                name="price"
                defaultValue={product.price}
                type="number"
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-all duration-300"
              />
            </div>

            {/* Stock Count */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Stock Count</label>
              <input
                min={0}
                onChange={(e)=>handlechange(e)}
                name="count"
                defaultValue={product.count}
                type="number"
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-all duration-300"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Status</label>
              <select
              onChange={(e)=> handleAvailable(e)}
              name="isActive"
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-all duration-300">
                <option value="def">Select Current Status</option>
                <option value="Active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-3">Image URL</label>
              <input
                onChange={(e)=>handlechange(e)}
                name="images"
                defaultValue={product.images}
                type="url"
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-all duration-300"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-3">Description</label>
              <textarea
                onChange={(e)=>handlechange(e)}
                name="description"
                defaultValue={product.description}
                rows="3"
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-all duration-300 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-xl hover:border-purple-400 hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
          onClick={Handlesubmit}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;