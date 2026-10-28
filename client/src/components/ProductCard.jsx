function ProductCard({ product }) {
  const formattedPrice = Number(product.price).toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-40 items-center justify-center bg-gray-100">
        <span className="text-5xl" aria-hidden="true">
          {product.category === "Beverages"
            ? "☕"
            : product.category === "Grains"
              ? "🌾"
              : product.category === "Dairy"
                ? "🥛"
                : product.category === "Electronics"
                  ? "🎧"
                  : "👕"}
        </span>
      </div>

      <div className="p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-700">
          {product.category}
        </p>

        <h2 className="mb-3 line-clamp-2 min-h-12 text-lg font-semibold text-gray-900">
          {product.name}
        </h2>

        {product.description && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <p className="text-lg font-bold text-gray-900">
            KSh {formattedPrice}
          </p>

          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
            Available
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;