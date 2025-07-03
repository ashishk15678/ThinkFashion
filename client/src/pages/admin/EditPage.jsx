import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    productImage: null,
    price: "",
    stock: "",
    categoryName: "",
    categoryType: "",
    color: "",
    size: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/product/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        const {
          name,
          description,
          price,
          stock,
          category,
          productImage,
          color,
          size,
        } = data.data;

        setProductData({
          name,
          description,
          price,
          stock,
          productImage: null, // for new image
          categoryName: category.name,
          categoryType: category.type,
          color: Array.isArray(color) ? color.join(", ") : color,
          size: Array.isArray(size) ? size.join(", ") : size,
        });
        setImagePreview(productImage); // existing image preview
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle form field changes
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({ ...productData, productImage: file });
      setImagePreview(URL.createObjectURL(file)); // preview new image
    }
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", productData.name);
    data.append("description", productData.description);
    data.append("price", productData.price);
    data.append("stock", productData.stock);
    data.append("category[name]", productData.categoryName);
    data.append("category[type]", productData.categoryType);
    data.append("color", productData.color);
    data.append("size", productData.size);
    if (productData.productImage) {
      data.append("productImage", productData.productImage);
    }

    try {
      const response = await fetch(
        `${API_URL}/api/product/update/${productId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("✅ Product updated successfully!");
        navigate("/dashboard?tab=products");
      } else {
        throw new Error(result.message || "Failed to update product");
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-28 flex flex-col items-center dark:text-white dark:bg-gray-900 min-h-screen px-4">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4 dark:text-black"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="input input-bordered input-accent w-full"
          value={productData.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="textarea textarea-accent"
          placeholder="Product Description"
          onChange={handleChange}
          value={productData.description}
        ></textarea>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Product"
            className="w-24 h-24 object-cover rounded-full mx-auto"
          />
        )}

        <input
          type="file"
          name="productImage"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleImageChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Product Price"
          className="input input-bordered input-accent w-full"
          value={productData.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Product Stock"
          className="input input-bordered input-accent w-full"
          value={productData.stock}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categoryName"
          placeholder="Category Name"
          className="input input-bordered input-accent w-full"
          value={productData.categoryName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categoryType"
          placeholder="Category Type"
          className="input input-bordered input-accent w-full"
          value={productData.categoryType}
          onChange={handleChange}
        />
        <input
          type="text"
          name="color"
          placeholder="Colors (comma-separated)"
          className="input input-bordered input-accent w-full"
          value={productData.color}
          onChange={handleChange}
        />
        <input
          type="text"
          name="size"
          placeholder="Sizes (comma-separated)"
          className="input input-bordered input-accent w-full"
          value={productData.size}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-neutral w-full">
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditPage;
