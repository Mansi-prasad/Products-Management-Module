"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(`${API}/api/admin/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        alert("Product not found");
        router.push("/admin");
      }
    })();
  }, [id, router]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    await fetch(`${API}/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.product_name,
        product_desc: product.product_desc,
        status: product.status,
        updated_by: "admin",
      }),
    });
    setSaving(false);
    router.push("/admin");
  }

  if (!product)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Product
        </h1>
        <form onSubmit={handleSave} className="space-y-6">
          {/* product name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              value={product.product_name}
              onChange={(e) =>
                setProduct({ ...product, product_name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* product description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description (HTML allowed)
            </label>
            <textarea
              value={product.product_desc || ""}
              onChange={(e) =>
                setProduct({ ...product, product_desc: e.target.value })
              }
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          {/* product status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Status
            </label>
            <select
              value={product.status}
              onChange={(e) =>
                setProduct({ ...product, status: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Archived</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
