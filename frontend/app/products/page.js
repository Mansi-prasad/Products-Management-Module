"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API}/api/products`);
      const data = await res.json();
      setProducts(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Live Products
        </h1>

        {products.length === 0 && (
          <p className="text-gray-500 text-center">
            No published products yet.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.product_id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {p.product_name}
              </h2>
              <div className="text-gray-600 prose max-w-none">
                <p className="text-gray-600">{p.product_desc}</p>
              </div>
              <div className="flex items-center justify-end">
                <p className="font-semibold">
                  Created By:
                  <span className="bg-green-100 text-green-900 rounded px-3 ml-3 font-medium">
                    {p.created_by}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
