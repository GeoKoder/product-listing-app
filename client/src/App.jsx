import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";
import { Toaster, toast } from "sonner";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductCard from "./components/ProductCard";

const categories = ["Beverages", "Grains", "Dairy", "Electronics", "Clothing"];

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and Category filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalProducts: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const result = await getProducts({
          page,
          limit: 10,
          search,
          category,
        });

        toast.success("Products loaded successfully!");
        setProducts(result.data);
        setPagination(result.pagination);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        toast.error("Failed to load products. Please try again.");
        setError("Could not load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, search, category]);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
    setPage(1);
  }

  return (
    <main className="min-h screen bg-gray-50 px-4 py-8 sm:0x-6 lg:px-8">
      <Toaster position="top-right" richColors />
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-700">
            Discover our Collection
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Products
          </h1>

          <p>Explore quality products at great prices.</p>
        </header>

        {/* Swarch and Category filters*/}
        <section className="mb-8 grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-2">
          <div>
            <label
              htmlFor="search"
              className="mb-2 blockl text-sm font-medium text-gray-700"
            >
              Search products
            </label>

            <input
              id="search"
              type="search"
              placeholder="Search by product name..."
              value={search}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label htmlFor="category">Filter by category</label>

            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </section>

        <p>
          {pagination.totalProducts} product
          {pagination.totalProducts === 1 ? "" : "s"} found
        </p>

        {/* Loading, error, empty and product states */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : products.length === 0 ? (
          <p>No products found. Try another search or category.</p>
        ) : (
          <ul>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ul>
        )}

        {/* Pagination controls */}
        {!loading && !error && pagination.totalPages > 0 && (
          <nav aria-label="Product pagination">
            <button
              type="button"
              disabled={!pagination.hasPreviousPage}
              onClick={() => setPage((currentPage) => currentPage - 1)}
            >
              Previous
            </button>

            <span>
              {" "}
              Page {pagination.page} of {pagination.totalPages}{" "}
            </span>

            <button
              type="button"
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((currentPage) => currentPage + 1)}
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}

export default App;
