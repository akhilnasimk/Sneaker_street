import React from "react";
import Api from "../../../../Api_path/api";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddProduct() {
  let { Product } = Api();

  // ✅ Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      count: 0,
      category: "",
      images: "",
      isActive: true,
      created_at: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      category: Yup.string().required("Category is required"),
      price: Yup.number().min(1, "Price must be greater than 0").required("Price is required"),
      count: Yup.number().min(1, "Count must be at least 1").required("Count is required"),
      created_at: Yup.date().required("Created date is required")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        let res = await axios.post(Product, values);
        console.log(res);
        alert("✅ Product added successfully!");
        resetForm();
      } catch (err) {
        console.error(err);
        alert("❌ Failed to add product");
      }
    }
  });

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
      <div className="max-w-3xl mx-auto mt-30">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Sneaker Street
          </h1>
          <p className="text-sm text-gray-400">Admin Dashboard</p>
        </div>

        <h2 className="text-xl font-bold text-white mb-6">Add New Product</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 space-y-6"
        >
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Product Name</label>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 text-white"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Category</label>
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 text-white"
              >
                <option value="">Select category</option>
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
                <option value="puma">Puma</option>
                <option value="newbalance">New Balance</option>
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.category}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Price</label>
              <input
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min={1}
                type="number"
                placeholder="Enter price"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 text-white"
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
              )}
            </div>

            {/* Count */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Count</label>
              <input
                name="count"
                value={formik.values.count}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min={1}
                type="number"
                placeholder="Enter count"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 text-white"
              />
              {formik.touched.count && formik.errors.count && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.count}</p>
              )}
            </div>

            {/* Created At */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Created At</label>
              <input
                name="created_at"
                value={formik.values.created_at}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="date"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 text-white"
              />
              {formik.touched.created_at && formik.errors.created_at && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.created_at}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              rows="3"
              placeholder="Enter product description"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 text-white resize-none"
            />
          </div>

          {/* Image Link */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Product Image Link</label>
            <input
              type="url"
              name="images"
              value={formik.values.images}
              onChange={formik.handleChange}
              placeholder="Enter image URL (https://example.com/image.jpg)"
              className="w-full px-4 py-3 border-2 rounded-lg bg-gray-800/40 border-purple-400 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <p className="text-gray-400 text-xs mt-2">
              Paste the online link of the product image
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-5 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-purple-400 hover:text-white"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
