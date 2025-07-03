import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../components/utils/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";
import PremiumCard from "../components/card/PremiumCard";
import CommentSection from "../components/comment/CommentSection";
import { Spinner } from "flowbite-react";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.user.currentUser);

  const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  const addToCartHandler = () => {
    if (!currentUser) {
      return navigate("/login");
    }
    dispatch(addToCart(product));
  };

  const buyNowHandler = () => {
    if (!currentUser) {
      return navigate("/login");
    }
    dispatch(addToCart(product));
    navigate("/shoppingList");
  };

  const isProductInCart = cartItems.some((item) => item._id === productId);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const productResponse = await fetch(
          `${API_URL}/api/product/${productId}`
        );
        if (!productResponse.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await productResponse.json();
        setProduct(productData.data);

        const relatedResponse = await fetch(
          `${API_URL}/api/product/all?categoryName=${productData.data.category.name}&perPage=6`
        );
        if (!relatedResponse.ok) {
          throw new Error("Failed to fetch related products");
        }
        const relatedData = await relatedResponse.json();
        setRelatedProduct(relatedData.products);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [productId]);

  if (loading) {
    return (
      <div className="py-32 min-h-screen flex justify-center items-center dark:bg-gray-900">
        <Spinner
          aria-label="Extra large spinner example"
          size="xl"
          className="text-blue-500 dark:text-blue-400"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getColorClass = (color) => {
    switch (color.trim().toLowerCase()) {
      case "red":
        return "bg-red-400";
      case "blue":
        return "bg-blue-400";
      case "olive":
        return "bg-green-600";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="font-sans py-32 px-5 min-h-screen dark:bg-gray-900">
      <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="w-full text-center">
            <img
              src={product?.productImage || ""}
              alt="Product"
              className="lg:w-11/12 w-full h-[600px] rounded-xl object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-50">
              {product.name}
            </h2>
            <p className="text-gray-400 mt-2">Well-Versed Commerce</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-50 mt-4">
              ${product.price}
            </p>
            <div className="flex gap-4 my-6">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold rounded"
                onClick={buyNowHandler}
                disabled={isProductInCart}
              >
                Buy now
              </button>
              <button
                type="button"
                className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent dark:hover:bg-gray-600 dark:hover:text-gray-50 text-gray-800 dark:text-gray-50 text-sm font-bold rounded"
                onClick={addToCartHandler}
                disabled={isProductInCart}
              >
                {isProductInCart ? "Already in Cart" : "Add to Cart"}
              </button>
            </div>

            {/* Sizes */}
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-50 mt-8">
              Choose a Size
            </h3>
            <div className="flex flex-wrap gap-4 mt-4">
              {product.size[0]?.match(/[a-zA-Z]+/g)?.map((size, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-12 h-12 border-2 hover:border-gray-800 font-bold text-sm rounded-full flex items-center justify-center"
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Colors */}
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-50 mt-8">
              Choose a Color
            </h3>
            <div className="flex flex-wrap gap-4 mt-4">
              {product.color[0]?.match(/[a-zA-Z]+/g)?.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-12 h-12 border-2 border-white hover:border-gray-800 rounded-full ${getColorClass(
                    color
                  )}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Description + Comments */}
        <div className="mt-24 max-w-4xl">
          <ul className="flex border-b">
            <li className="text-gray-600 dark:text-gray-50 font-bold py-4 px-6 block hover:text-blue-500 border-b-2 border-blue-500">
              <a href="#description">Description</a>
            </li>
            <li className="text-gray-500 hover:text-blue-500 font-bold py-4 px-6 block">
              <a href="#reviews">Reviews (8)</a>
            </li>
          </ul>
          <div id="description" className="mt-8">
            <h4 className="text-xl font-semibold mb-4">Product Description</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="py-2">
            <CommentSection productId={productId} />
          </div>
        </div>

        {/* Related products */}
        <div className="pt-10">
          <h2 className="text-xl font-bold dark:text-white mb-5">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProduct.map((prod) => (
              <PremiumCard key={prod._id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
