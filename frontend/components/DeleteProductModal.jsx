"use client";
import { useState } from "react";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function DeleteProductModal({
  isOpen,
  onClose,
  product,
  reload,
}) {
  const [username, setUsername] = useState("admin");
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !product) return null;

  async function handleDelete() {
    try {
      setDeleting(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${product.product_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updated_by: username }),
        }
      );
      reload(product.product_id);
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.message || "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>

        {/* Title */}
        <h2 className="text-xl text-gray-800 mb-4">Delete Product</h2>

        {/* Warning */}
        <div className="flex items-center gap-3 mb-4">
          <ExclamationTriangleIcon className="w-20 h-20 text-red-500 mt-0.5" />
          <div className="text-gray-700 text-sm">
            <p className="text-xl ">Are you sure?</p>
            <p className="my-1 text-gray-500">
              This will soft-delete the product <b>"{product.product_name}"</b>.
              The product will be hidden from the main view but can be recovered
              if needed.
            </p>
          </div>
        </div>

        {/* Product details */}
        <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700 mb-4 space-y-1">
          <h3 className="text-xl font-extralight">Product Details:</h3>
          <p>
            <span className="font-semibold">Name:</span> {product.product_name}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {product.status}
          </p>
          <p>
            <span className="font-semibold">Created by:</span>{" "}
            {product.created_by || "admin"}
          </p>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name/Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {deleting ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
