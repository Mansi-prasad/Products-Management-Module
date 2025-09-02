"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminIndex() {
  const [products, setProducts] = useState([]);

  async function load() {
    const res = await fetch(`${API}/api/admin/products`);
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function doDelete(id) {
    if (!confirm("Soft-delete this product?")) return;
    await fetch(`${API}/api/admin/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updated_by: "admin" }),
    });
    load();
  }

  async function togglePublish(productId) {
    // Find product first (from current state)
    const product = products.find((p) => p.product_id === productId);
    if (!product) return;

    const newStatus = product.status === "Published" ? "unpublish" : "publish";

    setProducts((prev) =>
      prev.map((p) =>
        p.product_id === productId
          ? {
              ...p,
              status: newStatus === "publish" ? "Published" : "Draft",
            }
          : p
      )
    );

    try {
      const res = await fetch(
        `${API}/api/admin/products/${productId}/${newStatus}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updated_by: "admin" }),
        }
      );

      if (!res.ok) throw new Error("Failed to update product");
      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) => (p.product_id === productId ? updated : p))
      );
    } catch (err) {
      console.error(err);
      // Rollback if request failed
      setProducts((prev) =>
        prev.map((p) => (p.product_id === productId ? product : p))
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Products
        </h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <Link href="/admin/new">
            <button className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow-md transition">
              Add New Product
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gray-500 hover:bg-gray-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow-md transition">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border-b border-gray-300">ID</th>
                <th className="text-left p-3 border-b border-gray-300">Name</th>
                <th className="text-left p-3 border-b border-gray-300">
                  Status
                </th>
                <th className="text-left p-3 border-b border-gray-300">
                  Deleted
                </th>
                <th className="text-left p-3 border-b border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.product_id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200">
                    {p.product_id}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    {p.product_name}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <span
                      className={`w-22 inline-block text-center py-2 rounded-full text-white text-sm ${
                        p.status === "Published" ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    {p.is_deleted ? "Yes" : "No"}
                  </td>
                  <td className="p-3 border-b border-gray-200 flex flex-wrap gap-2">
                    <Link href={`/admin/${p.product_id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded transition hover:cursor-pointer">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => togglePublish(p.product_id)}
                      className={`hover:cursor-pointer ${
                        p.status === "Published"
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white font-medium py-1 px-3 rounded transition`}
                    >
                      {p.status === "Published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => doDelete(p.product_id)}
                      className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white font-medium py-1 px-3 rounded transition"
                    >
                      Soft Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
