import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Products Management Module
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Use the admin interface to manage products, and the public page to
          view published products.
        </p>

        <ul className="flex flex-col sm:flex-row gap-4 justify-center">
          <li>
            <Link
              href="/products"
              className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition transform hover:scale-105 text-center"
            >
              Live Products (Public)
            </Link>
          </li>
          <li>
            <Link
              href="/admin"
              className="block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition transform hover:scale-105 text-center"
            >
              Admin Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
