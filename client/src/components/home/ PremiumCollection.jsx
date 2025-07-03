import React, { useEffect, useState } from "react";
import PremiumCard from "../card/PremiumCard";
import Skeleton from "../card/Skeleton";

const PremiumCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/product/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // check what field contains the array

        const filtered = (data.products || []).filter(
          (product) =>
            product.category?.name === "Women" &&
            product.category?.type === "Premium"
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col w-full py-10 dark:bg-darkPurple">
      <h2 className="py-10 text-center text-xl font-semibold bg-newarrival dark:text-gray-800 font-serif">
        Premium Women Collection
      </h2>
      <div className="flex flex-wrap justify-evenly gap-5 mt-5">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <PremiumCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default PremiumCollection;
