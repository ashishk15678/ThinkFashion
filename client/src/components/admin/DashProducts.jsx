import React, { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DashProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { accessToken } = useSelector((state) => state.user);
  const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/product/all?page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/api/product/delete/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        alert("Product deleted successfully!");
        fetchProducts();
      } else {
        const text = await res.text();
        throw new Error(text);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product: " + err.message);
    }
  };

  const totalPages = Math.ceil(totalProducts / 9);

  return (
    <div className="table-auto dark:bg-gray-900 overflow-x-scroll md:mx-auto p-3">
      <h2 className="text-center text-lg font-bold py-1 text-gray-800 dark:text-gray-100">
        All Product List
      </h2>

      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
        </Table.Head>

        {products.map((product) => (
          <Table.Body className="divide-y" key={product._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>
                {new Date(product.updatedAt).toLocaleDateString()}
              </Table.Cell>

              {/* ✅ Clickable product image */}
              <Table.Cell>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.productImage}
                    alt={product.name}
                    className="w-20 h-10 object-cover rounded hover:scale-105 transition-transform duration-200"
                  />
                </Link>
              </Table.Cell>

              {/* ✅ Clickable product name */}
              <Table.Cell>
                <Link
                  to={`/product/${product._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {product.name}
                </Link>
              </Table.Cell>

              <Table.Cell>{product.category?.type}</Table.Cell>

              <Table.Cell>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </Table.Cell>

              <Table.Cell>
                <Link
                  className="text-teal-500 hover:underline"
                  to={`/product/edit/${product._id}`}
                >
                  Edit
                </Link>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>

      {/* ✅ Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashProducts;
