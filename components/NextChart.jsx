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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useRef } from "react";
import { BsCartPlus } from "react-icons/bs";
import Pagination2 from "./Pagination2";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart, AiOutlineDelete } from "react-icons/ai";
import { AiOutlineRollback } from "react-icons/ai";

const NextChart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [productsData, setProductsData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const btnRef = useRef();

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
      setProductsData(data.products);
      console.log(data);
      return data;
    } catch (error) {
      throw Error("unable to get data");
    }
  };
  const addToCart = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };
  const removeFromCart = (productId) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product.id !== productId
    );
    setSelectedProducts(updatedProducts);
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
        <div className="bg-[#7D0B28]  mx-[10rem] sm:mx-2 md:mx-[4rem] xl:mx-[10rem] relative z-[4]  rounded-lg   flex justify-between  px-4 ">
          <div className="flex ">
            <img
              className="w-[40px] h-[40px] mt-2 "
              src="/assets/logo.webp"
              alt=""
            />
            <p className="text-white text-[40px] font-[700] ">NC</p>
          </div>

          <div className="cart flex rounded flex-row my-2 items-center ">
            <button
              onClick={onOpen}
              ref={btnRef}
              className="flex py-2  px-3 text-white font-[600]  "
            >
              <AiOutlineShoppingCart className="mt-1  mr-2" /> Cart
            </button>
            <Drawer
              className=""
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent className="text-white">
                <DrawerCloseButton />
                <DrawerHeader className="text-white">
                  Selected Items
                </DrawerHeader>

                <DrawerBody>
                  {selectedProducts.map((product) => (
                    <div
                      className="flex relative my-4 bg-[#333333] p-2 rounded text-white"
                      key={product.id}
                    >
                      <div className="mt-1">
                        <img
                          className="w-[50px] h-[50px] rounded"
                          src={product.images[0]}
                          alt={product.title}
                        />
                      </div>
                      <div className="text-[13px] flex flex-col justify-evenly ml-3">
                        <p>{product.title}</p>
                        <div className="">
                          <p className=" text-[15px] font-[900] text-[#da0037] ">
                            ${product.price}{" "}
                          </p>
                          <button
                            className="absolute right-[10px] bottom-[10px]"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <AiOutlineDelete color="gray" size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </DrawerBody>

                <DrawerFooter className="text-white ">
                  <p>Total</p>
                  <p>
                    $
                    {selectedProducts.reduce(
                      (total, product) => total + product.price,
                      0
                    )}
                  </p>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>


        
        <div className=" mt-24 text-white">
          <button className="flex">
            <AiOutlineRollback className="mt-1 mr-3" /> Home
          </button>
        </div>
        <div className="text-white font-[600] mt-[20px] mb-[30px] text-center uppercase text-[40px] sm:text-[30px]">
          <h2>
            Available <span className="text-[#da0037]">Items</span>
          </h2>
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
                    onClick={() => addToCart(product)}
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

export default NextChart;
