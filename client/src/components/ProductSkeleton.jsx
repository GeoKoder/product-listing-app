function ProductSkeleton() {
  return (
    <div
      className="animate-pulse rounded-lg border border-gray-200 p-4"
      aria-hidden="true"
    >
      <div className="mb-4 h-5 w-3/4 rounded bg-gray-200" />

      <div className="mb-3 h-4 w-1/2 rounded bg-gray-200" />

      <div className="h-5 w-1/3 rounded bg-gray-200" />
    </div>
  );
}

export default ProductSkeleton;