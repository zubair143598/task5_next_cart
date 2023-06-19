/* eslint-disable @next/next/no-img-element */
import { useQuery } from "react-query";
import {
  Card,
  Stack,
  Text,
  Flex,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import Pagination2 from "./Pagination2";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineRollback } from "react-icons/ai";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [productsData, setProductsData] = useState([]);

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
      setProductsData(data.products);
      console.log(data)
      return data;
    } catch (error) {
      throw Error("unable to get data");
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPost = productsData.slice(firstPostIndex, lastPostIndex);

  const { data, isLoading, error } = useQuery("products", fetchProducts);
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <div className=" sm:px-[2rem] md:px-[2rem] lg:px-[3rem]  xl:px-[10rem] bg-[#171717] pt-5   ">
        <div className="bg-[#7D0B28] rounded-lg  flex justify-between  px-4 ">
          <div className="flex ">
            <img className="w-[40px] h-[40px] mt-2 " src="/assets/logo.webp" alt="" />
            <p className="text-white text-[40px] font-[700] ">NC</p>
          </div>
          <div className="cart flex rounded flex-row items-center my-2 px-3">
            <button className="flex text-white font-[600]  ">
            
              <AiOutlineShoppingCart className="mt-1  mr-2" /> Cart
            </button>
          </div>
        </div>
        <div className=" mt-24 text-white" >
         
          <button className="flex" >
            
            <AiOutlineRollback className="mt-1 mr-3" /> Home
          </button>
        </div>
        <div className="text-white font-[600] mt-[20px] mb-[30px] text-center uppercase text-[40px] sm:text-[30px]" >
          <h2>Available <span className="text-[#da0037]" >Items</span></h2>
        </div>
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1  grid-cols-4">

          {currentPost.map((product) => (
            <div
              key={product.id}
              className="flex   mx-4  items-center flex-col py-5"
            >
              <Card className="h-[100%]" maxW="sm">
                <CardBody className="rounded-t bg-[#444]">
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      borderRadius="lg"
                      className="w-[100%] h-[250px] rounded-t  "
                      alt={product.images[0]}
                    />
                  )}
                  <Stack
                    onClick={() => router.push(`/${product.id}`)}
                    className="p-[1rem] cursor-pointer text-white"
                    mt="6"
                    spacing="3"
                  >
                    <Heading size="lg">{product.title} </Heading>
                    <Text>
                      <p>
                        {product.description.slice(0, 50)} ...{" "}
                        <span className="  text-[#da0037] ">read more</span>
                      </p>
                    </Text>
                    <Text color="#da0037" className=" text-[30px] font-[500] ">
                      ${product.price}
                    </Text>
                  </Stack>
                </CardBody>

                <CardFooter className="rounded-b bg-[#444]">
                  <Button
                    className="w-[100%]"
                    variant="solid"
                    colorScheme="red"
                  >
                    <BsCartPlus className="mx-2" /> Add to cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        <div className="py-10 flex justify-center mt-6 text-white">
          <Pagination2
            totalPosts={productsData.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Pagination;
