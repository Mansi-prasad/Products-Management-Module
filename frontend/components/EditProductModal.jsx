"use client";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
export default function EditProductModal({ isOpen, onClose, product, reload }) {
  const [form, setForm] = useState({
    ...product,
    updated_by: product?.updated_by || "admin",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        updated_by: product.updated_by || "admin",
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${product.product_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      setSaving(false);
      reload();
      onClose();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to update product");
    } finally {
      setSaving(false);
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
        <h2 className="text-xl text-gray-800 mb-4">Edit Product</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            {/* Product Name */}
            <label className="block text-gray-700 py-1 text-sm">
              Product Name <span className="text-red-700">*</span>
            </label>
            <input
              value={form.product_name || ""}
              onChange={(e) =>
                setForm({ ...form, product_name: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-gray-700 py-1 text-sm">
              Description
            </label>
            <textarea
              value={form.product_desc || ""}
              onChange={(e) =>
                setForm({ ...form, product_desc: e.target.value })
              }
              rows={4}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
            />
          </div>
          {/* Status */}
          <div>
            <label className="block text-gray-700 text-sm">Status</label>
            <select
              value={form.status || "Draft"}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Archived</option>
            </select>
          </div>
          {/* Updated by */}
          <div>
            <label className="block text-gray-700 py-1 text-sm">
              Updated By
            </label>
            <input
              value={form.updated_by || "admin"}
              onChange={(e) => setForm({ ...form, updated_by: e.target.value })}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-6 py-1.5 rounded hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded hover:cursor-pointer"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
