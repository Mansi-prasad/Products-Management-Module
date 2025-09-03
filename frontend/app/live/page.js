"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PublishedProductCard from "@/components/PublishedProductCard";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Footer from "@/components/Footer";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/products`);
        console.log(API);
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch published products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [API]);

  return (
    <>
      <div className="flex flex-col bg-gray-50 min-h-screen">
        <main className="flex-1">
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white shadow-md py-5 px-10 mb-2 md:px-28">
            <div className="">
              <h1 className="text-2xl font-semibold text-gray-900">
                Our Products
              </h1>
              <p className="text-gray-500">
                Discover our latest published products
              </p>
            </div>
            <Link href="/">
              <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer">
                <ArrowLeftIcon className="h-6 w-4" />
                <p>Back to Admin</p>
              </div>
            </Link>
          </div>
          {/* Product info */}
          <div className=" py-5 px-10 md:px-28">
            <h1 className="text-xl font-black ">
              Published Products ({products.length})
            </h1>
            <p className="text-gray-500">
              These products are currently live and visible to the public.
            </p>
          </div>
          {/* Product cards */}
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
              </div>
            ) : products.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                No published products yet.
              </p>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6">
                {products.map((product) => (
                  <PublishedProductCard
                    key={product.product_id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
