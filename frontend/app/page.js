"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { BiShowAlt } from "react-icons/bi";
import EditProductModal from "@/components/EditProductModal";
import NewProductModal from "@/components/NewProductModal";
import DeleteProductModal from "@/components/DeleteProductModal";
import Footer from "@/components/Footer";
const API = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isNewOpen, setNewOpen] = useState(false);

  async function load() {
    const res = await fetch(`${API}/api/admin/products`);
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header section  */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Products Management
              </h1>
              <p className="text-gray-600">
                Manage your product catalog and publishing status
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/live"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-sm"
              >
                <BiShowAlt />
                View Live Site
              </Link>
              <button
                onClick={() => setNewOpen(true)}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-sm"
              >
                Add New Product
              </button>
            </div>
          </div>

          {/* Products section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 md:px-4 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                All Products
              </h2>
            </div>

            {/* Table based products detail for desktop and tablet */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                    <th className="text-left p-3 font-extralight">Product</th>
                    <th className="text-left p-3 font-extralight">Status</th>
                    <th className="text-left p-3 font-extralight">
                      Created By
                    </th>
                    <th className="text-left p-3 font-extralight">
                      Last Updated
                    </th>
                    <th className="text-left p-3 font-extralight">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((p) => (
                      <tr
                        key={p.product_id}
                        className="border-t border-gray-300 hover:bg-gray-50 hover:cursor-pointer text-sm "
                      >
                        {/* Product name and description */}
                        <td className="p-5">
                          <div className="font-medium text-gray-800">
                            {p.product_name}
                          </div>
                          {p.product_desc && (
                            <div className="text-gray-500 text-xs">
                              {p.product_desc}
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td className="p-5">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium
                            ${
                              p.status === "Published"
                                ? "bg-green-100 text-green-700"
                                : ""
                            }
                             ${
                               p.status === "Draft"
                                 ? "bg-gray-100 text-gray-700"
                                 : ""
                             }
                             ${
                               p.status === "Archived"
                                 ? "bg-red-100 text-red-700"
                                 : ""
                             }`}
                          >
                            {p.status}
                          </span>
                        </td>

                        {/* Created By */}
                        <td className="p-5">{p.created_by || "admin"}</td>

                        {/* Last Updated */}
                        <td className="p-4">
                          {new Date(p.updated_at).toLocaleDateString()}
                          {p.updated_by && (
                            <div className="text-gray-500 text-xs">
                              by {p.updated_by}
                            </div>
                          )}
                        </td>
                        {/* Actions */}
                        <td className="p-5 space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(p);
                              setEditOpen(true);
                            }}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(p);
                              setDeleteOpen(true);
                            }}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-4 text-center text-gray-500 italic"
                      >
                        Products not found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Showing products in cards for mobile view */}
            <div className="block sm:hidden">
              {products.length > 0 ? (
                products.map((p) => (
                  <ProductCard
                    key={p.product_id}
                    product={p}
                    onEdit={() => {
                      setSelectedProduct(p);
                      setEditOpen(true);
                    }}
                    onDelete={() => {
                      setSelectedProduct(p);
                      setDeleteOpen(true);
                    }}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 italic">
                  Products not found
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      {isEditOpen && (
        <EditProductModal
          isOpen={isEditOpen}
          onClose={() => setEditOpen(false)}
          product={selectedProduct}
          reload={load}
        />
      )}

      {isDeleteOpen && (
        <DeleteProductModal
          isOpen={isDeleteOpen}
          onClose={() => setDeleteOpen(false)}
          product={selectedProduct}
          reload={load}
        />
      )}
      {isNewOpen && (
        <NewProductModal
          isOpen={isNewOpen}
          onClose={() => setNewOpen(false)}
          reload={load}
        />
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}
