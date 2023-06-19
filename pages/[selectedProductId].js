/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import { AiOutlineRollback } from "react-icons/ai";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import { BsCartPlus } from "react-icons/bs";
import ScrollToTop from "react-scroll-to-top";

import {
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Navbar from "@/components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch } from "react-redux";
import { ADD } from "@/src/redux/actions/action";

const DynamicProductPage = () => {
  const router = useRouter();
  const { selectedProductId } = router.query;
  const [product, setProduct] = useState(null);
 
  const [selectedProducts, setSelectedProducts] = useState([]);

  const btnRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products/${selectedProductId}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
   

    if (selectedProductId) {
      fetchProduct();
    }
  }, [selectedProductId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, price, images, description, category, brand, stock, rating } =
    product;
    function addToCart(product) {
    setSelectedProducts([...selectedProducts, product]);
    console.log(product);
    dispatch(ADD(product));
    toast("Item added to cart");
  }

  const removeFromCart = (productId) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product.id !== productId
    );
    setSelectedProducts(updatedProducts);
  };

  return (
    <div className=" text-white  ">
      <div
        className="dynamic sm:px-[2rem] md:px-[2rem] lg:px-[3rem]  xl:px-[10rem] h-[500px] pt-5  bg-center  bg-no-repeat bg-auto  "
        style={{ backgroundImage: `url(${images[0]})` }}
      >
        <Navbar
          selectedProducts={selectedProducts}
          removeFromCart={removeFromCart}
        />
        <div className="relative sm:text-[20px] lg:text-[35px] 3xl:text-[40px] flex flex-col mt-[130px] z-[4] text-center ">
          {title}
        </div>
      </div>
      <div className="bg-[#171717]  pt-[4rem] sm:px-4 md:px-[2rem] lg:px-[3rem]  xl:px-[10rem]">
        <div>
          <a href="/" className="flex">
            <AiOutlineRollback className="mt-1 mr-3" /> Home
          </a>
        </div>
        <div className="flex sm:flex-col lg:flex-row pt-[4rem] ">
          <div>
            <Carousel
              className=" sm:w-[100%]  w-[400px]"
              showIndicators={false}
              showThumbs={true}
              showStatus={false}
              autoPlay={true}
              interval={3000}
              infiniteLoop={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <div
                  className="absolute z-[4] cursor-pointer left-[0px]  top-[50%]"
                  onClick={onClickHandler}
                >
                  <AiOutlineLeft className="text-blue-500" size={70} />
                </div>
              )}
              renderArrowNext={(onClickHandler, hasNext, label) => (
                <div
                  className=" absolute cursor-pointer   right-[0px]  top-[50%]"
                  onClick={onClickHandler}
                >
                  <AiOutlineRight className=" text-blue-500 " size={70} />
                </div>
              )}
            >
              {images.map((value) => {
                return (
                  <div key={value.id}>
                    <img src={value} className="" alt="value" />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="ms-12 sm:ms-2">
            <div className="">
              <p className=" sm:text-[1.8rem] text-[2.3rem] ">{title}</p>
            </div>
            <div className="mt-4 pr-[5rem]">
              <p>{description}</p>
            </div>
            <div className="flex uppercase mt-4 ">
              <p className="bg-[#FED7D7] text-red-900 font-[700] px-1 rounded-[10px] p-0 text-[14px]">
                {category}
              </p>
              <p className="bg-[#FED7D7] text-red-900 font-[700] px-1 rounded-[10px] p-0 text-[14px] mx-4 ">
                {brand}
              </p>
            </div>
            <div className="mt-4">
              <p className=" text-[30px] font-[500] text-[#da0037]">${price}</p>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => addToCart(product)}
                className=""
                variant="solid"
                colorScheme="red"
              >
                <BsCartPlus className="mx-2" /> Add to cart
              </Button>
              <p className="text-[#48BB78] uppercase">In Stock: {stock}</p>
            </div>
            <div className="mt-6">
              <p className="text-[15px]">average rating: {rating}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop color="white"  className=" scroll px-2  pl-1 " smooth />
      <ToastContainer position="bottom-right"/>

    </div>
  );
};

export default DynamicProductPage;
