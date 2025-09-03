"use client";

export default function PublishedProductCard({ product }) {
  return (
    <div
      key={product.product_id}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition "
    >
      {/* Top section  */}
      <div className="flex justify-between space-y-4">
        <div className="">
          <h2 className="text-lg font-semibold text-gray-800">
            {product.product_name}
          </h2>
          {product.product_desc && (
            <p className="text-gray-500 text-xs py-1">{product.product_desc}</p>
          )}
        </div>

        <div>
          {product.status === "Published" && (
            <div>
              <span className="inline-block bg-green-50 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                Live
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Bottom section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-600 text-xs mt-2 gap-2 border-t border-gray-300 pt-4">
        <p>
          Published:
          <span>
            {product.created_at &&
              new Date(product.created_at).toLocaleDateString()}
          </span>
        </p>
        <p>ID: {product.product_id}</p>
      </div>
    </div>
  );
}
