"use client";
import Link from "next/link";

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="border-b border-gray-200 p-4 mb-0">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium text-gray-800">
            {product.product_name}
          </div>
          {product.product_desc && (
            <div className="text-gray-500 text-sm mt-1 mb-3">
              {product.product_desc}
            </div>
          )}
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium
            ${
              product.status === "Published"
                ? "bg-green-100 text-green-700"
                : ""
            }
            ${product.status === "Draft" ? "bg-gray-100 text-gray-700" : ""}
            ${product.status === "Archived" ? "bg-red-100 text-red-700" : ""}`}
        >
          {product.status}
        </span>
      </div>

      <div className="text-gray-600 text-xs mt-2">
        <div>Created by: {product.created_by || "admin"}</div>
        {product.updated_at && (
          <div>
            Updated: {new Date(product.updated_at).toLocaleDateString()}{" "}
            {product.updated_by && `by ${product.updated_by}`}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-3">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 text-center bg-blue-100 text-blue-700 font-medium py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.product_id)}
          className="flex-1 text-center bg-red-100 text-red-700 font-medium py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
