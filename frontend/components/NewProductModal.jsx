"use client";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function NewProductModal({ isOpen, onClose, reload }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Draft");
  const [createdBy, setCreatedBy] = useState("admin");

  if (!isOpen) return null;

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: name,
          product_desc: desc,
          status,
          created_by: createdBy,
        }),
      });
      reload();
      onClose();
      // reset
      setName("");
      setDesc("");
      setStatus("Draft");
      setCreatedBy("admin");
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-gray-600 hover:cursor-pointer"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
        {/* Title */}
        <h2 className="text-xl text-gray-800 mb-4">Add New Product</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            {/* Product Name */}
            <label className="block text-gray-700 py-1 text-sm">
              Product Name <span className="text-red-700">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
              placeholder="Enter Product Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
              placeholder="Enter Product Description"
            />
          </div>
          <div>
            <label className="block text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Archived</option>
            </select>
          </div>
          {/* Created by */}
          <div>
            <label className="block text-gray-700 py-1 text-sm">
              Created By
            </label>
            <input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-1.5 rounded hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-4 py-1.5 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
