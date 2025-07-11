import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/card/ProductCard";

const AllProducts = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm") || "";
    const sortFromUrl = urlParams.get("sort") || "desc";
    const categoryFromUrl = urlParams.get("category") || "";

    setSidebarData({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });

    const fetchProducts = async () => {
      setLoading(true);

      const queryParams = new URLSearchParams();
      if (searchTermFromUrl)
        queryParams.append("searchTerm", searchTermFromUrl);
      if (sortFromUrl) queryParams.append("sort", sortFromUrl);
      if (categoryFromUrl && categoryFromUrl !== "uncategorized") {
        queryParams.append("category", categoryFromUrl);
      }

      try {
        const res = await fetch(
          `${API_URL}/api/product/search?${queryParams.toString()}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
        setTotalPages(Math.ceil(data.totalProducts / perPage));
      } catch (error) {
        console.error(error);
        setProducts([]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();

    if (sidebarData.searchTerm)
      urlParams.set("searchTerm", sidebarData.searchTerm);
    if (sidebarData.sort) urlParams.set("sort", sidebarData.sort);
    if (sidebarData.category) urlParams.set("category", sidebarData.category);

    navigate(`/search?${urlParams.toString()}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-18 dark:bg-gray-900">
      {/* Sidebar filter */}
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="">All</option>
              <option value="Shirt">Shirt</option>
              <option value="Hoodie">Hoodie</option>
              <option value="Panjabi">Panjabi</option>
              <option value="Jacket">Jacket</option>
              <option value="Skirts">Skirts</option>
              <option value="Gown">Gown</option>
              <option value="T-shirt">T-Shirt</option>
              <option value="Trouser">Sports Trouser</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>

      {/* Products display */}
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Product Results:
        </h1>
        <div className="p-7 flex flex-wrap justify-evenly gap-4">
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading && products.length === 0 && (
            <p className="text-xl text-gray-500">No products found.</p>
          )}
          {!loading &&
            products
              .slice((currentPage - 1) * perPage, currentPage * perPage)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
